import { create } from "zustand";
import { models, Model } from '../../shared/constants/models';

type State = {
  apiVersion: string | null;
  isApiRunning: boolean;
  apiUrl: string;
  selectedModel: string;
  models: Model[];
  setApiUrl: (apiUrl: string) => void;
};

export const useOllamaStore = create<State>((set) => ({
  apiVersion: null,
  isApiRunning: false,
  apiUrl: 'http://127.0.0.1:11434',
  selectedModel: 'mistral',
  models,
  setApiUrl: (apiUrl: string) => {
    set({ apiUrl, apiVersion: null, isApiRunning: false });
  }
}));