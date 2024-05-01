import { useCallback, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { BottomSheetFooter, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useCreateComment } from '../../hooks/queries/useClub'

const CommentFooter = (props) => {
  
  const [comment, setComment] = useState('')

  const { mutate: createComment } = useCreateComment()

  const submitComment = () => {
    createComment({
      content: comment,
      club: props.clubId
    }, {onError: error => console.log(error)})
    setComment('')
  }

  return (
    <BottomSheetFooter {...props} bottomInset={0}>
      <View style={styles.inputContainer}>
        <BottomSheetTextInput
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          placeholder="Type a comment..."
          multiline
        />
        <TouchableOpacity onPress={submitComment} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetFooter>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#dddddd',
    padding: 10,
    marginTop: 10,
    backgroundColor: 'black'
    // position: 'absolute',
    // bottom: 0
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
})

export default CommentFooter