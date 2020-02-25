import {transformAPIContent} from 'core/helpers/api';
import {transformAPIResponseValue} from 'helpers/api';

const testData = {
  boolean: true, string: 'String content', number: 1, date: '2020-11-01', time: '10:10:10', null: null, object: {
    key1: 'string', number: 1.1, boolean: false, array: ['value 1', 'value 2', 'value 3', 'value 4'],
  }, array: [{
    name: 'Peter', id: 1, birthday: '1997-11-01',
  }, {
    name: 'Yosuke', id: 2, birthday: '1998-12-01',
  }],
};

describe('api helpers', () => {
  it('transform response', () => {
    const transformedData = transformAPIContent(testData, undefined, transformAPIResponseValue);
    expect(transformedData.boolean).toEqual(testData.boolean);
    expect(transformedData.string).toEqual(testData.string);
    expect(transformedData.array[0]).toEqual(testData.array[0]);
  });
});
