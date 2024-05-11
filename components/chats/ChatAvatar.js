import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import TimeAgo from './Timer'
import TruncateText from './TruncateText'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ChatAvatar({ club }) {

  const sender = club?.chats?.at(-1)?.sender?.firstName
  const latestChat = club?.unviewedChats?.at(-1)?.content
  const latestChatDate = club?.chats?.at(-1)?.createdAt
  const numberOfUnreadChats = club?.unviewedChats?.length
  
  return (
    <TouchableOpacity
      onPress={() => router.push(`/chat/${club?._id}`)}
      style={{ borderBottomWidth: .5, borderBottomColor: 'grey' }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: DEVICE_WIDTH,
          paddingHorizontal: 10,
          paddingVertical: 12
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
          }}
        >
          <Image
            source={club?.assets?.image?.secure_url}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
            }}
          />
          <View style={{}}>
            <TruncateText
              style={{
                textTransform: 'capitalize',
                fontFamily: 'Poppins',
                fontSize: 16,
                fontWeight: '600',
              }}
              text={club?.name}
              maxLength={18}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              {
                club?.chats?.length ?
                  <>
                    <TruncateText text={sender} maxLength={12} />
                    <Text style={{
                      fontFamily: 'Poppins',
                      fontSize: 12,
                      color: 'grey'
                    }}>: </Text>
                    <TruncateText text={latestChat} maxLength={15}/>
                  </>
                : <Text>No chats: Be the first to chat</Text>
              }
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end', }}>
          {
            club?.chats?.length ? 
              <View
                style={{
                  color: '#365486',
                  fontFamily: 'Poppins',
                  fontSize: 10,
                  alignSelf: 'center'
                }}
              >
                <TimeAgo date={latestChatDate}/>
              </View>
            : null
          }
          {
            club?.chats?.length ? 
              <View
                style={{
                  backgroundColor: '#365486',
                  padding: 5,
                  borderRadius: 100,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                  width: 25,
                  height: 25
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Poppins',
                    fontSize: 10,
                    alignSelf: 'center'
                  }}
                >
                  {numberOfUnreadChats}
                </Text>
              </View>
            : null
          }
        </View>
      </View>
    </TouchableOpacity>
  )
}

//   const panResponder = React.useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderMove: Animated.event(
//         [
//           null,
//           { dx: pan.x } // move the Animated.View here
//         ],
//         { useNativeDriver: false }
//       ),
//       onPanResponderRelease: (_, gestureState) => {
//         if (Math.abs(gestureState.dx) > 30) {
//           onSelectMessage(message);
//           Animated.spring(pan, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: false
//           }).start()
//         } else {
//           Animated.spring(pan, {
//             toValue: 0,
//             friction: 4,
//             useNativeDriver: false,
//           }).start()
//         }
//       },
//     })
//   ).current;

//   return (
//     <Animated.View
//       style={[
//         styles.bubbleContainer,
//         isMyMessage && styles.myBubble,
//         { transform: [{ translateX: pan.x }] } // Pass transform style here (translateY: pan.y)
//       ]}
//       {...panResponder.panHandlers} // Pass panHandlers to Animated.View
//     >
//       <Text style={styles.bubbleText}>{message.content}</Text>
//       <Text style={styles.timestamp}>{message.timestamp}</Text>
//     </Animated.View>
//   );
// };