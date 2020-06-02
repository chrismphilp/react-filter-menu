import React, { FunctionComponent, MouseEvent, useRef, useState } from 'react';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
  height: 75px;
  background-color: ${'rgba(255,255,255,0.76)'};
  border: 1px solid black;
`;

const LargeBox = styled.div`
  position: relative;
  top 15px;
  width: 100%;
  height: 7.5px;
  background-color: red;
`;

const RangeSlider = styled.div`
  position: absolute;
  width: 15px;
  height: 25px;
  bottom: 1px;
  background-color: green;
  cursor: pointer;
`;

const PercentageContainer = styled.div`
  position: relative;  
  width: 10px;
  left: 45.5%;
  padding-top: 18.5px;
`;

const PercentageText = styled.h6`
  position: relative;
  left: 50%;
`;

type FilterRangeSelectionRowProps = {
  setRange: (k1: number, min: number, max: number) => void;
  minValue: number;
  maxValue: number;
  displayName: string;
  colorScheme: ColorScheme;
};

const FilterRangeSelectionRow: FunctionComponent<FilterRangeSelectionRowProps> = ({
                                                                                    setRange,
                                                                                    displayName,
                                                                                    colorScheme,
                                                                                  }) => {
  const largeBoxRef = useRef<HTMLDivElement>();
  const [currentOffset, setCurrentOffset] = useState<number>(1.5);
  const [percentage, setPercentage] = useState<number>(1.5);

  const onSelect = (event: MouseEvent): void => {
    event.stopPropagation();
    console.error('onSelect');
    document.addEventListener('mousemove', onDrag as any);
    document.addEventListener('mouseup', onDeselect as any);
  };

  const onDeselect = (event: MouseEvent): void => {
    event.stopPropagation();
    console.error('onDeselect');
    document.removeEventListener('mousemove', onDrag as any);
    document.removeEventListener('mouseup', onDeselect as any);
    if (largeBoxRef.current) {
      const { pageX } = event;
      const refOffsetLeft = largeBoxRef.current.offsetLeft;
      const newOffset: number = pageX - refOffsetLeft;
      const sliderPercentage: number = calculatePercentage(newOffset);
      setSliderPosition(newOffset, sliderPercentage);
    }
  };

  const onDrag = (event: MouseEvent): void => {
    event.stopPropagation();
    if (largeBoxRef.current) {
      const { pageX } = event;
      const refOffsetLeft = largeBoxRef.current.offsetLeft;
      const newOffset: number = pageX - refOffsetLeft;
      const sliderPercentage: number = calculatePercentage(newOffset);
      setSliderPosition(newOffset, sliderPercentage);
    }
  };

  const setSliderPosition = (newOffset: number, sliderPercentage: number): void => {
    const roundedPercentage: number = Math.round(sliderPercentage);
    if (roundedPercentage >= 0 && roundedPercentage <= 100) {
      setPercentage(roundedPercentage);
      setCurrentOffset(newOffset - 7.5);
    }
  };

  const calculatePercentage = (newOffset: number): number => {
    if (largeBoxRef.current) return (newOffset / largeBoxRef.current.offsetWidth) * 100;
    else return 0;
  };

  return (
    <SliderContainer
      ref={largeBoxRef as any}
      onMouseDown={onSelect as any}
    >
      <LargeBox>
        <RangeSlider
          style={{ left: currentOffset }}
          onMouseDown={onSelect as any}
        />
      </LargeBox>
      <PercentageContainer>
        <PercentageText>
          {percentage}
        </PercentageText>
      </PercentageContainer>
    </SliderContainer>
  );
};

export default FilterRangeSelectionRow;
