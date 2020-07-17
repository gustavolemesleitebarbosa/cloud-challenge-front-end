import styled, {css} from 'styled-components';


interface ItemProps {
  numberOfColumns: number;
}

export const GridContainer = styled.div<ItemProps>`
  display: grid;
  grid-template-columns: repeat(${props => props.numberOfColumns}, 1fr);
  grid-gap: 10px;
  margin-bottom:30px;
  margin-right: 40px;
`;

export const GridItem = styled.div`
  display: flex;
  background-color: #444;
  min-width: 30px;
  color: #fff;
  justify-content: center;
  border-radius: 5px;
  padding: 2px;
  font-size: 150%;
`;
