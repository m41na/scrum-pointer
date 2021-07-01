import React from 'react';
import ReactDOM from 'react-dom';
import {  render } from '@testing-library/react';
import { AppProvider } from '../../state/AppContext'
import CardBoard from '../../container/CardBoard.container';

describe('testing CardBoard.container component', () => {

    const props = {
        history: {
            push: jest.fn()
        }
    }

    const wrapper = (component) => <AppProvider>{component}</AppProvider>

    test('Should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
        wrapper(<CardBoard {...props} />), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    test('Should render expected default text', () => {
        const { getByTitle } = render(
            wrapper(<CardBoard {...props} />));
        expect(getByTitle('submit')).toBeInTheDocument();
      });
});
