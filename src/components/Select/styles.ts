import styled from "styled-components"
import Select from "react-select"

export const ReactSelectElement = styled(Select)`
  .react-select__control {
    width: 200px;
    height: 100px;

    border-radius: 0px 6px 6px 0px;
    flex-direction: row-reverse;
  }

  .react-select__clear-indicator {
    position: absolute;
    right: 0;
  }

  .react-select__value-container {
    justify-content: flex-start;
  }
`
