import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';

const theme = {};

const GlobalStyle = createGlobalStyle``;

const StyledPage = styled.div``;

const Page = ({ children }) => (
   <ThemeProvider theme={theme}>
      <StyledPage id="page">
         <>
            <GlobalStyle />
            {children}
         </>
      </StyledPage>
   </ThemeProvider>
);
Page.propTypes = {
   children: PropTypes.node
};
export default Page;
