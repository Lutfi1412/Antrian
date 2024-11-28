import React, { FC } from "react";

interface ButtonPanggilanProps {
  handlePanggilan: () => void;
  classname?: string;
  classname2?: string;
  classname3?: string;
}

const ButtonPanggilan: FC<ButtonPanggilanProps> = ({
  handlePanggilan,
  classname,
  classname2,
  classname3,
}) => {
  return (
    <button className={`${classname || ""}`} onClick={handlePanggilan}>
      <i className={`${classname2 || ""}`}></i>
      {classname3 || ""}
    </button>
  );
};

export default ButtonPanggilan;
