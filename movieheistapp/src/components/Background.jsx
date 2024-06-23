import React from "react";
import loginbg from "../assets/loginbg.jpg";
import styled from "styled-components";

export default function Background() {
  return (
    <ContainerMain>
      <Img src={loginbg} alt="Background Image" />
    </ContainerMain>
  );
}

// Using vh and vw of viewport to make it responsive
const ContainerMain = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;
