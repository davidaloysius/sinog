import React from 'react';
import '../EventCard/EventCard.css';
import styled from 'styled-components';

type Props = {
  data: object;
}

const Card = styled.div`
  border-radius: 8px;
  background: white;
  box-shadow: 5px 10px 24px #d7d7d7;
  max-width: 300px;
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
  display: inline-block
`;

const Content = styled.div`
  padding: 16px;
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
`

const EventCard = ({data} : Props) => {
  const { title, description, venue, date, players }: any = data;

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
          {players.join(',')}
        </PlayerList>
      </Content>
    </Card>
  );
};

export default EventCard;
