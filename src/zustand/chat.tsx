import { create } from "zustand";
import { Message } from "ollama";
import { IpcService } from "../services/ipcService";

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
    const response = await (new IpcService()).send('chat', {
      args: {
        messages: get().messages
      }
    });

    if (response instanceof Error) set({ isError: true });
    else set((state) => ({ messages: [...state.messages, response as Message], isLoading: false }));
  }
}));