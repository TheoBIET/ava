import { useEffect } from "react";
import { useOllamaConfigStore } from "../../zustand/ollamaConfig";
import { LocaleKeys } from '../../../shared/constants/locales';
import IpcService from "../../services/ipcService";

export default function General() {
  const isApiRunning = useOllamaConfigStore((state) => state.isApiRunning);
  const apiVersion = useOllamaConfigStore((state) => state.apiVersion);
  const setApiUrl = useOllamaConfigStore((state) => state.setApiUrl);
  const apiUrl = useOllamaConfigStore((state) => state.apiUrl);
  const locales = useOllamaConfigStore((state) => state.locales);
  const selectedLocale = useOllamaConfigStore((state) => state.selectedLocale);
  const selectedModel = useOllamaConfigStore((state) => state.selectedModel);
  const models = useOllamaConfigStore((state) => state.models);

  useEffect(() => {
    IpcService.send('ollama-version',  { apiUrl }).then((res) => {
      console.log(res)
      if (res.error.status !== 'KO') {
        useOllamaConfigStore.setState({ 
          isApiRunning: true,
          apiVersion: res.data.version
        });

        console.log(useOllamaConfigStore.getState())
      }
    });
  }, [apiUrl]);

  const handleSelectLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useOllamaConfigStore.setState({ selectedLocale: e.target.value as LocaleKeys });
  }

  const handleSelectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    useOllamaConfigStore.setState({ selectedModel: e.target.value });
  }

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
  }

  return (
    <div className="General">
      <h3>General configuration</h3>
      <div className={`General__status ${isApiRunning ? '--success' : '--error'}`}>
        {isApiRunning ? `Ollama API ${apiVersion} 🚀` : `Can't get the Ollama API version, are you sure the server is running at ${apiUrl}?`}
      </div>
      <br></br> {/* 💩 */}
      <div className="InputSelect">
        <label>Selected Locale :</label>
        <select value={selectedLocale} onChange={handleSelectLocale}>
          {locales.map((locale, index) => (
            <option key={index} value={locale.key}>
              {locale.label}
            </option>
          ))}
        </select>
      </div>
      <div className="Input">
        <label>Ollama API URL :</label>
        <input type="text" value={apiUrl} onChange={handleApiUrlChange} />
      </div>
      {isApiRunning && (
        <div className="InputSelect">
          <label>LLM Model to query from oLLama API :</label>
          <select value={selectedModel} onChange={handleSelectModel}>
            {models.map((model, index) => (
              <option key={index} value={model.name}>
                {model.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}