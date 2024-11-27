import React from 'react';
import useInputStore from '@/store/useInputStore';
import { InputProps } from '@/shared/interface/atomsType';

const Input: React.FC<InputProps> = ({ title, placeholder, name, description, maxLength }) => {
  const { inputs, setInput } = useInputStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(name, e.target.value);
    // TODO: 데이터 확인용, 작업 후 삭제 예정
    console.log(e.target.value);
  };

  return (
    <div className="mb-[1rem] text-center">
      {title && <label className="block mb-[0.25rem]">{title}</label>}
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        value={inputs[name] || ''}
        onChange={handleChange}
        maxLength={maxLength}
        className="w-[20rem] h-[3.5rem] mt-[0.5rem] px-[1rem] py-[0.5rem] border border-input rounded-[0.25rem] placeholder-input focus:outline-none  focus:ring-transparent focus:border-main  focus:ring-0 focus:ring-main"
      />
      {description && <p className="text-[0.75rem] mt-[0.5rem] text-input">{description}</p>}
    </div>
  );
};

export default Input;
