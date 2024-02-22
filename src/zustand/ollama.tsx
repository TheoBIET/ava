import { create } from "zustand";
import { models, Model } from '../../shared/constants/models';

type State = {
  apiUrl: string;
  selectedModel: string;
  models: Model[];
};

export const useOllamaStore = create<State>(() => ({
  apiUrl: 'http://127.0.0.1:11434',
  selectedModel: 'mistral',
  models,
}));