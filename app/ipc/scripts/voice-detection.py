import typer
import pyaudio
import json

class VoiceDetection:
    def __init__(self):
        self.app = typer.Typer()
        self._audio = pyaudio.PyAudio()
                
    def _format_device(self, device, is_default = False):
      return {
        'name': device.get('name'),
        'index': device.get('index'),
      }
                
    def get_devices(self):
        info = self._audio.get_host_api_info_by_index(0)
        num_devices = info.get('deviceCount')
        default_output_device_id = self._audio.get_default_output_device_info().get('index')
        default_input_device_id = self._audio.get_default_input_device_info().get('index')
        output_devices = []
        input_devices = []
        
        for i in range(0, num_devices):
            device = self._audio.get_device_info_by_host_api_device_index(0, i)
            max_output_channels = device.get('maxOutputChannels')
            max_input_channels = device.get('maxInputChannels')
            
            # Remove Microsoft Sound Mapper devices
            if 'Microsoft' in device.get('name'):
                continue
            
            if max_output_channels > 0:
                is_default = device.get('index') == default_output_device_id
                output_devices.append(self._format_device(device, is_default))                
            elif max_input_channels > 0:
                is_default = device.get('index') == default_input_device_id
                input_devices.append(self._format_device(device, is_default))
        
        output_devices.sort(key=lambda x: x['index'] == default_output_device_id, reverse=True)
        input_devices.sort(key=lambda x: x['index'] == default_input_device_id, reverse=True)    
            
        return json.dumps({
            'output': output_devices,
            'input': input_devices
        })