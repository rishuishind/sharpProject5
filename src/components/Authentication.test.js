import { render, screen } from "@testing-library/react"
import Authentication from "./Authentication"

describe('Authentication tests', () => {
    test('render identitytoolkit as test', async () => {

        //Arrange
        render(<Authentication />);

        //Act
        //Nothing to do here right now

        //Assert
        const identifyElement = await screen.findByText('identitytoolkit', { exact: false });
        expect(identifyElement).toBeInTheDocument();
    })
})