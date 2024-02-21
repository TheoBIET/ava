import { create } from "zustand";

type Message = {
  author: 'user' | 'ava';
  content: string;
};

type State = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

export const useConversationStore = create<State>((set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));