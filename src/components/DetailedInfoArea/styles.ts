import styled from "styled-components"

export const SDetailedInfoArea = styled.div`
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
`

export const DetailedInfoAreaHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid lightgrey;
  padding-bottom: 20px;
`

export const Coin = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`

export const CoinImg = styled.img`
  height: 50px;
`
export const Name = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 32px;
  font-weight: 600;
`

export const Price = styled.div`
  display: flex;
  align-items: center;
`

export const Symbol = styled.p`
  margin-right: 5px;
  font-family: "Lato", sans-serif;
  font-size: 38px;
  font-weight: 300;
`

export const Value = styled.div`
  margin-right: 10px;
  font-family: Lato, sans-serif;
  font-size: 38px;
  font-weight: 300;
`

export const Delta = styled.div`
  padding: 5px;
  border-radius: 5px;
  font-family: Lato, sans-serif;
  font-size: 12px;
  font-weight: 300;
  color: white;
  background-color: ${(props) => (props.theme.isPositive ? "green" : "red")};
`

export const DetailedInfoAreaBody = styled.table`
  width: 100%;
  margin-top: 20px;
`

export const DetailedTd = styled.tr`
  height: 50px;
  text-align: start;
  padding: 20px 0;
`

export const DetailedHead = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: rgb(99, 115, 129);
`
export const DetailedFoot = styled.div`
  margin-top: 15px;
  font-family: Lato, sans-serif;
  font-size: 21px;
  font-weight: 500;
  text-transform: uppercase;
`
