async function me(parent, args, ctx, info) {
   if (!ctx.req.memberId) {
      return null;
   }
   const member = await ctx.db.query.member(
      {
         where: { id: ctx.req.memberId }
      },
      info
   );
   return member;
}
exports.me = me;
