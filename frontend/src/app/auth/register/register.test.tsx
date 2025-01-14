import {render, screen} from '@testing-library/react';
import Register from './page';

it("renders register page", () => {
    render(<Register/>);
    expect(screen.getByText('hello register')).toBeInTheDocument();
})