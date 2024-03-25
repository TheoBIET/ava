/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect } from 'react';

export default function useSpeechRecognition({ voiceThreshold }: Readonly<{
  voiceThreshold: number;
}>) {
  const [isAudioAPILoaded, setIsAudioAPILoaded] = useState(false);
  const [inputDevices, setInputDevices] = useState([]);
  const [outputDevices, setOutputDevices] = useState([]);
  const [selectedInputDevice, setSelectedInputDevice] = useState<string | null>(null);
  const [selectedOutputDevice, setSelectedOutputDevice] = useState<string | null>(null);
  const [voiceDetected, setVoiceDetected] = useState(false);
  const [currentVoiceLevel, setCurrentVoiceLevel] = useState(0);
  const [silenceDuration, setSilenceDuration] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);

  const startListen = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);

    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    microphone.connect(analyser);

    const handleAudio = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(dataArray);
      const level = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setCurrentVoiceLevel(level);

      if (level >= voiceThreshold) {
        setVoiceDetected(true);
        setVoiceDuration((prev) => prev + 1);
      } else {
        setVoiceDetected(false);
        setSilenceDuration((prev) => prev + 1);
      }

      requestAnimationFrame(handleAudio);
    }

    handleAudio();
  };

  useEffect(() => {
    const getDevices = async () => {
      await navigator.permissions.query({ name: 'microphone' });
      const devices = await navigator.mediaDevices.enumerateDevices();
      const inputDevices = devices.filter((device) => device.kind === 'audioinput');
      const outputDevices = devices.filter((device) => device.kind === 'audiooutput');

      setInputDevices(inputDevices);
      setOutputDevices(outputDevices);
      setSelectedInputDevice(inputDevices.find((device) => device.deviceId === 'default'));
      setSelectedOutputDevice(outputDevices.find((device) => device.deviceId === 'default'));
      setIsAudioAPILoaded(true);
    };

    getDevices();
  }, []);

  return {
    isAudioAPILoaded,
    inputDevices,
    outputDevices,
    selectedInputDevice,
    setSelectedInputDevice,
    selectedOutputDevice,
    setSelectedOutputDevice,
    voiceDetected,
    currentVoiceLevel,
    startListen,
    silenceDuration,
    voiceDuration,
  };
}