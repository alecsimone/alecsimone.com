import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { fullMemberFields } from '../../lib/CardInterfaces';

const CURRENT_MEMBER_QUERY = gql`
   {
      me {
         ${fullMemberFields}
      }
   }
`;
const ME_SUBSCRIPTION = gql`
   subscription ME_SUBSCRIPTION {
      me {
         node {
            ${fullMemberFields}
         }
      }
   }
`;

const MemberContext = React.createContext();

const MemberProvider = ({ children }) => {
   const { loading, error, data, client } = useQuery(CURRENT_MEMBER_QUERY, {
      ssr: false
   });

   const {
      data: subscriptionData,
      loading: subscriptionLoading
   } = useSubscription(ME_SUBSCRIPTION);

   let memberData = {};
   if (error) {
      console.log(error);
      memberData.me = 'error';
   }

   if (data && data.me != null) {
      if (data.me == null) {
         memberData.me = null;
      } else {
         memberData.me = data.me;
      }
   } else {
      memberData = {
         loading
      };
   }

   return (
      <MemberContext.Provider value={memberData}>
         {children}
      </MemberContext.Provider>
   );
};
MemberProvider.propTypes = {
   children: PropTypes.node
};

export { MemberContext, CURRENT_MEMBER_QUERY };
export default MemberProvider;
