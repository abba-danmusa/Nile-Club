import React, {useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated, PanResponder, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'
import { socket } from '../../socket.io/socket';
import { useChats } from '../../hooks/queries/useChat';
import { useChatStore } from '../../hooks/stores/useChatStore';
import toast from '../../utils/toast';
import { QueryCache } from '@tanstack/react-query'
import { SHADOW } from '../../utils/styles';
import { Image } from 'expo-image'
import TimeAgo from '../../components/chats/Timer';
import { Divider } from '@rneui/base';
import { useUser } from '../../hooks/queries/useAuthentication';

const ChatBubble = ({ message, isMyMessage, onSelectMessage, isRead = true }) => {

  // I swear I have no idea how line 19 is working but since it's working, great!!!
  if (message.viewed == false && isRead == true) return // return if the user hasn't seen this chat (to be displayed in New Messages)

  const pan = React.useRef(new Animated.ValueXY()).current;
  const [isEnabled, setIsEnabled] = useState(true)

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Enable PanResponder only if the gesture is horizontal
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && isEnabled;
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x } // move the Animated.View here
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        setIsEnabled(false); // Disable PanResponder after release
        if (Math.abs(gestureState.dx) > 50) {
          onSelectMessage(message);
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
          }).start(() => setIsEnabled(true)) // Enable PanResponder after animation
        } else {
          Animated.spring(pan, {
            toValue: 0,
            friction: 4,
            useNativeDriver: false,
          }).start(() => setIsEnabled(true)) // Enable PanResponder after animation
        }
      },
    })
  ).current;

  return (
    <View style={
      [{ display: 'flex', flexDirection: 'row', gap: 10, marginTop: 20 }, isMyMessage && { alignSelf: 'flex-end', flexDirection: 'row-reverse' }]
    }>
      <Image
        source={
          message?.sender?.asset?.secure_url ||
          'https://i.pravatar.cc/300?img=1'
        }
        style={[{ width: 35, height: 35, borderRadius: 35, alignSelf: 'flex-end', marginLeft: 2 }, isMyMessage && { marginRight: 2, marginLeft: 0 }]}
      />
      <Animated.View
        style={[
          styles.bubbleContainer,
          isMyMessage && styles.myBubble,
          { transform: [{ translateX: pan.x }] } // Pass transform style here (translateY: pan.y)
        ]}
        {...panResponder.panHandlers} // Pass panHandlers to Animated.View
      >
        <View style={{}}>
          <Text style={{ fontFamily: 'Poppins', color: '#365486', fontSize: 10}}>
            {`${message?.sender?.firstName} ${message?.sender?.lastName}`}
          </Text>
        </View>
        <Divider/>
        <Text style={styles.bubbleText}>{message.content}</Text>
        <View style={styles.timestamp}>
          <TimeAgo date={message?.createdAt || message?.timeSent || message?.timestamp}/>
        </View>
      </Animated.View>
    </View>
  );
}

const ChatInput = ({ onSendMessage, quotedMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      {quotedMessage && (
        <View style={styles.quotedContainer}>
          <Text style={styles.quotedText}>{quotedMessage.content}</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
      />
      <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
        <MaterialIcons name="send" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const QuotedMessage = ({ message, setQuotedMessage}) => {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.quotedMessageContainer}>
      <Text style={styles.quotedMessageText}>{message.content}</Text>
      <TouchableOpacity
        onPress={() => setQuotedMessage(null)}
        style={{
          position: 'absolute',
          right: 2,
          top: 2
        }}
      >
        <MaterialIcons name="cancel" size={24} color="tomato" />
      </TouchableOpacity>
    </View>
  );
}

const NewMessages = ({
  unreadMessages = [],
  handleSelectMessage,
  setListHeaderHeight,
  User
}) => {
  return (
    <View
      onLayout={(event) => {
        setListHeaderHeight(event.nativeEvent.layout.height)
      }}
    >
      {
        !(unreadMessages.length < 1) &&
        <View
          style={{
            alignItems: 'center',
            padding: 10,
            marginVertical: 20,
            width: '70%',
            alignSelf: 'center',
          }}
        >
          <Text
            style={{ fontFamily: 'Poppins', fontSize: 14, color: '#365486' }}
          >
            New Messages
          </Text>
        </View>
      }
      {
        unreadMessages?.map(message =>
          <ChatBubble
            key={message._id}
            message={message}
            onSelectMessage={handleSelectMessage}
            isRead={false}
            isMyMessage={
              message?.isMyMessage ? true
              : User._id == message?.sender?._id ? true : false
            }
          />
        )
      }
    </View>
  )
  return null
}

const Chat = () => {
  
  // const queryCache = new QueryCache({
  //   onError: error => toast(error.message)
  // })

  const [messages, setMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [quotedMessage, setQuotedMessage] = useState(null);
  const [listHeaderHeight, setListHeaderHeight] = useState(0)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const flatListRef = useRef(null)

  const { setClub } = useChatStore()

  const { chat: room } = useLocalSearchParams()
  const { data: { data }, refetch } = useChats()
  const { data: userData } = useUser()
  
  const User = userData?.data?.user

  useEffect(() => {
    const [club] = data?.chats?.filter(club => club?._id == room)
    if (club) {
      setMessages([...club.chats])
      setUnreadMessages([...club.unviewedChats])
      setClub({
        _id: club._id,
        name: club.name,
        description: club.description,
        banner: club.assets.banner.secure_url,
        image: club.assets.image.secure_url,
      })
    }
    
    const timeoutId = setTimeout(() => {
      socket.emit('mark messages read', [...club?.unviewedChats]);
      refetch(); // Get the latest chats
    }, 1000)
    
    return () => clearTimeout(timeoutId)
  }, [])

  socket.on('incoming chat', message => {
    setMessages([message, ...messages])
  })

  const sendMessage = async (message) => {
    const newMessage = {
      content: message,
      timestamp: Date.now(),
      timeSent: Date.now(),
      sender: User,
      isMyMessage: true, // Assuming the user is always sending messages
    }
    setMessages([newMessage, ...messages])
    const response = await socket.emitWithAck('incoming chat', newMessage, room).catch(e => console.log(e))
    console.log(response)
    setQuotedMessage(null); // Clear quoted message after sending
  }
  const handleSelectMessage = (message) => {
    // setSelectedMessage(message);
    setQuotedMessage(message);
  };

  const scrollToNewMessages = () => {
    if (flatListRef.current && listHeaderHeight > 0) {
      flatListRef
        .current
        .scrollToOffset({ offset: listHeaderHeight - 200, animated: true })
    }
  }

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (isInitialRender && flatListRef.current) {
      scrollToNewMessages()
      if (listHeaderHeight > 0) setIsInitialRender(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden/>
      <FlatList
        inverted
        data={messages}
        ref={flatListRef}
        initialNumToRender={100}
        keyExtractor={(item, index) => index}
        onContentSizeChange={handleContentSizeChange}
        ListHeaderComponent={
          <NewMessages
            unreadMessages={unreadMessages}
            handleSelectMessage={handleSelectMessage}
            setListHeaderHeight={setListHeaderHeight}
            User={User}
          />
        }
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            onSelectMessage={handleSelectMessage}
            isMyMessage={
              item?.isMyMessage ? true
              : User._id == item?.sender?._id ? true : false
            }
          />
        )}
      />
      <QuotedMessage
        message={quotedMessage}
        setQuotedMessage={setQuotedMessage}
      />
      <ChatInput
        onSendMessage={sendMessage}
        selectedMessage={quotedMessage}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // paddingHorizontal: 10,
    // paddingTop: 20,
  },
  bubbleContainer: {
    maxWidth: '70%',
    minWidth: '35%',
    padding: 10,
    borderRadius: 10,
    borderTopLeftRadius: 25,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 1,
    marginVertical: 5,
    backgroundColor: '#fff',
    ...SHADOW
  },
  myBubble: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 1,
    borderBottomLeftRadius: 5,
    backgroundColor: '#dcf8c6',
  },
  bubbleText: {
    fontSize: 14,
    fontFamily: 'Poppins'
  },
  timestamp: {
    fontSize: 12,
    color: '#888888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    ...SHADOW
  },
  sendButton: {
    // backgroundColor: '#007bff',
    backgroundColor: '#365486',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quotedContainer: {
    // backgroundColor: 'pink',
    backgroundColor: '#eeeeee',
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  quotedText: {
    fontSize: 14,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#f0f0f0',
  //   paddingHorizontal: 10,
  //   paddingTop: 20,
  // },
  quotedMessageContainer: {
    // backgroundColor: '#eeeeee',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  quotedMessageText: {
    fontSize: 16,
  }
});

export default Chat