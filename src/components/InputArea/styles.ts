import styled from "styled-components"
import Select from "react-select"

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
`

export const StyledInput = styled.input`
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
  :-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const StyledSelect = styled.select`
  width: 150px;
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
`

export const ReactSelectElement = styled(Select)`
  .react-select__value-container {
    width: 200px;
  }
`
