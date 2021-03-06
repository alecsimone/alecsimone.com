import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoadingContainer = styled.div`
   width: 100%;
   text-align: center;
   .lds-ring {
      display: inline-block;
      position: relative;
      margin: auto;
      width: 64px;
      height: 64px;
   }
   .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 51px;
      height: 51px;
      margin: 6px;
      border: 6px solid ${props => props.theme.white};
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: ${props => props.theme.white} transparent transparent
         transparent;
   }
   .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
   }
   .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
   }
   .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
   }
   @keyframes lds-ring {
      0% {
         transform: rotate(0deg);
      }
      100% {
         transform: rotate(360deg);
      }
   }
`;

const LoadingRing = () => (
   <LoadingContainer>
      <div className="lds-ring">
         <div />
         <div />
         <div />
         <div />
      </div>
   </LoadingContainer>
);
LoadingRing.propTypes = {};

export default LoadingRing;
