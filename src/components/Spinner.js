import styled, { keyframes } from "styled-components";
import spinner from '../images/loadingWheel.png';

const theme = require("../schema.json");

const Rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to{
        transform: rotate(359deg);
    }
`;

const SpinnerContainer = styled.div`
    min-height: calc(100vh - (${theme.footer.height} + ${theme.navbar.height}));
`;

const SpinnerIcon = styled.img`
    display: block;
    margin: 20% auto;
    height: 128px;
    width: 128px;
    animation: ${Rotate} 5s linear infinite;
`;

const Spinner = () => {
    return (
        <SpinnerContainer>
            <SpinnerIcon src={spinner} alt="Loading Wheel"/>
        </SpinnerContainer>
    )
}

export default Spinner;