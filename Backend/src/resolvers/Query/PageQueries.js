async function exercises(parent, args, ctx, info) {
   const allExercises = await ctx.db.query.member(
      {
         where: {
            id: ctx.req.memberId
         }
      },
      info
   );
   return allExercises;
}
exports.exercises = exercises;
