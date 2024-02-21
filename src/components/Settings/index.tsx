/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import links from '../../constants/links';

import Navigation from "./Navigation";
import Audio from "./Audio";

export default function Settings() {
  const [activeTab, setActiveTab] = useState(null);
  const { tab } = useParams();

  useEffect(() => {
    if (tab) return setActiveTab(tab);
    setActiveTab(links[0].path.split("/")[2]);
  }, [tab]);

  return (
    <div className="Settings">
      <Navigation links={links} />
      <div className="Settings__content">
        {activeTab == "audio" && <Audio />}
      </div>
    </div>
  )
}