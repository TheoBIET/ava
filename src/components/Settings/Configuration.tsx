import { useEffect, useState } from "react";
import { IpcService } from "../../services/ipcService";
import { System } from "../../../shared/interfaces/System";

export default function Configuration() {
  const [system, setSystem] = useState<System>({ 
    version: '',
    type: '',
    arch: '',
    cpus: '',
    memory: '',
  });

  useEffect(() => {
    (new IpcService()).send('system').then((res) => {
      setSystem(res as System);
    });
  }, []);

  return (
    <div className="Configuration">
      <h3>General configuration</h3>
      <p>Version: {system.version}</p>
      <p>Type: {system.type}</p>
      <p>Arch: {system.arch}</p>
      <p>CPUs: {system.cpus.length}</p>
      <p>Memory: {system.memory}GB</p>
    </div>
  )
}