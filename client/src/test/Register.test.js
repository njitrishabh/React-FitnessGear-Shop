import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Register from '../pages/register/Register';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ProductContext } from '../components/ProductContext';

jest.mock('../components/ProductContext', () => ({
    useProductContext: () => ({
        products: [],
        setProducts: jest.fn(),
    }),
}));


jest.mock('axios');

describe('Register component', () => {

    test('renders the registration page', async () => {

        render(
            <Router>
                <Register />;
            </Router>
        )
    });

    test('handle successful registration', async () => {
        axios.post.mockResolvedValueOnce({ data: { success: true } });
        render(
            <Router>
                <Register />;
            </Router>
        );

        const usernameInput = screen.getByLabelText(/Full Name/i);
        const emailInput = screen.getByLabelText(/Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const registerButton = screen.getByText(/Register/i);
        const errorSpy = jest.spyOn(console, 'error').mockImplementation();

        fireEvent.change(usernameInput, { target: { value: 'Johnn Doe' } });
        fireEvent.change(emailInput, { target: { value: 'johnn@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password1233' } });

        fireEvent.click(registerButton);

        expect(errorSpy).not.toHaveBeenCalled();
        errorSpy.mockRestore();

    });

});



