import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from './page';

const setupPageLoad = () => {
  return render(<Register />);
};

describe('<Register />', () => {
  beforeEach(() => {
    setupPageLoad();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('When register form loads', () => {
    it('Should have the title Register', () => {
        expect(screen.getByRole('heading')).toHaveTextContent('Register');
    });

    it('Should display the name field', () => {
        expect(screen.getByTestId('name')).toBeInTheDocument();
    });

    it('Should display the username field', () => {
        expect(screen.getByTestId('username')).toBeInTheDocument();
    });

    it('Should display the password field', () => {
        expect(screen.getByTestId('password')).toBeInTheDocument();
    });

    it('Should display the email field', () => {
        expect(screen.getByTestId('email')).toBeInTheDocument();
    });

    it.skip('Should display the submit button', () => {
      expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    it.skip('Should display a terms and conditions checkbox', () => {
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByLabelText('I agree to the terms and conditions')).toBeInTheDocument();
    });

    it.skip('Should display an error message placeholder for invalid inputs', () => {
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });
  });
});