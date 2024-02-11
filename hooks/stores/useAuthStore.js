import { create } from 'zustand'

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  code: '',
  faculty: '',
  department: '',
  year: '',
  matriculationNumber: '',
}

export const useAuthStore = create(set => ({
  ...initialState,
  setEmail: email => set({ email }),
  setPassword: password => set({ password }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  setDepartment: department => set({ department }),
  setYear: year => set({ year }),
  setFaculty: faculty => set({ faculty }),
  matriculationNumber: matriculationNumber => set({ matriculationNumber }),
  setCode: code => set({ code }),
  setFirstName: firstName => set({ firstName }),
  setLastName: lastName => set({ lastName }),
  setInitialState: () => set(initialState)
}))