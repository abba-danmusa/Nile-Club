import { Animated } from 'react-native'
import { create } from 'zustand'

const initialState = {
  translateY: new Animated.Value(0)
}

export const useAnimationStore = create(set => ({
  ...initialState,
  setTranslateY: value => set({ translateY: value }),
}))