import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../AddNewEventButton/AddNewEventButton.css";
import EventCard from "../EventCard/EventCard";
import { addEvents } from "../../redux/EventsListStore";
import { useDispatch } from "react-redux";

const AddNewEventButton = () => {
  const dispatch = useDispatch<any>();

  const addNewEvent = () => {
    const payload: any = {
      title: "Shindig 2023",
      description: "Shindig",
      venue: "Dumaguete",
      date: "August 18-20, 2023",
      players: ["Kalel Reyes"],
    }
    dispatch(
      addEvents(payload)
    );
  };

  return (
    <div className="AddNewEventButton">
      <button
        className="btn btn-success"
        onClick={() => addNewEvent()}
        style={{ width: "100%" }}
      >
        Add Event
      </button>
    </div>
  );
};

export default AddNewEventButton;
