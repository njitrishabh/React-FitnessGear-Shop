import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { http } from 'msw';
import { setupServer } from 'msw/node';
import Home from '../pages/home/Home';


const server = setupServer(
    http.get('http://localhost:8080/product-names', () => {
        return new Response(JSON.stringify([{ label: "Product1" }, { label: "Product2" }]), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }),
    http.get('http://localhost:8080/search-products', () => {
        return new Response(JSON.stringify([]), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('Home Component', () => {

    test('renders Home component', async () => {
        render(<Home />);
        const heading = await screen.getByText(/Product Search/i);
        expect(heading).toBeInTheDocument(); // Verify that the component renders correctly
    });

    test('renders product name typeahead with options', async () => {
        render(<Home />);
        await act(async () => {
            await screen.getByText(/Product Search/i);
        });

        const input = screen.getByTitle('Product name:', { placeholder: /search for a product/i });
        expect(screen.getByTitle('Product name:', { placeholder: /search for a product/i })).toHaveAttribute('aria-expanded', 'false');
        userEvent.type(input, 'Product1');
        expect(screen.getByTitle('Product name:', { value: /Product1/i })).toBeInTheDocument();
    });

    test('handles brand change', async () => {
        const { queryByTestId } = render(<Home />);
        await act(async () => {
            await screen.getByText(/Product Search/i);
        });
        const input = screen.getByTitle('Product name:', { placeholder: /search for a product/i });
        expect(screen.getByTitle('Product name:', { placeholder: /search for a product/i })).toHaveAttribute('aria-expanded', 'false');
        userEvent.type(input, 'Product1');

        const mySelectComponent = queryByTestId('my-select-component');
        userEvent.selectOptions(mySelectComponent, 'Brand1');
        // expect(screen.getByLabelText('Brand:')).toHaveValue('Brand1');

    });

});