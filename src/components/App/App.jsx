import "./App.css";
import EventCard from "../EventCard/EventCard";
import AddNewEventButton from "../AddNewEventButton/AddNewEventButton";
import EventsListRedux, { getEvents } from "../../redux/EventsListStore";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";

// const store = EventsListRedux
// const [eventsList, setEventsList] = useState<EventCard>([]);
// console.log(store.getState());

const AppContainer = styled.div`
  background-color: #f7f7f7;
`;

const EventList = styled.div`
  display: flex;
  padding: 16px;
  gap: 16px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.div`
  background-color: #252e28;
  padding: 32px;
  color: #f7f7f7;
`;

const PageTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const PageSubTitle = styled.div`
  font-size: 14px;
`;

const App = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsList.events);
  console.log(events);

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <AppContainer>
      <Header>
        <PageTitle>SINO G?!</PageTitle>
        <PageSubTitle>Thugs Ultimate</PageSubTitle>
      </Header>
      <EventList>
        {events.length > 0 && events.map((event) => <EventCard data={event} />)}
      </EventList>
      {/* <AddNewEventButton /> */}
    </AppContainer>
  );
};

export default App;
