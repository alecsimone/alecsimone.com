const { withFilter } = require('graphql-subscriptions');

const Subscription = {
   me: {
      subscribe: withFilter(
         (parent, args, ctx, info) => ctx.pubsub.asyncIterator('me'),
         (payload, variables, ctx, info) =>
            ctx.connection.context.memberId === payload.me.node.id
      )
   }
};

module.exports = Subscription;
