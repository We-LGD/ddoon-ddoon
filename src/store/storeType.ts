export interface InputStore {
  inputs: Record<string, string>;
  setInput: (name: string, value: string) => void;
  resetInputs: () => void;
}
