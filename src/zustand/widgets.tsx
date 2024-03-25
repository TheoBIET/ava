import { create } from "zustand";
import { Widget, widgets } from "../constants/widgets";

type State = {
  list: Widget[];
  active: Widget[];
  toggleWidget: (widget: Widget) => void;
};

export const useWidgetsStore = create<State>((set) => ({
  list: widgets,
  active: widgets.filter((widget) => widget.active),
  toggleWidget: (widget: Widget) => {
    set((state) => {
      const isActive = state.active.find((activeWidget) => activeWidget.component === widget.component);
      return {
        active: isActive
          ? state.active.filter((activeWidget) => activeWidget.component !== widget.component)
          : [...state.active, widget],
      };
    });
  }
}));