import Toast from 'react-native-root-toast'

export default function toast(message) {
  return Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
    onPress: () => {
      // optional, called when the user presses the toast.
    },
    onLongPress: () => {
      // optional, called when the user presses toast for more than 1s.
    },
  })
}
