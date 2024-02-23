import { useEffect } from "react";
import { useOllamaStore } from "../../zustand/ollama";
import IpcService from "../../services/ipcService";

export default function General() {
  const isApiRunning = useOllamaStore((state) => state.isApiRunning);
  const apiVersion = useOllamaStore((state) => state.apiVersion);
  const setApiUrl = useOllamaStore((state) => state.setApiUrl);
  const apiUrl = useOllamaStore((state) => state.apiUrl);
  const selectedModel = useOllamaStore((state) => state.selectedModel);
  const models = useOllamaStore((state) => state.models);

  useEffect(() => {
    IpcService.send('ollama-version',  { apiUrl }).then((res) => {
      console.log(res)
      if (res.error.status !== 'KO') {
        useOllamaStore.setState({ 
          isApiRunning: true,
          apiVersion: res.data.version
        });

        console.log(useOllamaStore.getState())
      }
    });
  }, [apiUrl]);

  return (
    <div className="General">
      <h3>General configuration</h3>
      {
        isApiRunning
          ? <p>Ollama version: {apiVersion}</p>
          : <p>Ollama version not found, are you sure that the server is running?</p>
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
        <input type="text" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
      </div>
    </div>
  )
}