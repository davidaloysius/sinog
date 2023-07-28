import React, { useState } from "react";
import "../EventCard/EventCard.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addNewPlayer } from "../../redux/EventsListStore";
import { HiArrowRight } from "react-icons/hi";
import PlayerItem from "../PlayerItem";

type Props = {
  data: object;
};

const Card = styled.div`
  border-radius: 8px;
  background: white;
  box-shadow: 5px 10px 24px #d7d7d7;
  min-width: 350px;
  max-width: 350px;
`;

const Banner = styled.div`
  background-color: #313131;
  padding: 16px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  lign-content: flex-end;
  align-items: flex-end;
  justify-content: flex-start;
`;

const Date = styled.div`
  background: white;
  border-radius: 8px;
  padding: 8px;
  font-size: 11px;
  display: inline-block;
`;

const Content = styled.div`
  padding: 24px;
  color: #0e0d0d;
`;

const Title = styled.div`
  font-size: 16px;
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

const AddPlayer = styled.div`
  background: #198754;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 8px;
  text-align: center;
  color: #f7f7f7;
  font-size: 10px;
  &:hover {
    background: #136f44;
`;

const CancelPlayer = styled.div`
  cursor: pointer;
  padding: 8px 8px;
  text-align: center;
  color: #313131;
  font-size: 10px;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const NewPlayerBottom = styled.div`
  background: #198754a8;
  text-align: center;
  border-radius: 0px 0px 8px 8px;
  padding: 8px;
  color: white;
  font-size: 11px;
  text-transform: uppercase;
  cursor: pointer;
  &:hover {
    background: #198754;
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

const EventCard = ({ data }: Props) => {
  const dispatch = useDispatch<any>();
  const [newPlayer, setNewPlayer] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const { _id, title, description, venue, date, players }: any = data;

  const handleAddPlayer = () => {
    const payload = {
      id: _id,
      newData: {
        players: [...players, newPlayer],
      },
    };

    debugger;
    setNewPlayer("");
    setShowAdd(false);
    dispatch(addNewPlayer(payload));
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
    <Card>
      <Banner>
        <Date>{date}</Date>
      </Banner>
      <Content>
        <Title>{title}</Title>
        <Venue>{venue}</Venue>
        <Description>{description}</Description>
        <PlayerList>
          <div>Players:</div>
          <ul>{players && players.map((player, index) => <li><PlayerItem name={player} onDelete={() => handleDeletePlayer(index)}/></li>)}</ul>
        </PlayerList>
      </Content>
      {showAdd ? (
        <NewPlayerForm>
          <PlayerInput
            type="text"
            onChange={(event) => setNewPlayer(event?.target?.value)}
            value={newPlayer}
            placeholder="Player Name"
          />
          <ActionButton>
            <CancelPlayer onClick={() => setShowAdd(false)}>
              CANCEL
            </CancelPlayer>
            <AddPlayer onClick={handleAddPlayer}>
              ADD PLAYER <HiArrowRight />
            </AddPlayer>
          </ActionButton>
        </NewPlayerForm>
      ) : (
        <NewPlayerBottom onClick={() => setShowAdd(!showAdd)}>
          Add new player
        </NewPlayerBottom>
      )}
    </Card>
  );
};

export default EventCard;
