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
  padding: 0.5em;
  border-radius: 6px 0px 0px 6px;
  box-shadow: none;
  border: 1.5px solid rgb(204, 204, 204);
  outline: none;
  font-size: 1.3em;
  height: 100px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus,
  &:hover {
    border: 2.5px solid #2684ff;
  }
`

export const ReactSelectElement = styled(Select)`
  .react-select__control {
    width: 200px;
    height: 100px;

    border-radius: 0px 6px 6px 0px;
  }
`
