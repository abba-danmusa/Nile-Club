import { create } from 'zustand'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  department: '',
  year: '',
}

export const useAuthStore = create(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  setDepartment: department => set({ department }),
  setYear: year => set({ year }),
  setFirstName: firstName => set({ firstName }),
  setLastName: lastName => set({ lastName }),
  setInitialState: () => set(initialState)
}))