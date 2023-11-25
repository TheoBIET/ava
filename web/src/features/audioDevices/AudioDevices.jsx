import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EVENTS from '../../../../constants/ipcEvents.json';
import SelectInput from '../../components/Shared/SelectInput';

import {
  setInputDevice,
  setOutputDevice,
  setInputDevices,
  setOutputDevices,
  selectInputDevice,
  selectOutputDevice,
  selectInputDevices,
  selectOutputDevices,
} from './audioDevicesSlice';

const { ipcRenderer } = window.require('electron');

export default function AudioDevices() {
  const dispatch = useDispatch();
  const inputDevices = useSelector(selectInputDevices);
  const outputDevices = useSelector(selectOutputDevices);
  const inputDevice = useSelector(selectInputDevice);
  const outputDevice = useSelector(selectOutputDevice);

  useEffect(() => {
    const empty = !inputDevices.length && !outputDevices.length;
    if (empty) ipcRenderer.send(EVENTS.VOICE_DEVICES.GET);
  }, [inputDevices, outputDevices]);

  ipcRenderer.on(EVENTS.VOICE_DEVICES.SET, (_, data) => {
    dispatch(setInputDevices(data.input));
    dispatch(setOutputDevices(data.output));
    dispatch(setInputDevice(data.input[0]));
    dispatch(setOutputDevice(data.output[0]));
  });

  const selectDevice = (type, id) => {
    if (type === 'input' && inputDevice.index === id) return;
    if (type === 'output' && outputDevice.index === id) return;

    if (type === 'input') {
      const device = inputDevices.find((device) => device.index === +id);
      dispatch(setInputDevice(device));
    }

    if (type === 'output') {
      const device = outputDevices.find((device) => device.index === +id);
      dispatch(setOutputDevice(device));
    }
  }

  return (
    <section className="Settings__sounds">
      <h4>Sound settings</h4>
      <div className="Settings__sounds__inputs">
        <SelectInput
          id="inputDevice"
          options={inputDevices}
          selectedOption={inputDevice}
          setSelectedOption={(opt) => selectDevice('input', opt)}
          label="Input device"
          idKey="index"
          textKey="name"
        />
        <SelectInput
          id="outputDevice"
          options={outputDevices}
          selectedOption={outputDevice}
          setSelectedOption={(opt) => selectDevice('output', opt)}
          label="Output device"
          idKey="index"
          textKey="name"
        />
      </div>
    </section>
  )
}