import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { SandwichBuilder } from './SandwichBuilder';
import SandwichControls from '../../components/Sandwich/SandwichControls/SandwichControls';

configure({adapter: new Adapter});

describe(<SandwichBuilder />, () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SandwichBuilder onInitialIngredients={() => {}}/>);
  });
  it('show render <BuildCOntrols /> recieving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(SandwichControls)).toHaveLength(1);
  });
});
