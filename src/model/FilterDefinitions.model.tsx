import { ReactElement } from 'react';

export interface IFilterDefinition {
  displayName: string;
  objectKey: string;
  checkedByDefault?: boolean;
  checkboxIcon?: ReactElement<IFilterIcon> | null;
  filterValues?: any[];
}

export interface IFilterIcon {
  checked: boolean;
  disabled: boolean;
}