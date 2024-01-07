import { render, screen } from "@testing-library/react"
import AboutUs from "./AboutUs"

describe('AboutUs', () => {
    test('render identitytoolkit as test', () => {

        //Arrange
        render(<AboutUs />);

        //Act
        //Nothing to do here right now

        //Assert
        const about = screen.getByText(`Hey guys I'm Rishabh Sharma!!`);
        expect(about).toBeInTheDocument();
    });
});