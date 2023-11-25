import { createSlice } from '@reduxjs/toolkit';

const name = 'audioDevices';

const initialState = {
  inputDevice: {},
  outputDevice: {},
  inputDevices: [],
  outputDevices: [],
};

export const audioDevicesSlice = createSlice({
  name,
  initialState,
  reducers: {
    setInputDevice: (state, action) => {
      state.inputDevice = action.payload;
    },
    setOutputDevice: (state, action) => {
      state.outputDevice = action.payload;
    },
    setInputDevices: (state, action) => {
      state.inputDevices = action.payload;
    },
    setOutputDevices: (state, action) => {
      state.outputDevices = action.payload;
    },
  },
});

export const selectInputDevice = state => state[name].inputDevice;
export const selectOutputDevice = state => state[name].outputDevice;
export const selectInputDevices = state => state[name].inputDevices;
export const selectOutputDevices = state => state[name].outputDevices;

export const {
  setInputDevice,
  setOutputDevice,
  setInputDevices,
  setOutputDevices
} = audioDevicesSlice.actions;

export default audioDevicesSlice.reducer;
