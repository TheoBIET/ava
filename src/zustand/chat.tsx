import { create } from "zustand";
import { Message, ChatResponse } from "ollama";
import ChatbotService from "../services/chatbot";

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
    window.ipcRenderer.send("chat", input);
    // const chatbot = new ChatbotService();

    // set({ isError: false });
    // set({ isLoading: true });
    // set({ messages: [...get().messages, {
    //   content: input,
    //   role: "user",
    // }]});

    // try {
    //   const response: ChatResponse = await chatbot.chat(get().messages);
    //   set({ messages: [...get().messages, response.message]});
    //   set({ isLoading: false });
    // } catch (error) {
    //   set({ isError: true });
    // }
  },
}));