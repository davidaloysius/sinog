import React from 'react';
import '../EventCard/EventCard.css';

type Props = {
  name: string;
}

const EventCard = ({name}: Props) => (
  
  <div className='EventCard'>
    <div className='EventCardText'>Event Name: {name}</div>
  </div>
);

export default EventCard;
