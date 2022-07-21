import styled from "styled-components";

type ArrowWrapperPropsType = {
    turnOn: number
}

export const ArrowWrapper = styled.div<ArrowWrapperPropsType>`
  display: flex;
  margin: 0 auto;
  width: 35px;

  svg {
    padding: 3px;
    transform: rotate(${({turnOn}) => turnOn}deg) translate(0%, 0%);
  }
`;