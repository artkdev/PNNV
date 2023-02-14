import styled from "styled-components"

export const SHome = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 200px 20px 200px 20px;
  .selectArea {
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
    .datainput {
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
  }
  .infoArea {
    width: 100%;
    max-width: 900px;
    min-width: 750px;
    margin: 0 auto;
    background-color: rgb(255, 255, 255);
    color: rgb(33, 43, 54);
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    border-radius: 4px;
    box-shadow: none;
    padding: 16px;
    border: 1px solid rgb(196, 205, 213);
    .heading {
      display: flex;
      justify-content: space-between;
      border-bottom: 2px solid lightgrey;
      padding-bottom: 20px;
      .coin {
        display: flex;
        gap: 30px;
        align-items: center;
        img {
          height: 50px;
        }
        .name {
          font-family: Lato, sans-serif;
          font-size: 32px;
          font-weight: 600;
        }
      }
      .price {
        display: flex;

        align-items: center;
        .symbol {
          margin-right: 5px;
          font-family: Lato, sans-serif;
          font-size: 38px;
          font-weight: 300;
        }
        .value {
          margin-right: 10px;
          font-family: Lato, sans-serif;
          font-size: 38px;
          font-weight: 300;
        }
        .delta {
          padding: 5px;
          border-radius: 5px;
          font-family: Lato, sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: white;
        }
        .positive {
          background-color: green;
        }
        .negative {
          background-color: red;
        }
      }
    }
    .infoBody {
      width: 100%;
      margin-top: 20px;
      tr {
        td {
          height: 50px;
          text-align: start;
          padding: 20px 0;

          .head {
            font-family: Lato, sans-serif;
            font-size: 14px;
            font-weight: 600;
            color: rgb(99, 115, 129);
            .delta {
              padding: 5px;
              border-radius: 5px;
              font-family: Lato, sans-serif;
              font-size: 12px;
              font-weight: 600;
            }
            .positive {
              color: green;
            }
            .negative {
              color: red;
            }
          }
          .bot {
            margin-top: 15px;
            font-family: Lato, sans-serif;
            font-size: 21px;
            font-weight: 500;
            text-transform: uppercase;
          }
        }
      }
    }
  }
`
