import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
//import { expect } from 'chai'
Enzyme.configure({ adapter: new Adapter() });

import App from './App'

describe('AppBar.js', function() {
    let appNode

    function renderer(props) {

        appNode = mount(
            <AppBar/>
        )

        return appNode
    }
    it('should render without crashing', function() {

    })
})