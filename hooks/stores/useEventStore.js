import { create } from 'zustand'

/**
 * Creates a zustand store.
 */
const initialState = {
  _id: '',
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  title: '',
  description: '',
  assets: [],
  uploadedAssets: [],
  images: [],
  videos: [],
  category: [],
}

/**
 * Creates a zustand store with initial state and setters for
 * date, start/end times, title, description, and category.
 */
export const useEventStore = create((set) => ({
  ...initialState,
  setDate: (date) => set({ date }),
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setTitle: (title) => set({ title }),
  setAssets: (assets) => set({ assets }),
  setUploadedAssets: (uploadedAssets) => set({ uploadedAssets }),
  setDescription: (description) => set({ description }),
  setCategory: (category) => set({ category }),
  setVideos: (videos) => set({ videos }),
  setImages: (images) => set({ images }),
  setInitialState: () => set({ ...initialState }),
  setEvent: (event) => set((state) => ({
    _id: event.item._id,
    date: new Date(event.item.date),
    startTime: new Date(event.item.startTime),
    endTime: new Date(event.item.endTime),
    title: event.item.title,
    description: event.item.description,
    assets: [...event.item.assets],
    category: [...event.item.category],
  })),
}))
