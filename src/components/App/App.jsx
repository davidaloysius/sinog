import "./App.css";
import EventCard from "../EventCard/EventCard";
import AddNewEventButton from "../AddNewEventButton/AddNewEventButton";
import EventsListRedux, { getEvents } from "../../redux/EventsListStore";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// const store = EventsListRedux
// const [eventsList, setEventsList] = useState<EventCard>([]);
// console.log(store.getState());
const App = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsList.events);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div className="App">
      <div>title</div>
      <div className="col-md-3" style={{ border: "1px black solid" }}>
        <AddNewEventButton />
        {events.length > 0 &&
          events.map(({ title }) => <EventCard name={title} />)}
      </div>
      <div className="col-md-9"></div>
    </div>
  );
};

export default App;
