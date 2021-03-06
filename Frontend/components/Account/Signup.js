import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import Error from '../ErrorMessage.js';
import StyledForm from '../../styles/StyledForm';
import { CURRENT_MEMBER_QUERY } from './MemberProvider';
import { ModalContext } from '../ModalProvider';
import { setLightness } from '../../styles/functions.js';
import Login from './Login';

const StyledSwitchTo = styled.div`
   font-size: ${props => props.theme.miniText};
   color: ${props => setLightness(props.theme.darkGrey, 50)};
   text-align: center;
   margin-top: 2rem;
   a {
      color: ${props => setLightness(props.theme.darkGrey, 75)};
      cursor: pointer;
   }
`;
export { StyledSwitchTo };

const SIGNUP_MUTATION = gql`
   mutation SIGNUP_MUTATION(
      $email: String!
      $displayName: String!
      $password: String!
   ) {
      signup(email: $email, displayName: $displayName, password: $password) {
         id
         email
         displayName
         avatar
      }
   }
`;

const Signup = ({ callBack }) => {
   const { setContent } = useContext(ModalContext);
   const [displayName, setDisplayName] = useState('');
   const [password, setPassword] = useState('');
   const [confirmedPassword, setConfirmedPassword] = useState('');
   const [email, setEmail] = useState('');

   const saveToState = function(e) {
      if (e.target.name === 'displayName') {
         setDisplayName(e.target.value);
      }
      if (e.target.name === 'password') {
         setPassword(e.target.value);
      }
      if (e.target.name === 'confirmedPassword') {
         setConfirmedPassword(e.target.value);
      }
      if (e.target.name === 'email') {
         setEmail(e.target.value);
      }
   };

   const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);

   return (
      <StyledForm
         method="post"
         onSubmit={async e => {
            e.preventDefault();
            if (password !== confirmedPassword) {
               alert("Yo, your passwords don't match");
               return;
            }
            await signup({
               variables: { email, displayName, password },
               refetchQueries: [{ query: CURRENT_MEMBER_QUERY }]
            });
            Router.push({
               pathname: '/'
            });
            if (callBack) {
               callBack();
            }
            setContent(false);
         }}
      >
         <fieldset disabled={loading} aria-busy={loading}>
            <Error error={error} />
            <label htmlFor="displayName">
               <input
                  type="text"
                  name="displayName"
                  placeholder="Display Name"
                  maxLength={24}
                  value={displayName}
                  onChange={saveToState}
               />
            </label>
            <label htmlFor="email">
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={saveToState}
               />
            </label>
            <label htmlFor="password">
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={saveToState}
               />
            </label>
            <label htmlFor="confirmedPassword">
               <input
                  type="password"
                  name="confirmedPassword"
                  placeholder="Confirm Password"
                  value={confirmedPassword}
                  onChange={saveToState}
               />
            </label>

            <button type="submit">Sign Up</button>
         </fieldset>
         <StyledSwitchTo className="switchToSignIn">
            Already have an account?{' '}
            <a onClick={() => setContent(<Login />)}>Sign in</a>
         </StyledSwitchTo>
      </StyledForm>
   );
};
Signup.propTypes = {
   callBack: PropTypes.func
};

export default Signup;
