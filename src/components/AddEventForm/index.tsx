import React, { FC, useState } from "react";
import styled from "styled-components";
import EventCard from "../EventCard/EventCard";
import { HiX, HiCheck } from "react-icons/hi";

const initialForm = {
    title: '',
    venue: '',
    description: '',
    toDate: '',
    fromDate: '',
    players: []
}

const Wrapper = styled.div`
  padding: 32px;
`;

const Row = styled.div`
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InputLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
`;

const InputText = styled.input`
  padding: 8px 8px;
  border-radius: 4px;
  border: 1px solid #848484;
  font-size: 11px;
  width: 100%;
`;

const ActionButtons = styled.div`
  display: flex;
`;

const CancelBtn = styled.button`
  flex: 1;
  border: 0;
  border-radius: 0 0 0 8px;
  background: #d26665;
  height: 35px;
  color: white;

  &:hover {
    background: #da7e7d;
  }
`;

const ConfirmBtn = styled.button`
  flex: 1;
  border: 0;
  border-radius: 0 0 8px 0;
  background: #198754;
  height: 35px;
  color: white;

  &:hover {
    background: #41966a;
  }
`;

const AddEventForm: FC<any> = ({ onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<any>({...initialForm});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }

    const submitHandler = () => {
        onSubmit({...formData});
    }

    const inputProps = {
        onChange: handleInputChange
    }

  return (
    <EventCard>
      <Wrapper>
        <Row>
          <InputLabel>Event Title</InputLabel>
          <InputText type="text" id="title" {...inputProps }/>
        </Row>
        <Row>
          <InputLabel>Venue</InputLabel>
          <InputText type="text" id="venue" {...inputProps }/>
        </Row>
        <Row>
          <InputLabel>Description</InputLabel>
          <InputText type="text" id="description" {...inputProps }/>
        </Row>
        <Row>
          <InputLabel>From Date</InputLabel>
          <InputText type="text" id="fromDate" {...inputProps }/>
        </Row>
        <Row>
          <InputLabel>To Date</InputLabel>
          <InputText type="text" id="toDate" {...inputProps }/>
        </Row>
      </Wrapper>
      <ActionButtons>
        <CancelBtn onClick={() => onCancel()}>
          <HiX />
        </CancelBtn>
        <ConfirmBtn onClick={submitHandler}>
          <HiCheck />
        </ConfirmBtn>
      </ActionButtons>
    </EventCard>
  );
};

export default AddEventForm;
