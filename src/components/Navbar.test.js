import { render, screen } from "@testing-library/react"
import Navbar from "./Navbar"

describe('Navbar tests', () => {
    test('render identitytoolkit as test', () => {

        //Arrange
        render(<Navbar />);

        //Act
        //Nothing to do here right now

        //Assert
        const HomeEle = screen.getByText('Home', { exact: false });
        expect(HomeEle).toBeInTheDocument();
    })
})