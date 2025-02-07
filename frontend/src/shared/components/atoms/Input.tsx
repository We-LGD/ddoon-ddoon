import React from 'react';
import { isMobile } from 'react-device-detect';
import useInputStore from '@/shared/store/useInputStore';
import { InputProps } from '@/shared/interface/atomsType';

export default function Input({ theme, type = 'text', title, placeholder, name, description, maxLength }: InputProps) {
  const { inputs, setInput } = useInputStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setInput(name, e.target.value);
    }
  };

  return (
    <div
      className={`
        ${theme === 'auth' ? 'w-[27.375rem]' : null} 
        ${theme === 'tutorial' || theme === 'challenge' ? 'mb-[1rem] w-full max-w-[20rem]' : null}
        ${isMobile ? 'w-full' : null}
        text-center
      `}
    >
      {title && <label className="block mb-[0.25rem]">{title}</label>}
      <input
        type={type}
        required
        autoComplete="off"
        placeholder={placeholder}
        name={name}
        value={inputs[name] || ''}
        onChange={handleChange}
        maxLength={maxLength}
        className={`
          ${title && 'mt-[0.5rem]'} 
          w-full h-[3.5rem] px-[1rem] py-[0.5rem] border border-input rounded-[0.25rem] placeholder-input focus:outline-none focus:ring-transparent focus:border-main focus:ring-0  focus:ring-main
        `}
      />
      {description && <p className="text-[0.75rem] mt-[0.5rem] text-input">{description}</p>}
    </div>
  );
}
