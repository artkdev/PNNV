import styled from "styled-components"

export const SInputArea = styled.div`
  width: 100%;
  max-width: 900px;
  min-width: 750px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: Lato, sans-serif;
  font-size: 48px;
  font-weight: 300;
  margin: 0 auto;
  .dataInput {
    width: 100%;
    min-width: 150px;
    height: 75px;
    padding: 0px 14px;
    border-radius: 6px 0px 0px 6px;
    box-shadow: none;
    border: 1.5px solid rgb(204, 204, 204);
    font-size: 48px;
    font-weight: 300;
    text-align: right;
  }
  .coin {
    width: 100%;
    min-width: 150px;
    height: 75px;
    padding: 0px 14px;
    border-radius: 0px 6px 6px 0px;

    box-shadow: none;
    background-color: rgb(244, 246, 248);
    border: 1.5px solid rgb(204, 204, 204);
    font-size: 48px;
    font-weight: 300;
    text-align: center;
  }
  .currency {
    width: 100%;
    min-width: 150px;
    height: 75px;
    padding: 0px 14px;
    border-radius: 0px 6px 6px 0px;

    box-shadow: none;
    background-color: rgb(244, 246, 248);
    border: 1.5px solid rgb(204, 204, 204);
    font-size: 48px;
    font-weight: 300;
    text-align: center;
  }
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`
