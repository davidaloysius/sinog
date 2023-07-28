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
  width: 200px;
  background: #198754;
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  color: #f7f7f7;
`;

const AddNewEventButton = () => {
  const dispatch = useDispatch<any>();

  const addNewEvent = () => {
    const payload: any = {
      title: "Shindig 2023",
      description: "Shindig",
      venue: "Dumaguete",
      date: "August 18-20, 2023",
      players: ["Kalel Reyes"],
    };
    // dispatch(updateEvent());
  };

  return (
    <ButtonoWrapper>
      <Button onClick={() => addNewEvent()}>Add Event</Button>
    </ButtonoWrapper>
  );
};

export default AddNewEventButton;
