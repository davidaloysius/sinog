import React, { useEffect, useState } from "react";
import "./App.css";
import PlayerDetails from "../PlayerDetails";
import AddNewEventButton from "../AddNewEventButton/AddNewEventButton";
import AddEventForm from "../AddEventForm";
import { addEvent, getEvents } from "../../redux/EventsListStore";
import { useSelector, useDispatch } from "react-redux";
import logo from "./../../assets/logo.png";

import styled from "styled-components";
import { BarLoader } from "react-spinners";

const AppContainer = styled.div`
  background-color: #e76f8c;
`;

const EventList = styled.div`
  display: flex;
  padding: 0 50px 32px 50px;
  gap: 36px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  height: 100%;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 32px 50px;
`;

const PageTitle = styled.div`
  font-family: Bungee;
  font-size: 62px;
  font-weight: 600;
  text-align: center;
  color: #e76f8c;
  text-shadow: 7px 4px 0px #313131;
`;

const LogoWrapper = styled.div`
  color: #f5f5f5;
  display: flex;
  flex-direction: row;
  font-family: Bungee;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  height: 30px;
  gap: 8px;
`;

const ThugsLogo = styled.img`
  width: 30px;
`;

const Content = styled.div`
  background: #f5f5f5;
  max-width: 1000px;
  width: 95%;
  margin: 0 auto 32px auto;
  border-radius: 50px;
  box-shadow: 1px -2px 16px 16px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.eventsList.events);
  const [showAdd, setShowAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getEvents()).then(() => {
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (data) => {
    setIsSubmitting(true);
    dispatch(addEvent(data)).then(() => {
      setIsSubmitting(false);
      setShowAdd(false);
    });
  };

  return (
    <AppContainer>
      {isLoading && <BarLoader width={"100%"} height={6} color={"#252e28"} />}
      <LogoWrapper>
        <ThugsLogo src={logo} /> Thugs Ultimate
      </LogoWrapper>
      <Content>
        <Header>
          <PageTitle>Sino G?!</PageTitle>
        </Header>
        {!isLoading && (
          <EventList>
            {events.length > 0 &&
              events.map((event) => <PlayerDetails data={event} />)}
            {showAdd && (
              <AddEventForm
                onSubmit={handleSubmit}
                onCancel={() => setShowAdd(false)}
                isSubmitting={isSubmitting}
              />
            )}
          </EventList>
        )}
        {!showAdd && <AddNewEventButton onClick={() => setShowAdd(true)} />}
      </Content>
    </AppContainer>
  );
};

export default App;
