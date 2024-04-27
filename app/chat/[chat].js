import React, {useEffect, useState, useRef} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Animated, PanResponder } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router'
import { socket } from '../../socket.io/socket';
import { useChats } from '../../hooks/queries/useChat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import toast from '../../utils/toast';
import { QueryCache } from '@tanstack/react-query'

let User

AsyncStorage.getItem('user').then(userString => {
  if (userString) User = JSON.parse(userString)
}).catch(error => console.log(error))

const ChatBubble = ({ message, isMyMessage, onSelectMessage }) => {
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
    <Animated.View
      style={[
        styles.bubbleContainer,
        isMyMessage && styles.myBubble,
        { transform: [{ translateX: pan.x }] } // Pass transform style here (translateY: pan.y)
      ]}
      {...panResponder.panHandlers} // Pass panHandlers to Animated.View
    >
      <Text style={styles.bubbleText}>{message.content}</Text>
      <Text style={styles.timestamp}>{message.timestamp}</Text>
    </Animated.View>
  );
}

const ChatInput = ({ onSendMessage, quotedMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message, quotedMessage);
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
        <Text style={styles.sendButtonText}>Send</Text>
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

const Chat = () => {
  
  const queryCache = new QueryCache({
    onError: error => toast(error.message)
  })

  const [messages, setMessages] = React.useState([]);
  const [quotedMessage, setQuotedMessage] = React.useState(null);

  const { chat: room } = useLocalSearchParams()
  const { data: { data } } = useChats()

  
  useEffect(() => {
    const [club] = data?.chats?.filter(club => club?.club?._id == room)
    if (club) setMessages([...messages, ...club?.chats])
  }, [data])

  socket.on('incoming chat', message => {
    setMessages([message, ...messages])
    queryCache.setQueryData(['chats'], (oldData) => {
      const newData = [...oldData.data.chats, message]
      return {...oldData, data: {...oldData.data, chats: newData } }
    })
    console.log(data)
  })

  const sendMessage = async (message) => {
    const newMessage = {
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      timeSent: Date.now(),
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

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble
            message={item}
            isMyMessage={
              item?.isMyMessage ? true
              :
              User._id == item?.sender?._id ? true : false
            }
            onSelectMessage={handleSelectMessage}
          />
        )}
        initialNumToRender={100}
        keyExtractor={(item, index) => index.toString()}
        inverted
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
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  myBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
  },
  bubbleText: {
    fontSize: 16,
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    // backgroundColor: '#007bff',
    backgroundColor: '#365486',
    borderRadius: 20,
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