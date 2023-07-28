import React, { FC, useState } from "react";
import styled from "styled-components";
import EventCard from "../EventCard/EventCard";
import moment from "moment";
import { HiX, HiCheck } from "react-icons/hi";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { BarLoader } from "react-spinners";

const initialForm = {
    title: '',
    venue: '',
    description: '',
    toDate: '',
    fromDate: '',
    imageUrl: '',
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
  margin-bottom: 4px;
`;

const InputText = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #848484;
  font-size: 11px;
  min-width: 90%;
`;

const ActionButtons = styled.div`
  display: flex;
`;

const CancelBtn = styled.button`
opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  flex: 1;
  border: 0;
  border-radius: 0 0 0 8px;
  background: #d26665;
  height: 45px;
  color: white;

  font-size: 14px;
  &:hover {
    background: #da7e7d;
  }
`;

const ConfirmBtn = styled.button`
opacity: ${({ disabled }) => (disabled ? "0.4" : "1")};
  flex: 1;
  border: 0;
  border-radius: 0 0 8px 0;
  background: #198754;
  height: 45px;
  color: white;
  font-size: 14px;

  &:hover {
    background: #41966a;
  }
`;

const AddEventForm: FC<any> = ({ onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState<any>({...initialForm});

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [id]: value
        }));
    }

    const submitHandler = () => {
        onSubmit({...formData, toDate: moment(formData.toDate).format("MMMM DD, YYYY")});
    }

    const inputProps = {
        onChange: handleInputChange,
        disabled: isSubmitting,
    }

    const dateChangeHandler = (date, id: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [id]: date,
      }))
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
          {/* <InputText type="text" id="fromDate" {...inputProps }/> */}
          <DatePicker selected={formData.fromDate} onChange={(date) => dateChangeHandler(date, 'fromDate')}  customInput={<InputText disabled={isSubmitting} />}/>
        </Row>
        <Row>
          <InputLabel>To Date</InputLabel>
          <DatePicker selected={formData.toDate} onChange={(date) => dateChangeHandler(date, 'toDate')} customInput={<InputText disabled={isSubmitting} />}/>
        </Row>
      </Wrapper>
      {isSubmitting && <BarLoader width={"100%"} height={6} color={"#252e28"} />}
      <ActionButtons>
        <CancelBtn disabled={isSubmitting} onClick={() => onCancel()}>
          <HiX size={16}/>
        </CancelBtn>
        <ConfirmBtn disabled={isSubmitting} onClick={submitHandler}>
          <HiCheck size={16}/>
        </ConfirmBtn>
      </ActionButtons>
    </EventCard>
  );
};

export default AddEventForm;
