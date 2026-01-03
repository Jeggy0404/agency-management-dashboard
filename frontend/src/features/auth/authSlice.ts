import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/models'

type AuthState = {
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  token: localStorage.getItem('ap_token'),
  user: localStorage.getItem('ap_user') ? (JSON.parse(localStorage.getItem('ap_user')!) as User) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('ap_token', action.payload.token)
      localStorage.setItem('ap_user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('ap_token')
      localStorage.removeItem('ap_user')
    }
  }
})

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer
