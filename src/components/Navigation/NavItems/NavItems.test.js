// shallow renders components. but not deeply. it knows if the components are nested but doens't render everything.
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems';
import NavItem from './NavItem/Navitem';

import React from 'react';
// a test uses JEST by defualt and JEST gives us a few methods to define the test

// describe takes two arguments:
// the first is a description of the test bundle the file holds. this should be something that identifiyes which kind of test we're running.
// the second is your testing function.  it's a normal JS function. in the function you going to describe..write your actual tests.
// you need to write it() which also takes two arguments:
// the first one is a descrtiption which will appear in the console.
// the second is the testing logic

configure({adapter: new Adapter});

describe('<NavItems />', () => {
  // beforeEach is a fucntion that will automatically be executed before each of your tests.
  // this takes a funciton as an argument that will get executed before each test.
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });


  it('should render two <NavItems /> itens if not authenticated.', () => {
    // expect it the method where we define the thing we want to check.
    // the find method looks inside the wrapper to see if it contains a certain content.
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it('should render three <NavItems /> itens if authenticated.', () => {
    // const wrapper = shallow(<NavItems isAuthenticated />);
    // expect it the method where we define the thing we want to check.
    // the find method looks inside the wrapper to see if it contains a certain content.
    // setProps method we can execute on the wrapper.  so on anything which stores rendered react components. we pass a JS object with key/value pairs.

    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it('should render three <NavItems /> itens if authenticated.', () => {
    wrapper.setProps({isAuthenticated: true});
    expect(wrapper.contains(<NavItem link='/logout'>Logout</NavItem>)).toEqual(true);
  });


});

//
