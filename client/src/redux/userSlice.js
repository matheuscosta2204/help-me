import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    email: '',
    age: null,
    companyName: ''
  },
  reducers: {
    login: (state, action) => {
      state.id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.age = action.payload.age;
      state.companyName = action.payload.companyName;
    },
    logout: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.age = null;
      state.companyName = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
