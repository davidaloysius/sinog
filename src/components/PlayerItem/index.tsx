import React, { FC, useState } from "react";
import styled from "styled-components";
import { HiX } from "react-icons/hi";

type PlayerProps = {
  name: string;
  onDelete: () => {} | void;
};

const PlayerWrapper = styled.div``;

const Delete = styled(HiX)`
  color: red;
  cursor: pointer;
`;

const PlayerItem: FC<PlayerProps> = ({ name, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    onDelete();
  }

  return (
    <PlayerWrapper
      onMouseOver={() => setShowDelete(true)}
      onMouseOut={() => setShowDelete(false)}
    >
      {name} {showDelete && <Delete onClick={() => handleDelete()} />}
    </PlayerWrapper>
  );
};

export default PlayerItem;
