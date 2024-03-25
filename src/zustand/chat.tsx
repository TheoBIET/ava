import { create } from "zustand";
import { Message } from "ollama";
import IpcService from "../services/ipcService";
import { useOllamaConfigStore } from "./ollamaConfig";
import { IpcResponse } from "../../shared/interfaces/IpcResponse";

type State = {
  isLoading: boolean;
  isError: boolean;
  messages: Message[];
  getChatCompletion: (input: string) => Promise<void>;
};

export const useChatStore = create<State>((set, get) => ({
  isLoading: false,
  isError: false,
  messages: [],
  getChatCompletion: async (input: string) => {
    set((state) => ({ messages: [...state.messages, { content: input, role: 'user' }], isLoading: true }));
    const response = await IpcService.send('chat', {
      apiUrl: useOllamaConfigStore.getState().apiUrl,
      model: useOllamaConfigStore.getState().selectedModel,
      messages: get().messages,
    }) as IpcResponse;

    if (response.error.status !== 'KO') {
      set((state) => ({ messages: [...state.messages, response.data.message], isLoading: false }));
    }
  }
}));