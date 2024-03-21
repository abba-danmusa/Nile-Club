import { create } from 'zustand'

const initialState = {
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  title: '',
  description: '',
  category: [],
}

export const useNewEventStore = create(set => ({
  ...initialState,
  setDate: date => set({ date }),
  setStartTime: startTime => set({ startTime }),
  setEndTime: endTime => set({ endTime }),
  setTitle: title => set({ title }),
  setDescription: description => set({ description }),
  setCategory: category => set({ category }),
}))