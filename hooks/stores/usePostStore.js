import { create } from 'zustand'

/**
 * Creates a zustand store.
 */
const initialState = {
  _id: '',
  content: '',
  assets: [],
  uploadedAssets: [],
  category: [],
}

/**
 * Creates a zustand store with initial state and setters for
 * date, start/end times, title, description, and category.
 */
export const usePostStore = create((set) => ({
  ...initialState,
  setAssets: (assets) => set({ assets }),
  setUploadedAssets: (uploadedAssets) => set({ uploadedAssets }),
  setContent: (content) => set({ content }),
  setCategory: (category) => set({ category }),
  setInitialState: () => set({ ...initialState }),
  setPost: (post) => set((state) => ({
    _id: post.item._id,
    content: post.item.content,
    assets: [...post.item.assets],
    category: [...post.item.category],
  })),
}))
