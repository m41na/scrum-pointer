import React from 'react';
import ReactDOM from 'react-dom';
import {  render } from '@testing-library/react';
import { AppProvider } from '../../state/AppContext'
import Players from '../../container/Players.container';

describe('testing Players.container component', () => {

    const props = {
        history: {
            push: jest.fn()
        }
    }

    const wrapper = (component) => <AppProvider>{component}</AppProvider>

    test('Should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        wrapper(<Players {...props} />), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Should render expected default text', () => {
        const { getByTitle } = render(
            wrapper(<Players {...props} />));
        expect(getByTitle('submit')).toBeInTheDocument();
      });
});
