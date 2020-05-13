const fullMemberFields = `
   __typename
   id
   displayName
   avatar
`;
export { fullMemberFields };

const fullExerciseFields = `
   __typename
   id
   name
   author {
      __typename
      id
      displayName
   }
   weight
   lifts {
      __typename
      id
      weight
      score
      createdAt
      updatedAt
   }
   notes
   createdAt
   updatedAt
`;
export { fullExerciseFields };
