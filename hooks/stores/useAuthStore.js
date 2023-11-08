import { create } from 'zustand'

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
}

export const useAuthStore = create(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  setInitialState: () => set(initialState)
}))