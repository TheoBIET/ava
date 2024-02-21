import { useEffect, useState } from "react";

export default function Version({ className }: Readonly<{
  className: string;
}>) {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateDownloaded, setIsUpdateDownloaded] = useState(false);
  const [version, setVersion] = useState('');

  useEffect(() => {
    if(!version) {
      window.ipcRenderer.send('get-app-version')

      window.ipcRenderer.on('get-app-version', (_: any, arg: any) => {
        setVersion(arg.version)
        window.ipcRenderer.removeAllListeners('get-app-version')
      });

      window.ipcRenderer.on('update_available', () => {
        setIsUpdateAvailable(true);
      });

      window.ipcRenderer.on('update_downloaded', () => {
        setIsUpdateAvailable(true);
        setIsUpdateDownloaded(true);
      });
    }
  }, [version]);

  const handleUpdate = () => {
    window.ipcRenderer.send('quit-and-install');
  }

  return (
    <div className={`Version ${className} ${isUpdateAvailable ? '--available' : ''}`}>
      <span className="Version__version">{version}</span>
      {
        isUpdateAvailable && !isUpdateDownloaded ?
          <div>Downloading...</div> 
          : isUpdateAvailable && isUpdateDownloaded ?
          <button onClick={handleUpdate}>Restart</button> :
          <div>OK</div>
      }
    </div>
  )
}