import { configureStore } from '@reduxjs/toolkit';

import audioDevicesReducer from '../features/audioDevices/audioDevicesSlice';

export default configureStore({
  reducer: {
    audioDevices: audioDevicesReducer,
  },
})