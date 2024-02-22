import { useEffect, useState } from "react";
import { System } from "../../../shared/interfaces/System";
import IpcService from "../../services/ipcService";
import { useOllamaStore } from "../../zustand/ollama";

export default function General() {
  const [ollamaVersion, setOllamaVersion] = useState<string>('');
  const [system, setSystem] = useState<System>({ 
    arch: '',
    cpus: '',
    memory: '',
  });

  const apiUrl = useOllamaStore((state) => state.apiUrl);
  const selectedModel = useOllamaStore((state) => state.selectedModel);
  const models = useOllamaStore((state) => state.models);

  useEffect(() => {
    IpcService.send('system').then((res) => {
      setSystem(res as System);
    });

    IpcService.send('ollama-version').then((res) => {
      setOllamaVersion(res as string);
    });
  }, []);

  return (
    <div className="General">
      <h3>General configuration</h3>
      <p>{system.arch}</p>
      <p>{system.cpus}</p>
      <p>{system.memory}GB of memory</p>
      {
        ollamaVersion === '' 
          ? <p>Ollama version not found, are you sure that the server is running?</p>
          : <p>Ollama version: {ollamaVersion}</p>
      }
      <br></br> {/* 💩 */}
      <div className="InputSelect">
        <label>Availables Ollama LLM :</label>
        <select value={selectedModel} onChange={(e) => useOllamaStore.setState({ selectedModel: e.target.value })}>
          {models.map((model, index) => (
            <option key={index} value={model.name}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      <div className="Input">
        <label>Ollama API URL :</label>
        <input type="text" value={apiUrl} onChange={(e) => useOllamaStore.setState({ apiUrl: e.target.value })} />
      </div>
    </div>
  )
}