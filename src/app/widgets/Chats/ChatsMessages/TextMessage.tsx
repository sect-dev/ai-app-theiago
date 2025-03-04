import React, {FC, useEffect, useState} from 'react';
import {marked} from "marked";

interface ComponentProps {
  message: string
}

const TextMessage:FC<ComponentProps> = ({message}) => {
  const [text,setText] = useState<string>("")

  useEffect(() => {
    setText(message)
  },[])

  return (
    <p
      className="animate-fadeIn bg-[#21233A] w-fit py-[10px] px-[20px] text-[14px] font-medium rounded-[20px] rounded-bl-none"
      key={text}
      dangerouslySetInnerHTML={{__html:marked(text)}}
    >
    </p>
  );
};

export default TextMessage;