import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 8px;
  background: white;
  box-shadow: 5px 10px 24px #d7d7d7;
  min-width: 350px;
  max-width: 350px;

  @media only screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

const EventCard = ({ children }: any) => {
  
  return (
    <Card>
        {children}
    </Card>
  );
};

export default EventCard;
