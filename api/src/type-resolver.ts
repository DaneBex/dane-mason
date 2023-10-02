import { achievementTypes } from "./types/Achievement";
import { businessTypes } from "./types/Business";
import { commentTypes } from "./types/Comment";
import { hoursOfOperationTypes } from "./types/HoursOfOperation";
import { reviewTypes } from "./types/Review";
import { userResolver, userTypes } from "./types/User";

export const typeDefs = [
  userTypes,
  businessTypes,
  reviewTypes,
  commentTypes,
  hoursOfOperationTypes,
  achievementTypes,
];

export const resolvers = [userResolver];
