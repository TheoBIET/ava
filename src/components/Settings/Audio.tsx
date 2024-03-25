import useSpeechRecognition from "../../hooks/useSpeechRecognition";

export default function Audio() {
  const NUM_BARS = 100;
  const {
    isAudioAPILoaded,
    inputDevices,
    outputDevices,
    currentVoiceLevel,
    selectedInputDevice,
    selectedOutputDevice,
    setSelectedInputDevice,
    setSelectedOutputDevice,
  } = useSpeechRecognition({
    voiceThreshold: 12,
  });

  return (
    <div className="Audio">
      <h3>Voice parameters</h3>
      <div className="Audio__stt">
        <h4>Speech-to-text</h4>
        <div>
          <input type="radio" name="tts" value="system_tts" />
          <label htmlFor="system_tts">Whisper - (Local)</label>
        </div>
        <div>
          <input type="radio" name="tts" value="elevenlabs" />
          <label htmlFor="elevenlabs">Whisper - (API)</label>
        </div>
      </div>
      <div className="Audio__tts">
        <h4>Text-to-speech</h4>
        <div>
          <input type="radio" name="tts" value="system_tts" />
          <label htmlFor="system_tts">System TTS - Local</label>
        </div>
        <div>
          <input type="radio" name="tts" value="elevenlabs" />
          <label htmlFor="elevenlabs">BarkAI - Local</label>
        </div>
        <div>
          <input type="radio" name="tts" value="elevenlabs" />
          <label htmlFor="elevenlabs">Eleven Labs - API</label>
        </div>
      </div>
      {isAudioAPILoaded && (
        <>
          <div className="Audio__devices">
            <h4>Devices</h4>
            <div className="Audio__devices__wrapper">
              <div className="InputSelect">
                <label>Input devices</label>
                <select value={selectedInputDevice as string} onChange={(e) => setSelectedInputDevice((e.target as HTMLSelectElement).value)}>
                  {inputDevices.map((device: { deviceId: string, label: string}, index) => (
                    <option key={index} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="InputSelect">
                <label>Output devices</label>
                <select value={selectedOutputDevice as string} onChange={(e) => setSelectedOutputDevice((e.target as HTMLSelectElement).value)}>
                  {outputDevices.map((device: { deviceId: string, label: string}, index) => (
                    <option key={index} value={device.deviceId}>
                      {device.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="Audio__recording">
            <h4>Recording</h4>
            <div className="Audio__settings__threshold">
              <div className="InputSelect">
                <label>Threshold</label>
                <input type="range" min="0" max="100" />
              </div>
            </div>
            <div className="Audio__recording__level">
              {[...Array(NUM_BARS)].map((_, index) => (
                <div
                  key={index}
                  className={`Audio__recording__level__bar ${index < currentVoiceLevel ? '--active' : ''}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}