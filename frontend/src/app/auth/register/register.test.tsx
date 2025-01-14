import {render, screen} from '@testing-library/react';
import Register from './page';

jest.mock('../../../api/authAPI');

const newUserMock = {
    name: 'Andrea Lopez',
    username: 'alopez',
    password:'asdfghj',
    email:'alopez@gmail.com'
}

const setupPageLoad = () => {
    render(<Register />);
};

describe('<Register />', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('When register form loads', () => {
        it('Should have the title Register', () => {
            setupPageLoad();
            expect(screen.getByRole('heading')).toHaveTextContent('Register');
        })

        it('Should display tha name field', () => {
            setupPageLoad();
            expect(screen.getByRole('textbox', {name: 'Name'})).toBeInTheDocument();
        })

        it('Should display tha username field', () => {
            setupPageLoad();
            expect(screen.getByRole('textbox', {name: 'Username'})).toBeInTheDocument();
        })

        it('Should display tha password field', () => {
            setupPageLoad();
            expect(screen.getByRole('textbox', {name: 'Password'})).toBeInTheDocument();
        })

        it('Should display tha email field', () => {
            setupPageLoad();
            expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument();
        })
    });

})