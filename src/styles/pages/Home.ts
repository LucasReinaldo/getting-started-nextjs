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
  padding: .8em;
  border: 1px solid;
  align-items: center;

  ul {
    padding-top: .8em;
    list-style-type: none;
    
    li{
      padding: .8em;
    }
  }
`;

export const Title = styled.h1`
  color: #FFBF47;
  font-weight: 700;
`;
