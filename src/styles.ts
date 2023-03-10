import styled from "styled-components"

export const Container = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`
