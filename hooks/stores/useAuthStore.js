import { create } from 'zustand'

const initialState = {
  email: '',
  asset: null,
  firstName: '',
  lastName: '',
  password: '',
  newPassword: '',
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
  setAsset: asset => set({ asset }),
  setPassword: password => set({ password }),
  setNewPassword: newPassword => set({ newPassword }),
  setConfirmPassword: confirmPassword => set({ confirmPassword }),
  setDepartment: department => set({ department }),
  setYear: year => set({ year }),
  setFaculty: faculty => set({ faculty }),
  setMatriculationNumber: matriculationNumber => set({matriculationNumber}),
  setCode: code => set({ code }),
  setFirstName: firstName => set({ firstName }),
  setLastName: lastName => set({ lastName }),
  setInitialState: () => set(initialState),
  setProfile: profile => set((state) => ({
    firstName: profile?.User?.firstName,
    lastName: profile?.User?.lastName,
    faculty: profile?.User?.faculty,
    department: profile?.User?.department,
    year: profile.User?.year,
    matriculationNumber: profile?.User?.matriculationNumber,
  }))
}))