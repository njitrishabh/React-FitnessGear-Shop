import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Landing from '../pages/landing/Landing';

jest.mock('react-router-dom', () => {
    const nav = jest.fn();
    return {
        ...jest.requireActual('react-router-dom'),
        mockedNavigation: nav,
        useLocation: jest.fn(() => ({ pathname: '/example' })),
        useNavigate: jest.fn(() => nav),
    };
});

const Router = require('react-router-dom');

describe('Landing Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('clicking the button triggers navigation to "/search"', async () => {

        render(
            <Router.MemoryRouter initialEntries={['/']}>
                <Router.Routes>
                    <Router.Route path="/" element={<Landing />} />
                </Router.Routes>
            </Router.MemoryRouter>
        );

        const button = await screen.findByText('Search Products');
        await fireEvent.click(button);
        expect(Router.mockedNavigation).toHaveBeenCalledWith('/search');
    });
});
