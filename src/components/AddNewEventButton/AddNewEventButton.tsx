import React, { useState, useEffect } from "react";
import "../AddNewEventButton/AddNewEventButton.css";
import styled from "styled-components";

const ButtonoWrapper = styled.div`
  display: flex;
  padding: 16px
`;

const Button = styled.div`
  width: 100%;
  background: #198754;
  border-radius: 8px;
  padding: 12px 16px;
  text-align: center;
  color: #f7f7f7;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
  font-family: Bungee;

  &:hover {
    background: #41966a;
  }
`;

const AddNewEventButton = ({ onClick}) => {

  return (
    <ButtonoWrapper>
      <Button onClick={() => onClick()}>Add Event</Button>
    </ButtonoWrapper>
  );
};

export default AddNewEventButton;
