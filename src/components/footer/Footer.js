import styled from "styled-components";

const theme = require("../../schema.json");

const FooterContainer = styled.footer`
    background-color: ${theme.colors.body};
    border-top: ${theme.divider.main}; 
    height: ${theme.footer.height};
`;

const CommerceFooter = () => {
    return (
        <FooterContainer>

        </FooterContainer>
    )
}

export default CommerceFooter;