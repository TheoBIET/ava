import useVoice from "../../hooks/useVoice";
// import InputSelect from "../Shared/InputSelect";

export default function Audio() {
  const NUM_BARS = 50;
  const {
    isAudioAPILoaded,
    // inputDevices,
    // outputDevices,
    currentVoiceLevel,
  } = useVoice({
    voiceThreshold: 12,
  });

  return (
    <div className="Audio">
      <h3>Voice parameters</h3>
      {isAudioAPILoaded && (
        <>
          <div className="Audio__devices">
            <h4>Devices</h4>
            <div className="Audio__devices__wrapper">
              {/* <InputSelect
                options={inputDevices}
                label="Input device"
                textKey="label"
                valueKey="deviceId"
              />
              <InputSelect
                options={outputDevices}
                label="Output device"
                textKey="label"
                valueKey="deviceId"
              /> */}
            </div>
          </div>
          <div className="Audio__recording">
            <h4>Recording</h4>
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