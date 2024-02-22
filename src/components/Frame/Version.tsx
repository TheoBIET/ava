import { useEffect, useState } from "react";
import { IpcService } from "../../services/ipcService";
import { Version as VersionInterface } from "../../../shared/interfaces/Version";

export default function Version({ className }: Readonly<{
  className: string;
}>) {
  const [isUpdateAvailable] = useState<boolean>(false);
  const [isUpdateDownloaded] = useState<boolean>(false);
  const [version, setVersion] = useState<VersionInterface>({ version: '' });

  useEffect(() => {
    (new IpcService()).send('version').then((res) => {
      setVersion(res as VersionInterface);
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