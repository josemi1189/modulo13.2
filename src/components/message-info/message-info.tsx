import React from "react";

interface Props {
  message: string;
  typeMsg: boolean | null;
}

/**
 * Recibe
 * @param props { <Props> }
 * @returns Elemento div que muestra message en forma de alert
 */
export const MessageInfo: React.FC<Props> = (props) => {
  const { message, typeMsg } = props;
  let classAsign = "";

  switch (typeMsg) {
    case true:
      classAsign = "accent-success";
      break;
    case false:
      classAsign = "accent-error";
      break;
  }

  return <div className={classAsign}>{message}</div>;
};
