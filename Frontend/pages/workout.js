import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import Head from 'next/head';
import LoadingRing from '../components/LoadingRing';
import Error from '../components/ErrorMessage';
import Workout from '../components/Workout/Workout';
import { fullExerciseFields } from '../lib/CardInterfaces';

const ALL_EXERCISES_QUERY = gql`
   query ALL_EXERCISES_QUERY {
      exercises {
         __typename
         id
         exercises {
            ${fullExerciseFields}
         }
      }
   }
`;

const workoutPage = () => {
   const { data, loading, error } = useQuery(ALL_EXERCISES_QUERY);

   if (loading) {
      return <LoadingRing />;
   }
   if (error) {
      return <Error error={error} />;
   }

   return <Workout exercises={data.exercises.exercises} />;
};

export default workoutPage;
