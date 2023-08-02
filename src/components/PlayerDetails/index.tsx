import React, { useState } from "react";
import "../EventCard/EventCard.css";
import styled, { keyframes, css } from "styled-components";
import { useDispatch } from "react-redux";
import { addNewPlayer, deleteEvent } from "../../redux/EventsListStore";
import { HiArrowRight, HiX } from "react-icons/hi";
import PlayerItem from "../PlayerItem";
import moment from "moment";
import EventCard from "../EventCard/EventCard";
import Loader from "react-spinners/MoonLoader";
import Modal from "../Modal";

const keyframesShimmer = keyframes`
  0% {
    background-position: -80vw 0;
  }
  100% {
    background-position: 80vw 0;
  }
`;

const shimmerAnimation = css`
  background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 80vw 100%;
  animation: ${keyframesShimmer} 2s infinite linear;
`;

const Wrapper = styled.div<any>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  ${({ isDeleting }) => isDeleting && shimmerAnimation};
`;

const DeleteWrapper = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  color: #313131;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    background: #ffffff4a;
    color: white;
  }
`;

const Banner = styled.div<any>`
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-color: #313131;
  padding: 0 32px 32px 32px;
  border-radius: 32px 0 0 32px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  flex: 1;
  box-shadow: 5px 10px 24px #d7d7d7;

  @media only screen and (max-width: 768px) {
    height: 175px;
    border-radius: 32px;
    flex: initial;
  }
`;

const ContentWrapper = styled.div`
  flex: 3;
`;

const Date = styled.div`
  background: white;
  border-radius: 0 0 16px 16px;
  padding: 16px;
  font-size: 11px;
  display: inline-block;
`;

const Content = styled.div`
  padding: 32px;
  color: #0e0d0d;
`;

const Title = styled.div`
  font-size: 24px;
  font-family: Bungee;
  font-weight: 600;
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const Venue = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const PlayerList = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

const PlayerInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #848484;
  font-size: 13px;
`;

const AddPlayer = styled.button`
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  display: flex;
  gap: 8px;
  align-items: center;
  border: 0;
  background: #e76f8c;
  border-radius: 50px;
  cursor: pointer;
  padding: 8px 24px;
  text-align: center;
  color: #f7f7f7;
  font-size: 10px;
  font-family: Bungee;
  &:hover {
    box-shadow: inset 1px -7px 13px 0px #0000003b;
  }
`;

const CancelPlayer = styled.button`
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  border: 0;
  cursor: pointer;
  padding: 16px 8px;
  text-align: center;
  color: #313131;
  font-size: 12px;
  background: transparent;
  font-family: Bungee;
  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const NewPlayerBottom = styled.div<any>`
  opacity: ${({ disabled }) => (disabled ? "0.7" : "1")};
  background: #e76f8cb3;
  text-align: center;
  border-radius: 0px 0px 32px 0;
  padding: 20px;
  color: #313131;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  font-family: Bungee;

  &:hover {
    background: #e76f8c;
  }

  @media only screen and (max-width: 768px) {
    border-radius: 0px 0px 32px 32px;
  }
`;

const NewPlayerForm = styled.div`
  display: flex;
  padding: 0 32px 16px 32px;
  gap: 12px;
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

const PlayersTitle = styled.div`
  margin: 10px 0 4px 0;
  font-size: 16px;
  font-family: Bungee;
`;

const Player = styled.div`
  font-size: 14px;
  margin-bottom: 4px;
`;

const PlayerDetails = ({ data }: any) => {
  const dispatch = useDispatch<any>();
  const [newPlayer, setNewPlayer] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deletingPlayer, setDeletingPlayer] = useState(false);

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
        setNewPlayer("");
        setShowAdd(false);
        setIsAdding(false);
      })
      .catch(() => {
        setNewPlayer("");
        setShowAdd(false);
        setIsAdding(false);
      });
  };

  const handleDeletePlayer = (index) => {
    const findPlayer = players[index];
    setDeletingPlayer(true);

    const newPlayers = [...players];
    newPlayers.splice(index, 1);

    const payload = {
      id: _id,
      newData: {
        players: [...newPlayers],
      },
    };

    dispatch(addNewPlayer(payload))
      .then(() => {
        setDeletingPlayer(false);
      })
      .catch(() => {
        setDeletingPlayer(false);
      });
  };

  const handleDeleteEvent = () => {
    setShowAdd(false);
    setIsDeleting(true);
    dispatch(deleteEvent({ id: _id }))
      .then(() => {
        setIsDeleting(false);
      })
      .catch(() => {
        setShowModal(false);
        setIsDeleting(true);
      });
  };

  return (
    <EventCard>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={handleDeleteEvent}
          isLoading={isDeleting}
        />
      )}
      <Wrapper isDeleting={isDeleting || deletingPlayer}>
        <DeleteWrapper onClick={() => setShowModal(true)}>
          <HiX />
        </DeleteWrapper>
        <Banner imageUrl={imageUrl}>
          {convertDate(fromDate)}
          {toDate && convertDate(toDate)}
        </Banner>
        <ContentWrapper>
          <Content>
            <Title>{title}</Title>
            <Venue>{venue}</Venue>
            <Description>{description}</Description>
            <PlayersTitle>Players:</PlayersTitle>
            <PlayerList>
              {players &&
                players.map((player, index) => (
                  <Player>
                    <PlayerItem
                      disabled={deletingPlayer}
                      name={player}
                      onDelete={() => handleDeletePlayer(index)}
                    />
                  </Player>
                ))}
            </PlayerList>
          </Content>
          {showAdd ? (
            <NewPlayerForm>
              <PlayerInput
                type="text"
                onChange={(event) => setNewPlayer(event?.target?.value)}
                value={newPlayer}
                placeholder="Player Name"
                disabled={isAdding || isDeleting}
              />
              <ActionButton>
                <CancelPlayer
                  onClick={() => setShowAdd(false)}
                  disabled={isAdding || isDeleting}
                >
                  CANCEL
                </CancelPlayer>
                <AddPlayer
                  onClick={handleAddPlayer}
                  disabled={isAdding || isDeleting}
                >
                  {(isAdding || isDeleting) && (
                    <Loader size={12} color={"white"} />
                  )}
                  ADD PLAYER <HiArrowRight />
                </AddPlayer>
              </ActionButton>
            </NewPlayerForm>
          ) : (
            <NewPlayerBottom
              onClick={() => setShowAdd(!showAdd)}
              disabled={isDeleting}
            >
              Add new player
            </NewPlayerBottom>
          )}
        </ContentWrapper>
      </Wrapper>
    </EventCard>
  );
};

export default PlayerDetails;
