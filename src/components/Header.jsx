import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <>
      <Wrap>🗒 To Do List</Wrap>
    </>
  );
};

export default Header;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  font-size: 40px;
  font-weight: 700;
  border-radius: 20px;
`;
