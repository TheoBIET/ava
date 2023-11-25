import { useEffect, useState } from 'react';
import EVENTS from '../../../constants/ipcEvents.json';
import SelectInput from './Shared/SelectInput';

const { ipcRenderer } = window.require('electron');

export default function Settings() {
  const [inputDevices, setInputDevices] = useState([]);
  const [outputDevices, setOutputDevices] = useState([]);
  const [selectedInputDevice, setSelectedInputDevice] = useState({});
  const [selectedOutputDevice, setSelectedOutputDevice] = useState({});

  useEffect(() => {
    if (!inputDevices.length && !outputDevices.length) {
      ipcRenderer.send(EVENTS.VOICE_DEVICES.GET);
    }
  }, [inputDevices, outputDevices]);

  ipcRenderer.on(EVENTS.VOICE_DEVICES.SET, (_, data) => {
    setInputDevices(data.input);
    setOutputDevices(data.output);
    setSelectedInputDevice(data.input[0]);
    setSelectedOutputDevice(data.output[0]);

    ipcRenderer.removeAllListeners(EVENTS.VOICE_DEVICES.SET);
  });
  
  return (
    <div className="Settings">
      <section className="Settings__sounds">
        <h4>Sound settings</h4>
        <div className="Settings__sounds__inputs">
          <SelectInput
            id="inputDevice"
            options={inputDevices}
            selectedOption={selectedInputDevice}
            setSelectedOption={setSelectedInputDevice}
            label="Input device"
            key="deviceId"
            textKey="name"
          />
          <SelectInput
            id="outputDevice"
            options={outputDevices}
            selectedOption={selectedOutputDevice}
            setSelectedOption={setSelectedOutputDevice}
            label="Output device"
            key="deviceId"
            textKey="name"
          />
        </div>
      </section>
    </div>
  )
}