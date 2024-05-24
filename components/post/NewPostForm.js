import { Text, StyleSheet } from 'react-native'
import TextArea from '../../components/TextArea'
import { usePostStore } from '../../hooks/stores/usePostStore'
import BottomButton from '../../components/BottomButton'

const POST_ASSET_SCREEN = 1

const NewPostForm = ({ scrollToScreen = () => { } }) => {

  const { content, setContent } = usePostStore()

  const submitEventForm = () => {
    scrollToScreen(POST_ASSET_SCREEN)
  }

  return (
    <>
      <Text style={styles.title}>Add New Event</Text>
      <TextArea
        value={content}
        onChangeText={setContent}
        placeholder={'What\'s happening'}
      />
      <BottomButton title={'Next'} handlePress={submitEventForm} />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '600',
    color: '#365486',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 50
  },
})

export default NewPostForm