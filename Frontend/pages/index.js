import styled from 'styled-components';

const StyledHomepage = styled.div`
   display: flex;
   align-items: center;
   height: 100vh;
   .sloganContainer {
      width: 100%;
      h2 {
         font-size: 8rem;
         font-weight: 500;
         margin: auto;
         line-height: 2;
         text-align: center;
      }
   }
`;

const Home = () => (
   <StyledHomepage>
      <div className="sloganContainer">
         <h2>GET STRONGER</h2>
         <h2>FIND THE OTHERS</h2>
      </div>
   </StyledHomepage>
);

export default Home;
