import React from "react";

type Props = {
  labelText?: string;
  htmlFor?: string;
  inputName: string;
  inputId?: string;
  inputValue: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({
  labelText,
  htmlFor,
  inputName,
  inputId,
  inputValue,
  onChange,
  placeholder,
}: Props) => {
  return (
    <>
      <label htmlFor={htmlFor} className="text-slate-100">
        {labelText}
      </label>
      <input
        type="text"
        name={inputName}
        id={inputId}
        value={inputValue}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 bg-slate-800 rounded text-slate-50 border-b-4 border-b-sky-400"
      />
    </>
  );
};

export default TextInput;
