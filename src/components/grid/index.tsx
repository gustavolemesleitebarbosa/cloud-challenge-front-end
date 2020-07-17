import React, { useMemo } from 'react';
import { GridContainer, GridItem } from './styles';

interface GridProps {
  skyInfo: string[][];
  numberOfColumns: number;
}

const Grid: React.FC<GridProps> = ({ skyInfo, numberOfColumns }) => {
  return (
    <GridContainer numberOfColumns={numberOfColumns}>
      {skyInfo.map(infoRow => {
        return infoRow.map(info=>{ return <GridItem>{info}</GridItem>})
      })}
    </GridContainer>
  );
};

export default Grid;
