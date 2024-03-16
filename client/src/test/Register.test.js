import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Register from '../pages/register/Register';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';


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

        fireEvent.change(usernameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(registerButton);

        await waitFor(() => expect(screen.getByText(/Registration successful/i)).toBeInTheDocument());

    });

});



