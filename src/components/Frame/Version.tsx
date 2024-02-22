import { useEffect, useState } from "react";
import { Version as VersionInterface } from "../../../shared/interfaces/Version";
import IpcService from "../../services/ipcService";
import { FaDownload, FaSync } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function Version() {
  const [isUpdateAvailable] = useState<boolean>(false);
  const [isUpdateDownloaded] = useState<boolean>(false);
  const [version, setVersion] = useState<VersionInterface>({ version: '' });

  useEffect(() => {
    IpcService.send('version').then((res) => {
      setVersion(res as VersionInterface);
    });
  }, []);

  return (
    <div className={`Version ${isUpdateAvailable ? '--available' : ''}`}>
      <span className="Version__version">{version.version}</span>
      {
        isUpdateAvailable && !isUpdateDownloaded ?
          <div className="Version__action">
            <FaDownload />
          </div> 
          : isUpdateAvailable && isUpdateDownloaded ?
            <div className="Version__action">
              <FaSync />
            </div> 
            :
            <div className="Version__action">
              <FaCheck />
            </div>
      }
    </div>
  )
}