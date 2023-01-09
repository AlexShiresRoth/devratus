import React from "react";
import { AiOutlineClose } from "react-icons/ai";

type Props = {
  toggleModalVisibility: (val: boolean) => void;
};

const CloseModalButton = ({ toggleModalVisibility }: Props) => {
  return (
    <button
      onClick={() => toggleModalVisibility(false)}
      className='text-xs text-slate-400 flex items-center gap-1   transition-all hover:text-red-500 '
    >
      <AiOutlineClose /> Close
    </button>
  );
};

export default CloseModalButton;
