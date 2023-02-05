import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Wrap>
        <Header />
        {children}
      </Wrap>
    </>
  );
};

export default Layout;

const Wrap = styled.div`
  border-radius: 20px;
  box-shadow: 5px 10px 40px #aaaaaa;
  width: 100%;
  height: 90vh;
  max-width: 400px;
  margin: auto;
  margin-top: 30px;
`;
