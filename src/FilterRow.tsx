import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ColorScheme } from './model/ColorScheme.model';

type StyledProps = {
  checked?: boolean;
  colorScheme: ColorScheme;
}

const RootContainer = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${(props: StyledProps) => props.colorScheme.secondary};
  padding-top: 7.5px;
  color: ${(props: StyledProps) => props.colorScheme.secondaryTextColor};
`;

const RowLabel = styled.label`
  padding-left: 10.5px;
`;

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
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
`;

const StyledCheckbox = styled.div`
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
`;

const CheckboxText = styled.span`
  margin-left: 8px;
`;

type FilterRowProps = {
  setChecked: (k1: number, k2: number) => void;
  checked: boolean;
  checkedMapKey: number;
  checkedMapInnerKey: number;
  displayName: string;
  colorScheme: ColorScheme;
};

const FilterRow: FunctionComponent<FilterRowProps> = (props) => {

  const checked = (props.checked !== undefined) ? props.checked : false;

  return (
    <RootContainer colorScheme={props.colorScheme}>
      <RowLabel>
        <CheckboxContainer>
          <HiddenCheckbox checked={checked}
                          onChange={() => props.setChecked(props.checkedMapKey, props.checkedMapInnerKey)}/>
          <StyledCheckbox checked={checked}
                          colorScheme={props.colorScheme}>
            <Icon viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12"/>
            </Icon>
          </StyledCheckbox>
        </CheckboxContainer>
        <CheckboxText>{props.displayName.toString()}</CheckboxText>
      </RowLabel>
    </RootContainer>
  );
};

export default FilterRow;