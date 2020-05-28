import { ReactElement } from 'react';

export type IFilterDefinition<T> = {
  displayName: string;
  objectKey: string;
  checkedByDefault?: boolean;
  checkboxIcon?: ReactElement<IFilterIcon> | null;
  filterValues?: T[];
  type: string | number | Date;
};

export type IFilterIcon = {
  checked: boolean;
  disabled: boolean;
};
