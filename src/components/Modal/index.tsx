import React, { FC } from "react";
import styled from "styled-components";
import { HiArrowRight } from "react-icons/hi";
import Loader from "react-spinners/MoonLoader";

type ModalProps = {
  isLoading?: boolean;
  onClose: () => {} | void;
  onConfirm: () => {} | void;
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00000061;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  min-width: 100px;
  background: white;
  padding: 50px;
  border-radius: 50px;
  box-shadow: 0 0 20px 2px #0000004f;
`;

const Title = styled.div`
  font-size: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 32px 0 0 0;
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

const Modal: FC<ModalProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <Wrapper>
      <Content>
        <Title>Are you sure you want to delete this event?</Title>
        <ActionButtons>
          <CancelBtn disabled={isLoading} onClick={onClose}>
            Cancel
          </CancelBtn>
          <ConfirmBtn disabled={isLoading} onClick={onConfirm}>
            {isLoading && <Loader size={12} color={"white"} />}DELETE EVENT
            <HiArrowRight size={16} />
          </ConfirmBtn>
        </ActionButtons>
      </Content>
    </Wrapper>
  );
};

export default Modal;
