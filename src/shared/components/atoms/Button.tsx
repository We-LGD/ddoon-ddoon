import { useState } from 'react';

function Button() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-[10rem] h-[3.125rem] text-white rounded bg-main hover:bg-active disabled:bg-disabled ${isClicked ? 'bg-active' : 'bg-main'}`}
    >
      Button
    </button>
  );
}

export default Button;
