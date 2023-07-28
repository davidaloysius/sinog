import React, { useEffect, useState } from "react";
import "./App.css";
import PlayerDetails from "../PlayerDetails";
import AddNewEventButton from "../AddNewEventButton/AddNewEventButton";
import AddEventForm from '../AddEventForm';
import { addEvent, getEvents } from "../../redux/EventsListStore";
import { useSelector, useDispatch } from "react-redux";

import styled from "styled-components";
import { BarLoader } from "react-spinners";

// const store = EventsListRedux
// const [eventsList, setEventsList] = useState<EventCard>([]);
// console.log(store.getState());

const AppContainer = styled.div`
  background-color: #f7f7f7;
`;

const EventList = styled.div`
  display: flex;
  padding: 0 32px 32px 32px;
  gap: 32px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
`;

const Header = styled.div`
  padding: 32px;
`;

const PageTitle = styled.div`
  font-family: Bungee;
  font-size: 62px;
  font-weight: 600;
`;

const PageSubTitle = styled.div`
  font-size: 14px;
`;

const SubHeader = styled.div`
  font-size: 24px;
  font-weight: 300;
  padding: 16px 16px 0 16px;
`;

const App = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsList.events);
  const [showAdd, setShowAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEvents()).then(() => {
      setIsLoading(false);
    });
  }, []);
  
  const handleSubmit = (data) => {
    dispatch(addEvent(data));
    setShowAdd(false);
  }

  return (
    <AppContainer>
    {isLoading && <BarLoader width={"100%"} height={6} color={"#252e28"} /> }
      <Header>
        <PageTitle>Sino G?!</PageTitle>
      </Header>
      {!isLoading && <EventList>
        {events.length > 0 && events.map((event) => <PlayerDetails data={event} />)}
        {showAdd && <AddEventForm onSubmit={handleSubmit} onCancel={() => setShowAdd(false)} />}
      </EventList>}
      {!isLoading && !showAdd && <AddNewEventButton onClick={() => setShowAdd(true)} />}
    </AppContainer>
  );
};

export default App;
