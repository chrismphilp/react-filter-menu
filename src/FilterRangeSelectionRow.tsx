import React, { FunctionComponent, MouseEvent, useRef, useState } from 'react';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

const SliderContainer = styled.div`
    width: 100%;
    background-color: ${'rgba(255,255,255,0.76)'};
    border: 1px solid black;
  `,
  LargeBox = styled.div`
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
  `,
  RangeFiller = styled.div`
    position: absolute;
    top: 3.75px;
    background-color: ${(props: SliderProps) => props.color};
    box-shadow: 0 0 1px 3.5px ${'#ffd400'};
  `,
  PercentageContainer = styled.div`
    position: relative;
    width: 10px;
    left: 45.5%;
    padding-top: 18.5px;
  `,
  PercentageText = styled.h6`
    position: relative;
    width: 75px;
    left: 50%;
  `;

type FilterRangeSelectionRowProps = {
  minValue: number;
  maxValue: number;
  interval?: number;
  displayName: string;
  colorScheme: ColorScheme;
};

const FilterRangeSelectionRow: FunctionComponent<FilterRangeSelectionRowProps> = ({
                                                                                    minValue = 0,
                                                                                    maxValue = 100,
                                                                                    interval = 5,
                                                                                    displayName,
                                                                                    colorScheme,
                                                                                  }) => {
  const largeBoxRef = useRef<HTMLDivElement>();
  const lowerOffSetSliderRef = useRef<HTMLDivElement>();
  const upperOffSetSliderRef = useRef<HTMLDivElement>(),
    [selectedSlider, setSelectedSlider] = useState<'left' | 'right'>('right');
  const selectedSliderRef = useRef(selectedSlider),
    [lowerOffset, setLowerOffset] = useState<number>(0),
    [upperOffset, setUpperOffset] = useState<number>(25),
    [lowerPercentage, setLowerPercentage] = useState<number>(0),
    [upperPercentage, setUpperPercentage] = useState<number>(25);

  const onSelect = (event: MouseEvent): void => {
    event.stopPropagation();
    console.error('onSelect');
    document.addEventListener('mousemove', onDrag as any);
    document.addEventListener('mouseup', onDeselect as any);
    if (largeBoxRef.current) {
      const { pageX } = event,
        refOffsetLeft = largeBoxRef.current.offsetLeft,
        refOffsetWidth = largeBoxRef.current.offsetWidth,
        newOffset: number = pageX - refOffsetLeft,
        newOffsets: number = calculateOffsetInterval(pageX, refOffsetWidth, refOffsetLeft),
        closestSlider: 'left' | 'right' = calculateClosestSlider(newOffsets);
      selectedSliderRef.current = closestSlider;
      setSelectedSlider(closestSlider);
    }
  };

  const onDrag = (event: MouseEvent): void => {
    event.stopPropagation();
    if (largeBoxRef.current) {
      const { pageX } = event,
        refOffsetLeft = largeBoxRef.current.offsetLeft,
        refOffsetWidth = largeBoxRef.current.offsetWidth,
        newOffset: number = pageX - refOffsetLeft,
        newOffsets: number = calculateOffsetInterval(pageX, refOffsetWidth, refOffsetLeft),
        sliderPercentage: number = calculatePercentage(newOffsets);
      setSliderPosition(newOffsets, sliderPercentage, selectedSliderRef.current);
    }
  };

  const calculateOffsetInterval = (mouseXPos: number, offsetWidth: number, offsetLeft: number): number => {
    const widthOfElement: number = Math.abs(offsetWidth - offsetLeft);
    const offsetIntervals: number = (100 / interval) + 1;
    const newOffset: number = Math.round((mouseXPos - offsetLeft) / offsetIntervals) * offsetIntervals;
    console.error({
      mouseX: mouseXPos,
      // offsetWidth: offsetWidth,
      // offsetLeft: offsetLeft,
      widthOfElement: widthOfElement,
      offsetIntervals: offsetIntervals,
      newOffset: newOffset
    });
    return newOffset;
  };

  const onDeselect = (event: MouseEvent): void => {
    event.stopPropagation();
    document.removeEventListener('mousemove', onDrag as any);
    document.removeEventListener('mouseup', onDeselect as any);
    console.error('onDeselect');
    if (largeBoxRef.current) {
      const { pageX } = event,
        refOffsetLeft: number = largeBoxRef.current.offsetLeft,
        newOffset: number = pageX - refOffsetLeft,
        sliderPercentage: number = calculatePercentage(newOffset);
      setSliderPosition(newOffset, sliderPercentage, selectedSliderRef.current);
    }
  };

  const setSliderPosition = (newOffset: number, sliderPercentage: number, slider: 'left' | 'right'): void => {
    const offsetValue: number = newOffset - 7.5;
    if (sliderPercentage >= 0 && sliderPercentage <= 100) {
      // Left slider is being moved
      if (slider === 'left') {
        setLowerPercentage(sliderPercentage);
        setLowerOffset(offsetValue);
        // Left slider should move with right
        if (newOffset > upperOffset) {
          setUpperPercentage(sliderPercentage);
          setUpperOffset(offsetValue);
        }
      }
      // Right slider is being moved
      else {
        setUpperPercentage(sliderPercentage);
        setUpperOffset(offsetValue);
        // Right slider should move with left
        if (newOffset < lowerOffset) {
          setLowerPercentage(sliderPercentage);
          setLowerOffset(offsetValue);
        }
      }
    }
  };

  const calculateClosestSlider = (offset: number): 'left' | 'right' => {
    if (lowerOffSetSliderRef.current && upperOffSetSliderRef.current) {
      const diffLeft = Math.abs(offset - lowerOffSetSliderRef.current.offsetLeft),
        diffRight = Math.abs(offset - upperOffSetSliderRef.current.offsetLeft);
      return diffLeft < diffRight ? 'left' : 'right';
    }
    return 'right';
  };

  const calculatePercentage = (newOffset: number): number => {
    if (largeBoxRef.current) {
      const percentage: number = (newOffset / largeBoxRef.current.offsetWidth) * 100;
      const closestInterval: number = Math.round(percentage / interval) * interval;
      console.error({
        interval: interval,
        percentage: percentage,
        closestInterval: closestInterval
      });
      return closestInterval;
    } else return 0;
  };

  return (
    <SliderContainer ref={largeBoxRef as any} onMouseDown={onSelect as any}>
      <LargeBox>
        <RangeSlider
          ref={lowerOffSetSliderRef as any}
          color={colorScheme.secondary}
          style={{ left: lowerOffset, border: (selectedSlider === 'left') ? '2.5px solid green' : 0 }}
          onMouseDown={onSelect as any}
        />
        <RangeFiller
          color={colorScheme.primaryTextColor}
          style={{
            width: upperOffset - lowerOffset - 17.5,
            left: lowerOffset + 17.5,
            right: upperOffset,
          }}
        />
        <RangeSlider
          ref={upperOffSetSliderRef as any}
          color={colorScheme.tertiary}
          style={{ left: upperOffset, border: (selectedSlider === 'right') ? '2.5px solid green' : 0 }}
          onMouseDown={onSelect as any}
        />
      </LargeBox>
      <PercentageContainer>
        <PercentageText>{lowerPercentage + ' - ' + upperPercentage}</PercentageText>
      </PercentageContainer>
    </SliderContainer>
  );
};

export default FilterRangeSelectionRow;
