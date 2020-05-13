async function addExercise(parent, args, ctx, info) {
   const updatedMember = await ctx.db.mutation.updateMember(
      {
         where: {
            id: ctx.req.memberId
         },
         data: {
            exercises: {
               create: {
                  name: 'New Exercise',
                  weight: '0',
                  notes: ''
               }
            }
         }
      },
      info
   );
   return updatedMember;
}
exports.addExercise = addExercise;

async function addLift(parent, { exercise, weight, score, notes }, ctx, info) {
   const newLift = await ctx.db.mutation.createLift({
      data: {
         weight,
         score,
         exercise: {
            connect: {
               id: exercise
            }
         },
         author: {
            connect: {
               id: ctx.req.memberId
            }
         }
      }
   });
   const initialExerciseData = await ctx.db.query.exercise(
      {
         where: {
            id: exercise
         }
      },
      info
   );
   if (initialExerciseData.notes !== notes) {
      const newExerciseData = await ctx.db.mutation.updateExercise(
         {
            where: {
               id: exercise
            },
            data: {
               notes
            }
         },
         info
      );
      return newExerciseData;
   }
   return initialExerciseData;
}
exports.addLift = addLift;

async function updateExercise(
   parent,
   { exercise, name, weight, notes },
   ctx,
   info
) {
   const updatedExercise = await ctx.db.mutation.updateExercise(
      {
         where: {
            id: exercise
         },
         data: {
            name,
            weight,
            notes
         }
      },
      info
   );
   return updatedExercise;
}
exports.updateExercise = updateExercise;

async function deleteExercise(parent, { id }, ctx, info) {
   const updatedMember = await ctx.db.mutation.updateMember(
      {
         where: {
            id: ctx.req.memberId
         },
         data: {
            exercises: {
               delete: {
                  id
               }
            }
         }
      },
      info
   );
   return updatedMember;
}
exports.deleteExercise = deleteExercise;
