import React, { useMemo } from 'react';
import { GridContainer, GridItem } from './styles';

interface GridProps {
  skyInfo: string[][];
  numberOfColumns: number;
}

const Grid: React.FC<GridProps> = ({ skyInfo, numberOfColumns }) => {
  console.log('fucking sky info',skyInfo)
  return (
    <GridContainer numberOfColumns={numberOfColumns}>
      {skyInfo.map(infoRow => {
        return infoRow.map(info=>{ return <GridItem>{info}</GridItem>})
      })}
    </GridContainer>
  );
};

export default Grid;
