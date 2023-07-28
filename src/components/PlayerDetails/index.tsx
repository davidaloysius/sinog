import React, { useState } from "react";
import "../EventCard/EventCard.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addNewPlayer } from "../../redux/EventsListStore";
import { HiArrowRight } from "react-icons/hi";
import PlayerItem from "../PlayerItem";
import moment from "moment";
import EventCard from "../EventCard/EventCard";
import Loader from "react-spinners/MoonLoader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Banner = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-color: #313131;
  padding: 0 16px 16px 16px;
  border-radius: 8px 0 0 8px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  flex: 1;
  box-shadow: 5px 10px 24px #d7d7d7;

  @media only screen and (max-width: 768px) {
    height: 150px;
    border-radius: 8px;
  }
`;

const ContentWrapper = styled.div`
  flex: 3;
`;

const Date = styled.div`
  background: white;
  border-radius: 0 0 8px 8px;
  padding: 16px;
  font-size: 11px;
  display: inline-block;
`;

const Content = styled.div`
  padding: 24px;
  color: #0e0d0d;
`;

const Title = styled.div`
  font-size: 16px;
  font-family: Bungee;
  font-weight: 600;
`;

const Description = styled.div`
  font-size: 12px;
`;

const Venue = styled.div`
  font-size: 12px;
`;

const PlayerList = styled.div`
  margin: 10px 0 0 0;
  font-size: 12px;
`;

const PlayerInput = styled.input`
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #848484;
  font-size: 11px;
`;

const AddPlayer = styled.button`
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  display: flex;
  gap: 8px;
  align-items: center;
  border: 0;
  background: #198754;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 8px;
  text-align: center;
  color: #f7f7f7;
  font-size: 10px;
  font-family: Bungee;
  &:hover {
    background: #136f44;
  }
`;

const CancelPlayer = styled.button`
  opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  border: 0;
  cursor: pointer;
  padding: 8px 8px;
  text-align: center;
  color: #313131;
  font-size: 10px;
  background: transparent;
  font-family: Bungee;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const NewPlayerBottom = styled.div`
  background: #198754a8;
  text-align: center;
  border-radius: 0px 0px 8px 0;
  padding: 12px 8px;
  color: white;
  font-size: 11px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: Bungee;

  &:hover {
    background: #198754;
  }

  @media only screen and (max-width: 768px) {
    border-radius: 0px 0px 8px 8px;
  }
`;

const NewPlayerForm = styled.div`
  display: flex;
  padding: 0 16px 16px 16px;
  gap: 6px;
  flex-direction: column;
`;

const ActionButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: Bungee;
`;

const Day = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const Month = styled.div`
  font-weight: 600;
  text-transform: uppercase;
`;

const Year = styled.div`
  font-weight: 400;
  text-transform: uppercase;
`;

const PlayerDetails = ({ data }: any) => {
  const dispatch = useDispatch<any>();
  const [newPlayer, setNewPlayer] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const {
    _id,
    title,
    description,
    venue,
    fromDate,
    toDate,
    players,
    imageUrl,
  }: any = data;

  const convertDate = (date) => {
    const momentDate: any = moment(date, "MMMM DD, YYYY");

    if (!momentDate?._isValid) return;

    return (
      <Date>
        <DateWrapper>
          <Day>{momentDate.format("DD")}</Day>
          <Month>{momentDate.format("MMM")}</Month>
          <Year>{momentDate.format("YYYY")}</Year>
        </DateWrapper>
      </Date>
    );
  };

  const handleAddPlayer = () => {
    const payload = {
      id: _id,
      newData: {
        players: [...players, newPlayer],
      },
    };

    setIsAdding(true);

    dispatch(addNewPlayer(payload))
      .then(() => {
        debugger;
        setNewPlayer("");
        setShowAdd(false);
        setIsAdding(false);
      })
      .catch(() => {});
  };

  const handleDeletePlayer = (index) => {
    const findPlayer = players[index];
    console.log(findPlayer);

    const newPlayers = [...players];
    newPlayers.splice(index, 1);

    const payload = {
      id: _id,
      newData: {
        players: [...newPlayers],
      },
    };

    dispatch(addNewPlayer(payload));
  };

  return (
    <EventCard>
      <Wrapper>
        <Banner imageUrl={imageUrl}>
          {convertDate(fromDate)}
          {toDate && convertDate(toDate)}
        </Banner>
        <ContentWrapper>
          <Content>
            <Title>{title}</Title>
            <Venue>{venue}</Venue>
            <Description>{description}</Description>
            <PlayerList>
              <div>Players:</div>
              <ul>
                {players &&
                  players.map((player, index) => (
                    <li>
                      <PlayerItem
                        name={player}
                        onDelete={() => handleDeletePlayer(index)}
                      />
                    </li>
                  ))}
              </ul>
            </PlayerList>
          </Content>
          {showAdd ? (
            <NewPlayerForm>
              <PlayerInput
                type="text"
                onChange={(event) => setNewPlayer(event?.target?.value)}
                value={newPlayer}
                placeholder="Player Name"
                disabled={isAdding}
              />
              <ActionButton>
                <CancelPlayer
                  onClick={() => setShowAdd(false)}
                  disabled={isAdding}
                >
                  CANCEL
                </CancelPlayer>
                <AddPlayer onClick={handleAddPlayer} disabled={isAdding}>
                  {isAdding && <Loader size={12} color={"white"} />}ADD PLAYER{" "}
                  <HiArrowRight />
                </AddPlayer>
              </ActionButton>
            </NewPlayerForm>
          ) : (
            <NewPlayerBottom onClick={() => setShowAdd(!showAdd)}>
              Add new player
            </NewPlayerBottom>
          )}
        </ContentWrapper>
      </Wrapper>
    </EventCard>
  );
};

export default PlayerDetails;
