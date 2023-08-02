import React, { FC, useState } from "react";
import styled from "styled-components";
import EventCard from "../EventCard/EventCard";
import moment from "moment";
import { HiArrowRight } from "react-icons/hi";
import Loader from "react-spinners/MoonLoader";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { BarLoader } from "react-spinners";

const initialForm = {
  title: "",
  venue: "",
  description: "",
  toDate: "",
  fromDate: "",
  imageUrl: "",
  players: [],
};

const Wrapper = styled.div`
  padding: 32px 45px 0 45px;
`;

const Row = styled.div`
  flex: 1;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MultiRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const InputLabel = styled.div`
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 4px;
`;

const InputText = styled.input`
  padding: 14px;
  border-radius: 4px;
  border: 1px solid #848484;
  font-size: 14px;
  min-width: 90%;
  width: 100%;
  box-sizing: border-box;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 45px 32px 45px;
`;

const CancelBtn = styled.button`
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
    font-weight: 500
`;

const ConfirmBtn = styled.button`
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

const AddEventForm: FC<any> = ({ onSubmit, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState<any>({ ...initialForm });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitHandler = () => {
    onSubmit({
      ...formData,
      fromDate: moment(formData.fromDate).format("MMMM DD, YYYY"),
      toDate: moment(formData.toDate).format("MMMM DD, YYYY"),
    });
  };

  const inputProps = {
    onChange: handleInputChange,
    disabled: isSubmitting,
  };

  const dateChangeHandler = (date, id: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: date,
    }));
  };

  return (
    <EventCard>
      <Wrapper>
        <Row>
          <InputLabel>Event Title</InputLabel>
          <InputText type="text" id="title" {...inputProps} />
        </Row>
        <Row>
          <InputLabel>Venue</InputLabel>
          <InputText type="text" id="venue" {...inputProps} />
        </Row>
        <Row>
          <InputLabel>Description</InputLabel>
          <InputText type="text" id="description" {...inputProps} />
        </Row>
        <MultiRow>
          <Row>
            <InputLabel>From Date</InputLabel>
            <DatePicker
              selected={formData.fromDate}
              onChange={(date) => dateChangeHandler(date, "fromDate")}
              customInput={<InputText disabled={isSubmitting} />}
            />
          </Row>
          <Row>
            <InputLabel>To Date (Optional)</InputLabel>
            <DatePicker
              selected={formData.toDate}
              onChange={(date) => dateChangeHandler(date, "toDate")}
              customInput={<InputText disabled={isSubmitting} />}
            />
          </Row>
        </MultiRow>
      </Wrapper>
      <ActionButtons>
        <CancelBtn disabled={isSubmitting} onClick={() => onCancel()}>
          Cancel
        </CancelBtn>
        <ConfirmBtn disabled={isSubmitting} onClick={submitHandler}>
          {isSubmitting && <Loader size={12} color={"white"} />}
          Add New Event
          <HiArrowRight size={16} />
        </ConfirmBtn>
      </ActionButtons>
    </EventCard>
  );
};

export default AddEventForm;
