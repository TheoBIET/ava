/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { IpcService } from "../../services/ipcService";

interface Version {
  version: string;
}

export default function Version({ className }: Readonly<{
  className: string;
}>) {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState<boolean>(false);
  const [isUpdateDownloaded, setIsUpdateDownloaded] = useState<boolean>(false);
  const [version, setVersion] = useState<Version>({ version: '' });

  useEffect(() => {
    (new IpcService()).send('version').then((res) => {
      setVersion(res as Version);
    });
  }, []);

  return (
    <div className={`Version ${className} ${isUpdateAvailable ? '--available' : ''}`}>
      <span className="Version__version">{version.version}</span>
      {
        isUpdateAvailable && !isUpdateDownloaded ?
          <div>Downloading...</div> 
          : isUpdateAvailable && isUpdateDownloaded ?
            <button>Restart</button> :
            <div>OK</div>
      }
    </div>
  )
}