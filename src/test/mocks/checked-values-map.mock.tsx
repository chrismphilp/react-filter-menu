const unselectedCheckedValuesMapMock: Map<number, Map<number, boolean>> = new Map([
  [0, new Map<number, boolean>([
    [0, false],
    [1, false]
  ])],
  [1, new Map<number, boolean>([
    [0, false],
    [1, false]
  ])]
]);

const selectedCheckedValuesMapMock: Map<number, Map<number, boolean>> = new Map([
  [0, new Map<number, boolean>([
    [0, true],
    [1, false]
  ])],
  [1, new Map<number, boolean>([
    [0, false],
    [1, true]
  ])]
]);

export {
  unselectedCheckedValuesMapMock,
  selectedCheckedValuesMapMock
}
