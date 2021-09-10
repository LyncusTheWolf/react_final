import styled from "styled-components";
const theme = require("../schema.json");

const PageContainer = styled.div`
    //border: 1px solid red;
    margin: 0 1em 4em;
    min-height: calc(100vh - (${theme.footer.height} + ${theme.navbar.height}));
`;

export default PageContainer;