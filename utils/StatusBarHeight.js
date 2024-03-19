import { StatusBar, Platform } from 'react-native';

const getStatusBarHeight = () => {
  if (Platform.OS === 'android') {
    return StatusBar.currentHeight;
  } else if (Platform.OS === 'ios') {
    return 20; // Default status bar height for iOS
  } else {
    return 0; // Default status bar height for other platforms
  }
}

export default getStatusBarHeight