import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const InputField = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:checked {
     display: block;
  }
`;

const NewCheckbox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;

  ${Label}:hover & {
    background-color: #ccc;
  }
  
  ${InputField}:checked & {
    background-color: #2196F3;
  }  
  
  ${InputField}:checked + :after {
     display: block;
  }
  
  &:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

type CheckboxIconProps = {
  setChecked: () => void;
};

const CheckboxIcon: FunctionComponent<CheckboxIconProps> = (props) => {
  return (
    <Label>Test
      <InputField onChange={() => props.setChecked()}/>
      <NewCheckbox/>
    </Label>
  );
};

export default CheckboxIcon;