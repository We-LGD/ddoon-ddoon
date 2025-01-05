import React from 'react';
import useInputStore from '@/store/useInputStore';
import { InputProps } from '@/shared/interface/atomsType';

function Input({ title, placeholder, name, description, maxLength }: InputProps) {
  const { inputs, setInput } = useInputStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInput(name, e.target.value);
    }
  };

  return (
    <div className="mb-[1rem] text-center w-full max-w-[20rem]">
      {title && <label className="block mb-[0.25rem]">{title}</label>}
      <input
        type="text"
        required
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        value={inputs[name] || ''}
        onChange={handleChange}
        maxLength={maxLength}
        className="w-full h-[3.5rem] mt-[0.5rem] px-[1rem] py-[0.5rem] border border-input rounded-[0.25rem] placeholder-input focus:outline-none focus:ring-transparent focus:border-main focus:ring-0  focus:ring-main"
      />
      {description && <p className="text-[0.75rem] mt-[0.5rem] text-input">{description}</p>}
    </div>
  );
}

export default Input;
