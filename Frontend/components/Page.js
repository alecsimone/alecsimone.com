import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import PropTypes from 'prop-types';
import Meta from './Header/Meta';
import Header from './Header/Header';
import Modal from './Modal';
import ModalProvider from './ModalProvider';
import MemberProvider from './Account/MemberProvider';
import { setLightness, setAlpha } from '../styles/functions';

const theme = {
   tinyText: '1.25rem',
   miniText: '1.7rem',
   smallText: '2rem',
   bigText: '2.5rem',
   smallHead: '4rem',
   bigHead: '5rem',

   deepBlack: 'hsl(30, 1%, 1%)',
   midBlack: 'hsl(30, 1%, 4%)',
   lightBlack: 'hsl(210, 20%, 8%)',

   white: 'hsl(210, 3%, 80%)',
   darkGrey: 'hsl(210, 10%, 30%)',
   lightGrey: 'hsl(30, 10%, 60%)',

   warning: 'hsl(0, 75%, 50%)',

   mobileBPWidth: '600px',
   mobileBPWidthRaw: 600,
   mobileBreakpoint: '@media screen and (min-width: 600px)',

   desktopBPWidth: '1100px',
   desktopBPWidthRaw: 1100,
   desktopBreakpoint: '@media screen and (min-width: 1100px)',

   midScreenBPWidth: '1440px',
   midScreenBPWidthRaw: 1440,
   midScreenBreakpoint: '@media screen and (min-width: 1440px)',

   bigScreenBPWidth: '1800px',
   bigScreenBPWidthRaw: 1800,
   bigScreenBreakpoint: '@media screen and (min-width: 1800px)',

   massiveScreenBPWidth: '1921px',
   massiveScreenBPWidthRaw: 1921,
   massiveScreenBreakpoint: '@media screen and (min-width: 1921px)'
};

const GlobalStyle = createGlobalStyle`
   html {
      background: ${theme.deepBlack};
      color: ${theme.white};
      font-family: "Proxima Nova", sans-serif;
      font-size: 8px;
      box-sizing: border-box;
      ${props => props.theme.bigScreenBreakpoint} {
         font-size: 10px;
      }
      ${props => props.theme.massiveScreenBreakpoint} {
         font-size: 12px;
      }
   }
   *, *:before, *:after {
      box-sizing: inherit;
   }
   *::-webkit-scrollbar {
      width: .5rem;
      background: ${theme.midBlack};
   }
   *::-webkit-scrollbar-track {
      box-shadow: inset 0 0 1px ${theme.deepBlack};
   }
   *::-webkit-scrollbar-thumb {
      border-radius: 3px;
      box-shadow: inset 0 0 1px ${theme.deepBlack};
      background: ${theme.lowContrastGrey};
   }
   body {
      padding: 0;
      margin: 0;
      font-size: ${theme.smallText};
      line-height: 1.6;
      font-weight: 400;
   }
   a, a:visited {
      text-decoration: none;
      overflow-wrap: break-word;
      word-wrap: break-word;
      word-break: break-word;
      &:hover {
         text-decoration: underline;
      }
   }
   fieldset {
      border: none;
   }
   input {
      background: none;
      color: ${theme.white};
      font-family: "Proxima Nova", sans-serif;
      border-radius: 3px;
      border: none;
      border-bottom: 1px solid ${theme.darkGrey};
      padding: .25rem 1rem;
   }
   button {
      background: none;
      border: 2px solid ${theme.darkGrey};
      border-radius: 3px;
      color: ${theme.white};
      font-family: "Proxima Nova", sans-serif;
      cursor: pointer;
      &:hover {
         background: ${setAlpha(theme.darkGrey, 0.1)};
      }
   }
   textarea {
      background: none;
      color: ${theme.white};
      border: 1px solid ${setAlpha(theme.darkGrey, 0.25)};
      border-radius: 3px;
      border-bottom: 1px solid ${theme.darkGrey};
      padding: 1rem 1rem calc(1rem - 1px) 1rem;
      line-height: 1.6;
      font-family: "Proxima Nova", sans-serif;
      font-size: ${props => props.theme.smallText};
      &:focus {
         border: 1px solid ${setAlpha(theme.lightGrey, 0.4)};
         border-bottom: 1px solid ${theme.lightGrey};
         box-shadow: 0 1px 4px ${setAlpha(theme.lightGrey, 0.2)};
      }
   }
`;

const StyledPage = styled.div`
   position: relative;
   display: grid;
   grid-template-rows: auto 1fr auto;
   height: 100vh;
   padding: 1rem 2rem;
`;

const Page = ({ children }) => (
   <MemberProvider>
      <ThemeProvider theme={theme}>
         <ModalProvider>
            <StyledPage id="page">
               <Meta />
               <Header />
               <>
                  <GlobalStyle />
                  {children}
                  <Modal />
               </>
            </StyledPage>
         </ModalProvider>
      </ThemeProvider>
   </MemberProvider>
);
Page.propTypes = {
   children: PropTypes.node
};
export default Page;
