import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Button from './Button';

describe('Button', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('button');
    expect(tree).toHaveStyleRule('border', 'none');
    expect(tree).toHaveStyleRule('font-weight', 'bold');
  });
});

import Cell from './Cell';

describe('Cell', () => {
  test('should have the proper styles when alive', () => {
    const tree = renderer.create(<Cell alive />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('div');
    expect(tree).toHaveStyleRule('background', 'black');
    expect(tree).toHaveStyleRule('color', 'white');
  });
  test('should have the proper styles when dead', () => {
    const tree = renderer.create(<Cell />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('background', 'white');
    expect(tree).toHaveStyleRule('color', 'black');
  });
});

import Column from './Column';

describe('Column', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Column />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('div');
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-direction', 'column');
    expect(tree).toHaveStyleRule('justify-content', 'flex-start');
  });
});

import Grid from './Grid';

describe('Grid', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Grid />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('div');
    expect(tree).toHaveStyleRule('display', 'grid');
    expect(tree).toHaveStyleRule('grid-template-rows', 'repeat(25,8px)');
    expect(tree).toHaveStyleRule('grid-template-columns', 'repeat(25,8px)');
  });

  test('should have the right number of rows, columns and size', () => {
    const tree = renderer.create(<Grid rows={10} cols={99} size="20px" />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('div');
    expect(tree).toHaveStyleRule('grid-template-rows', 'repeat(10,20px)');
    expect(tree).toHaveStyleRule('grid-template-columns', 'repeat(99,20px)');
  });
});

import Header1 from './Header1';

describe('Header1', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Header1 />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('h1');
    expect(tree).toHaveStyleRule('font-weight', 'bold');
  });
});

import Row from './Row';

describe('Row', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Row />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('div');
    expect(tree).toHaveStyleRule('display', 'flex');
    expect(tree).toHaveStyleRule('flex-direction', 'row');
    expect(tree).toHaveStyleRule('justify-content', 'left');
  });
});

import Text from './Text';

describe('Text', () => {
  test('should have the proper styles', () => {
    const tree = renderer.create(<Text />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree.type).toBe('p');
  });
});
