import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0.8em;
  border: 1px solid;
  align-items: center;

  ul {
    padding-top: 0.8em;
    list-style-type: none;

    li {
      padding: 0.8em;
    }
  }
`;

export const Title = styled.h1`
  color: #ffbf47;
  font-weight: 700;
`;

export const ImageContainer = styled.div`
  img {
    background-color: #fff;
  }
`;
