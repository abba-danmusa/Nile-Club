import * as React from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const DEVICE_WIDTH = Dimensions.get('window').width

export default function VideoPlayer({
  uri = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  width = '100%',
  height = 450,
  backgroundColor = 'inherit',
}) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={[styles.container, {height}]}>
      <Video
        ref={video}
        style={[styles.video, {width, height, maxHeight: 640, backgroundColor}]}
        source={{uri}}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          color={'#365486'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: DEVICE_WIDTH
    // backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttons: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
})