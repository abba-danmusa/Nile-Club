import { create } from 'zustand'

const initialState = {
  _id: '',
  banner: null,
  image: null,
  name: '',
  description: ''
}

export const useClubStore = create(set => ({
  ...initialState,
  setBanner: banner => set({ banner }),
  setId: _id => set({ _id }),
  setImage: image => set({image}),
  setName: name => set({name}),
  setDescription: description => set({ description }),
  setInitialState: () => set({ ...initialState }),
  setClub: club => set({
    ...club,
    banner: club.assets.banner,
    image: club.assets.image
  }),
}))