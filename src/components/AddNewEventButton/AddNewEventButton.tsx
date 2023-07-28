import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../AddNewEventButton/AddNewEventButton.css";
import EventCard from "../EventCard/EventCard";
import { useDispatch } from "react-redux";
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
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #41966a;
  }
`;

const AddNewEventButton = ({ onClick}) => {
  const dispatch = useDispatch<any>();

  return (
    <ButtonoWrapper>
      <Button onClick={() => onClick()}>Add Tournaments</Button>
    </ButtonoWrapper>
  );
};

export default AddNewEventButton;
