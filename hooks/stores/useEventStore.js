import { create } from 'zustand'

/**
 * Creates a zustand store.
 */
const initialState = {
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  title: '',
  description: '',
  assets: [{ title: 'Add some image(s)', text: 'Tab on the plus button' }],
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
  setAssets: (assets) => set({assets}),
  setDescription: (description) => set({ description }),
  setCategory: (category) => set({ category }),
  setInitialState: () => set({...initialState})
}));
