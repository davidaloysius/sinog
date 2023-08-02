import React, { FC, useState } from "react";
import styled from "styled-components";
import { HiX } from "react-icons/hi";

type PlayerProps = {
  name: string;
  onDelete: () => {} | void;
  disabled?: boolean;
};

const PlayerWrapper = styled.div<any>`
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  padding: 8px 16px;
  background: #f4efef;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Delete = styled<any>(HiX)`
  color: #f09baf;
  cursor: pointer;
  opacity: ${({ showDelete }) => (showDelete ? "1" : "1")};
`;

const PlayerItem: FC<PlayerProps> = ({ name, onDelete, disabled }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    if (disabled) return;
    onDelete();
  };

  return (
    <PlayerWrapper
      disabled={disabled}
      onMouseOver={() => setShowDelete(true)}
      onMouseOut={() => setShowDelete(false)}
    >
      {name} <Delete onClick={() => handleDelete()} showDelete={showDelete} />
    </PlayerWrapper>
  );
};

export default PlayerItem;
