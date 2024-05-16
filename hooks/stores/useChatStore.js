import { create } from 'zustand'

const initialState = {
  club: {
    _id: '',
    name: '',
    description: '',
    banner: '',
    image: '',
    members: '0',
  }
}

export const useChatStore = create(set => ({
  ...initialState,
  setClub: club => set({club}),
  setInitialState: () => set({...initialState})
}))