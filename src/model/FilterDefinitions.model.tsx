import { ReactElement } from 'react';

export type IFilterDefinition = {
  displayName: string;
  objectKey: string;
  checkedByDefault?: boolean;
  checkboxIcon?: ReactElement<IFilterIcon> | null;
  filterValues?: any[];
}

export type IFilterIcon = {
  checked: boolean;
  disabled: boolean;
}
