import gql from 'graphql-tag';
import styled from 'styled-components';
import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ModalContext } from '../ModalProvider';
import { MemberContext, CURRENT_MEMBER_QUERY } from '../Account/MemberProvider';
import DefaultAvatar from '../Icons/DefaultAvatar';
import Signup from '../Account/Signup';

const LOGOUT_MUTATION = gql`
   mutation LOG_OUT_MUTATION {
      logout {
         message
      }
   }
`;

const StyledHeader = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   .avatarWrapper {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      svg.defaultAvatar {
         width: 3rem;
         opacity: 0.4;
         cursor: pointer;
         &:hover {
            opacity: 1;
         }
         rect {
            fill: none;
         }
         path,
         circle {
            fill: ${props => props.theme.darkGrey};
         }
      }
   }
   a.logout {
      cursor: pointer;
   }
`;

const Header = () => {
   const { setContent } = useContext(ModalContext);
   const { me, loading } = useContext(MemberContext);

   const [logout] = useMutation(LOGOUT_MUTATION);

   let greeting;
   if (me) {
      greeting = <div className="greeting">Welcome, {me.displayName}</div>;
   }

   const showModal = () => {
      setContent(<Signup />);
   };

   return (
      <StyledHeader>
         {greeting}
         {!me && (
            <div className="avatarWrapper">
               <DefaultAvatar onClick={showModal} />
            </div>
         )}
         {me && (
            <a
               className="logout"
               onClick={() =>
                  logout({
                     refetchQueries: [{ query: CURRENT_MEMBER_QUERY }]
                  })
               }
            >
               Log Out
            </a>
         )}
      </StyledHeader>
   );
};

export default Header;
