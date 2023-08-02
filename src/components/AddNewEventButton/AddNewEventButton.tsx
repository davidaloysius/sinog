import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ButtonWrapper = styled.div`
  display: flex;
  padding: 16px 50px 50px 50px;
`;

const Button = styled.div`
  width: 100%;
  background: #e76f8c;
  border-radius: 32px;
  padding: 16px 16px;
  text-align: center;
  color: #313131;
  text-transform: uppercase;
  font-size: 16px;
  cursor: pointer;
  font-family: Bungee;

  &:hover {
    box-shadow: inset 1px -7px 13px 0px #0000003b;
  }
`;

const AddNewEventButton = ({ onClick }) => {
  return (
    <ButtonWrapper>
      <Button onClick={() => onClick()}>Add Event</Button>
    </ButtonWrapper>
  );
};

export default AddNewEventButton;
