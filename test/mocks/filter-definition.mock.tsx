import { IFilterDefinition } from '../../src/model/FilterDefinitions.model';

const filterDefinitionMock: IFilterDefinition<any>[] = [
  {
    displayName: 'Name',
    objectKey: 'name',
    type: 'string'
  },
  {
    displayName: 'Age',
    objectKey: 'age',
    type: 'number'
  }
];

export default filterDefinitionMock;