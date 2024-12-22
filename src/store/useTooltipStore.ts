import { create } from 'zustand';
import { ToolTipProps } from './storeType';

const useToolTipStore = create<ToolTipProps>((set) => ({
  toolTip: false,
  setToolTip: (state) => {
    set(() => ({
      toolTip: state
    }));
  }
}));

export default useToolTipStore;
