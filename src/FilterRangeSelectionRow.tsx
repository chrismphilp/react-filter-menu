import React, { FunctionComponent, MouseEvent, useRef, useState } from 'react';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
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

type SliderProps = {
  color: string;
};

const RangeSlider = styled.div`
  position: absolute;
  width: 15px;
  height: 25px;
  top: -8.5px;
  background-color: ${(props: SliderProps) => props.color};
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
  const [lowerOffset, setLowerOffset] = useState<number>(0);
  const [upperOffset, setUpperOffset] = useState<number>(0);
  const [lowerPercentage, setLowerPercentage] = useState<number>(0);
  const [upperPercentage, setUpperPercentage] = useState<number>(0);

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
      const closestSlider: 'left' | 'right' = calculateClosestSlider(newOffset);
      const sliderPercentage: number = calculatePercentage(newOffset);
      setSliderPosition(newOffset, sliderPercentage, closestSlider);
    }
  };

  const onDrag = (event: MouseEvent): void => {
    event.stopPropagation();
    if (largeBoxRef.current) {
      const { pageX } = event;
      const refOffsetLeft = largeBoxRef.current.offsetLeft;
      const newOffset: number = pageX - refOffsetLeft;
      const sliderPercentage: number = calculatePercentage(newOffset);
      setSliderPosition(newOffset, sliderPercentage, 'left');
    }
  };

  const setSliderPosition = (newOffset: number, sliderPercentage: number, slider: 'left' | 'right'): void => {
    const roundedPercentage: number = Math.round(sliderPercentage);
    if (roundedPercentage >= 0 && roundedPercentage <= 100) {
      setLowerPercentage(roundedPercentage);
      slider === 'left' ? setLowerOffset(newOffset - 7.5) : setUpperOffset(newOffset - 7.5);
    }
  };

  const calculateClosestSlider = (offSet: number): 'left' | 'right' => {
    const diffLeft = Math.abs(offSet - lowerOffset);
    const diffRight = Math.abs(offSet - upperOffset);
    console.error(offSet, lowerOffset, upperOffset, diffLeft, diffRight);
    return diffLeft < diffRight ? 'left' : 'right';
  };

  const calculatePercentage = (newOffset: number): number => {
    if (largeBoxRef.current) return (newOffset / largeBoxRef.current.offsetWidth) * 100;
    else return 0;
  };

  return (
    <SliderContainer ref={largeBoxRef as any} onMouseDown={onSelect as any}>
      <LargeBox>
        <RangeSlider color={colorScheme.secondary} style={{ left: lowerOffset }} onMouseDown={onSelect as any} />
        <RangeSlider color={colorScheme.tertiary} style={{ left: upperOffset }} onMouseDown={onSelect as any} />
      </LargeBox>
      <PercentageContainer>
        <PercentageText>{lowerPercentage}</PercentageText>
      </PercentageContainer>
    </SliderContainer>
  );
};

export default FilterRangeSelectionRow;
