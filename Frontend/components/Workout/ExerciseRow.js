import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { fullExerciseFields } from '../../lib/CardInterfaces';
import X from '../Icons/X';

const ADD_LIFT_MUTATION = gql`
   mutation ADD_LIFT_MUTATION(
      $exercise: ID!
      $weight: String!
      $score: String!
      $notes: String
   ) {
      addLift(
         exercise: $exercise
         weight: $weight
         score: $score
         notes: $notes
      ) {
         ${fullExerciseFields}
      }
   }
`;

const UPDATE_EXERCISE_MUTATION = gql`
   mutation UPDATE_EXERCISE_MUTATION(
      $exercise: ID!
      $name: String!
      $weight: String!
      $notes: String
   ) {
      updateExercise(exercise: $exercise, name: $name, weight: $weight, notes: $notes) {
         ${fullExerciseFields}
      }
   }
`;

const DELETE_EXERCISE_MUTATION = gql`
   mutation DELETE_EXERCISE_MUTATION(
      $id: ID!
   ) {
      deleteExercise(id: $id) {
         __typename
         id
         exercises {
            ${fullExerciseFields}
         }
      }
   }
`;

const ExerciseRow = ({ exercise }) => {
   const [data, setData] = useState({
      name: exercise.name,
      weight: exercise.weight,
      addScore: '',
      notes: exercise.notes
   });

   const [addLift] = useMutation(ADD_LIFT_MUTATION, {
      variables: {
         exercise: exercise.id,
         weight: data.weight,
         score: data.addScore,
         notes: data.notes
      },
      onCompleted: () => setData({ ...data, addScore: '' })
   });

   const [updateExercise] = useMutation(UPDATE_EXERCISE_MUTATION, {
      variables: {
         exercise: exercise.id,
         name: data.name,
         weight: data.weight,
         notes: data.notes
      }
   });

   const [deleteExercise] = useMutation(DELETE_EXERCISE_MUTATION, {
      variables: {
         id: exercise.id
      }
   });

   const liftsAtThisWeight = exercise.lifts.filter(
      lift => lift.weight === exercise.weight
   );

   const lastUpdateDate = new Date(exercise.updatedAt);
   const now = new Date();
   const msAgo = now.getTime() - lastUpdateDate.getTime();
   const daysAgo = msAgo / 1000 / 60 / 60 / 24;
   let timeAgo;
   if (liftsAtThisWeight.length === 0) {
      timeAgo = 'N/A';
   } else if (daysAgo < 1) {
      const hoursAgo = Math.floor(msAgo / 1000 / 60 / 60);
      if (hoursAgo < 1) {
         timeAgo = 'Just now';
      } else {
         timeAgo = `${hoursAgo}h ago`;
      }
   } else {
      timeAgo = `${daysAgo}d ago`;
   }

   let highScore;
   let lastScore;
   if (exercise.lifts == null || exercise.lifts.length === 0) {
      highScore = 0;
      lastScore = 0;
   } else {
      const chronSort = (a, b) => {
         const aDate = new Date(a.createdAt);
         const bDate = new Date(b.createdAt);

         const aTimestamp = aDate.getTime();
         const bTimestamp = bDate.getTime();

         return bTimestamp - aTimestamp;
      };

      const chronologicalLifts = [...liftsAtThisWeight];
      if (chronologicalLifts.length === 0) {
         lastScore = 0;
      } else {
         chronologicalLifts.sort(chronSort);
         lastScore = chronologicalLifts[0].score;
      }

      const scoreSort = (a, b) => b.score - a.score;
      const rankedLifts = [...liftsAtThisWeight];
      if (rankedLifts.length === 0) {
         highScore = 0;
      } else {
         rankedLifts.sort(scoreSort);
         highScore = rankedLifts[0].score;
      }
   }

   const update = e => {
      setData({
         ...data,
         [e.target.name]: e.target.value
      });
   };

   return (
      <div className="row">
         <div className="column exerciseName">
            <input
               type="text"
               name="name"
               value={data.name}
               placeholder="Name"
               onChange={update}
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     updateExercise();
                  }
               }}
            />
         </div>
         <div className="column exerciseWeight">
            Current Level:{' '}
            <input
               type="text"
               name="weight"
               value={data.weight}
               placeholder="Level"
               onChange={update}
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     updateExercise();
                  }
               }}
            />
         </div>
         <div className="column exerciseHighScore">High Score: {highScore}</div>
         <div className="column exerciseLastScore">Last Score: {lastScore}</div>
         <div className="column exerciseAddScore">
            <input
               type="text"
               name="addScore"
               value={data.addScore}
               onChange={update}
               onKeyDown={e => {
                  if (e.key === 'Enter') {
                     addLift();
                  }
               }}
               placeholder="add score"
            />
         </div>
         <div className="column exerciseLastInput">Last Update: {timeAgo}</div>
         <div className="column exerciseNotes">
            <textarea
               name="notes"
               value={data.notes}
               placeholder="Notes"
               onChange={update}
               onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                     updateExercise();
                  }
               }}
            />
         </div>
         <X onClick={() => deleteExercise()} />
      </div>
   );
};
ExerciseRow.propTypes = {
   exercise: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      author: PropTypes.object,
      weight: PropTypes.string,
      lifts: PropTypes.array,
      notes: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired
   })
};

export default ExerciseRow;
