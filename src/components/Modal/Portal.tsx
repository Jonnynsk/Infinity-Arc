import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children: ReactNode; 
}

export const Portal = ({ children = null }: IProps) => {
  const [modalWrapper, setModalWrapper] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let wrapper = document.querySelector<HTMLElement>("#modal");

    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "modal";
      document.body.appendChild(wrapper);
    }

    setModalWrapper(wrapper);
  }, []);

  return modalWrapper ? createPortal(children, modalWrapper) : null;
};
