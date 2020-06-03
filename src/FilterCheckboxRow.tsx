import React, { FunctionComponent } from 'react';
import { ColorScheme } from './model/ColorScheme.model';
import styled from 'styled-components';

type StyledProps = {
  checked?: boolean;
  colorScheme: ColorScheme;
};

const CheckboxContainer = styled.div`
    display: inline-block;
    vertical-align: middle;
  `,
  Icon = styled.svg`
    fill: none;
    stroke: white;
    stroke-width: 2px;
  `,
  HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `,
  StyledCheckbox = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props: StyledProps) => (props.checked ? 'salmon' : 'papayawhip')}
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${(props: StyledProps) => (props.checked ? 'visible' : 'hidden')}
  }
`,
  CheckboxText = styled.span`
    margin-left: 8px;
  `;

type FilterCheckboxRowProps = {
  setChecked: (k1: number, k2: number) => void;
  checked: boolean;
  checkedMapKey: number;
  checkedMapInnerKey: number;
  displayName: string;
  colorScheme: ColorScheme;
};

const FilterCheckboxRow: FunctionComponent<FilterCheckboxRowProps> = ({
  setChecked,
  checked,
  checkedMapKey,
  checkedMapInnerKey,
  displayName,
  colorScheme,
}) => {
  const isChecked = checked !== undefined ? checked : false;

  return (
    <>
      <CheckboxContainer>
        <HiddenCheckbox checked={isChecked} onChange={() => setChecked(checkedMapKey, checkedMapInnerKey)} />
        <StyledCheckbox checked={isChecked} colorScheme={colorScheme}>
          <Icon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </Icon>
        </StyledCheckbox>
      </CheckboxContainer>
      <CheckboxText>{displayName.toString()}</CheckboxText>
    </>
  );
};

export default FilterCheckboxRow;
