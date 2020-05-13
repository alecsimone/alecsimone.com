import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';
import X from '../Icons/X';
import ExerciseRow from './ExerciseRow';
import { fullExerciseFields } from '../../lib/CardInterfaces';

const ADD_EXERCISE_MUTATION = gql`
   mutation ADD_EXERCISE_MUTATION {
      addExercise {
         __typename
         id
         exercises {
            ${fullExerciseFields}
         }
      }
   }
`;

const StyledWorkouts = styled.section`
   .grid {
      width: 100%;
      background: ${props => props.theme.midBlack};
      padding: 2rem;
      margin-top: 2rem;
      .row {
         display: flex;
         padding: 2rem;
         margin: 2rem auto;
         background: ${props => props.theme.lightBlack};
         border-radius: 3px;
         align-items: center;
         &.header {
            font-weight: 700;
         }
         .column {
            display: inline;
            margin: 0 1rem;
            input {
               font-size: ${props => props.theme.smallText};
               max-width: 100%;
            }
            &.exerciseName {
               flex-basis: 15rem;
               input {
                  max-width: 15rem;
               }
            }
            &.exerciseWeight {
               flex-basis: 10rem;
               input {
                  max-width: 12rem;
               }
            }
            &.exerciseHighScore {
               flex-basis: 15rem;
            }
            &.exerciseLastScore {
               flex-basis: 15rem;
            }
            &.exerciseAddScore {
               flex-basis: 15rem;
               max-width: 15rem;
               input {
                  background: ${props => props.theme.white};
                  color: ${props => props.theme.deepBlack};
               }
            }
            &.exerciseNotes {
               flex-basis: 30rem;
               flex-grow: 1;
               textarea {
                  width: 100%;
                  height: 9rem;
               }
            }
         }
         svg.x {
            width: 3rem;
            opacity: 0.4;
            cursor: pointer;
            &:hover {
               opacity: 1;
            }
         }
      }
   }
   .addButtonWrapper {
      width: 100%;
      margin: 4rem auto;
      button.add {
         border: none;
         display: block;
         margin: auto;
         svg.x {
            transform: rotate(45deg);
            width: ${props => props.theme.bigText};
            opacity: 0.6;
            &:hover {
               opacity: 1;
            }
         }
      }
   }
`;

const Workout = ({ exercises }) => {
   const [addExercise] = useMutation(ADD_EXERCISE_MUTATION);

   let exerciseRows;
   if (exercises == null || exercises.length === 0) {
      exerciseRows = (
         <div>
            You don't have any exercises yet. Click that little plus right below
            this to add one.
         </div>
      );
   } else {
      const rows = exercises.map(exercise => (
         <ExerciseRow exercise={exercise} key={exercise.id} />
      ));
      exerciseRows = <div className="grid">{rows}</div>;
   }
   return (
      <StyledWorkouts>
         {exerciseRows}
         <div className="addButtonWrapper">
            <button className="add" onClick={() => addExercise()}>
               <X color="white" />
            </button>
         </div>
      </StyledWorkouts>
   );
};
Workout.propTypes = {
   exercises: PropTypes.arrayOf(PropTypes.object)
};

export default Workout;
