export interface InputStore {
  inputs: Record<string, string>;
  setInput: (name: string, value: string) => void;
  resetInputs: () => void;
}

export interface ButtonStore {
  click: boolean;
  setClick: () => void;
}