import { create } from "zustand";
import { models, Model } from '../../shared/constants/models';
import { LocaleKeys, Locale, locales } from '../../shared/constants/locales';

type State = {
  apiVersion: string | null;
  isApiRunning: boolean;
  apiUrl: string;
  selectedLocale: LocaleKeys;
  locales: Locale[];
  selectedModel: string;
  models: Model[];
  setApiUrl: (apiUrl: string) => void;
};

export const useOllamaConfigStore = create<State>((set) => ({
  apiVersion: null,
  isApiRunning: false,
  apiUrl: 'http://127.0.0.1:11434',
  selectedLocale: LocaleKeys.EN,
  locales,
  selectedModel: 'mistral',
  models,
  setApiUrl: (apiUrl: string) => {
    set({ apiUrl, apiVersion: null, isApiRunning: false });
  }
}));