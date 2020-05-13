const { signup, logout, login } = require('./Mutation/MemberMutations');
const {
   addExercise,
   addLift,
   updateExercise,
   deleteExercise
} = require('./Mutation/WorkoutMutations');

const Mutations = {
   signup,
   logout,
   login,
   addExercise,
   addLift,
   updateExercise,
   deleteExercise
};

module.exports = Mutations;
