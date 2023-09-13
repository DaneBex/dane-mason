/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any };
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any };
};

export type Achievement = {
  __typename?: "Achievement";
  business?: Maybe<Business>;
  createdAt: Scalars["String"]["output"];
  criteria: Scalars["JSON"]["output"];
  description: Scalars["String"]["output"];
  echoes: Scalars["Int"]["output"];
  expireDate?: Maybe<Scalars["String"]["output"]>;
  icon: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  relatedFrom?: Maybe<Array<Achievement>>;
  relatedTo?: Maybe<Array<Achievement>>;
  tier: AchievementTier;
  type?: Maybe<AchievementType>;
  unlockMessage: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  usersUnlocked?: Maybe<Array<User>>;
};

export enum AchievementTier {
  Bronze = "BRONZE",
  Gold = "GOLD",
  Platinum = "PLATINUM",
  Silver = "SILVER",
}

export enum AchievementType {
  Events = "EVENTS",
  Holiday = "HOLIDAY",
  Promotions = "PROMOTIONS",
  Shopping = "SHOPPING",
}

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"]["output"];
  user: User;
};

export type Business = {
  __typename?: "Business";
  achievements?: Maybe<Array<Achievement>>;
  city: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  events?: Maybe<Array<Scalars["String"]["output"]>>;
  facebook?: Maybe<Scalars["String"]["output"]>;
  favoritedBy?: Maybe<Array<User>>;
  gallery?: Maybe<Array<Scalars["String"]["output"]>>;
  hoursOfOperation?: Maybe<Array<HoursOfOperation>>;
  id: Scalars["ID"]["output"];
  instagram?: Maybe<Scalars["String"]["output"]>;
  logo?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  owners?: Maybe<Array<User>>;
  paymentOptions?: Maybe<Array<PaymentOptions>>;
  phone: Scalars["Int"]["output"];
  postalCode: Scalars["String"]["output"];
  rating?: Maybe<Scalars["Float"]["output"]>;
  reviews?: Maybe<Array<Review>>;
  specialOffers?: Maybe<Array<Scalars["JSON"]["output"]>>;
  state: Scalars["String"]["output"];
  street: Scalars["String"]["output"];
  tags?: Maybe<Array<BusinessTags>>;
  updatedAt: Scalars["String"]["output"];
  website?: Maybe<Scalars["String"]["output"]>;
  x?: Maybe<Scalars["String"]["output"]>;
};

export enum BusinessTags {
  FamilyOwned = "FAMILY_OWNED",
  LiveMusic = "LIVE_MUSIC",
  Organic = "ORGANIC",
  PetFriendly = "PET_FRIENDLY",
}

export type Comment = {
  __typename?: "Comment";
  author: User;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  likes: Scalars["Int"]["output"];
  review: Review;
  updatedAt: Scalars["String"]["output"];
};

export type CreateUserInputs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type HoursOfOperation = {
  __typename?: "HoursOfOperation";
  friday: Scalars["String"]["output"];
  monday: Scalars["String"]["output"];
  saturday: Scalars["String"]["output"];
  sunday: Scalars["String"]["output"];
  thursday: Scalars["String"]["output"];
  tuesday: Scalars["String"]["output"];
  wednesday: Scalars["String"]["output"];
};

export enum Income {
  Eighty = "EIGHTY",
  Fifty = "FIFTY",
  Twenty = "TWENTY",
  Zero = "ZERO",
}

export type Mutation = {
  __typename?: "Mutation";
  createUser?: Maybe<AuthPayload>;
  loginUser?: Maybe<SignInPayload>;
};

export type MutationCreateUserArgs = {
  createUserInputs: CreateUserInputs;
};

export type MutationLoginUserArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export enum PaymentOptions {
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
  MobilePayment = "MOBILE_PAYMENT",
  OnlineTransfer = "ONLINE_TRANSFER",
}

export type Query = {
  __typename?: "Query";
  users?: Maybe<Array<Maybe<User>>>;
};

export enum Race {
  AmericanIndian = "AMERICAN_INDIAN",
  Asian = "ASIAN",
  Black = "BLACK",
  Hispanic = "HISPANIC",
  White = "WHITE",
}

export type Review = {
  __typename?: "Review";
  author: User;
  business: Business;
  comments?: Maybe<Array<Comment>>;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  likes: Scalars["Int"]["output"];
  photos?: Maybe<Array<Scalars["String"]["output"]>>;
  rating: Scalars["Float"]["output"];
  reports?: Maybe<Array<Scalars["String"]["output"]>>;
  updatedAt: Scalars["String"]["output"];
};

export enum Sex {
  Female = "FEMALE",
  Male = "MALE",
}

export type SignInPayload = {
  __typename?: "SignInPayload";
  error?: Maybe<Scalars["String"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  achievements?: Maybe<Array<Achievement>>;
  age?: Maybe<Scalars["Int"]["output"]>;
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars["String"]["output"];
  echoes: Scalars["Int"]["output"];
  email: Scalars["String"]["output"];
  favoriteBusinesses?: Maybe<Array<Business>>;
  id: Scalars["ID"]["output"];
  income?: Maybe<Income>;
  married?: Maybe<Scalars["Boolean"]["output"]>;
  ownedBusinesses?: Maybe<Array<Business>>;
  profileImg?: Maybe<Scalars["String"]["output"]>;
  race?: Maybe<Race>;
  reviews?: Maybe<Array<Review>>;
  sex?: Maybe<Sex>;
  updatedAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type ReviewDataFragment = { __typename?: "Review"; id: string } & {
  " $fragmentName"?: "ReviewDataFragment";
};

export type UserDataFragment = {
  __typename?: "User";
  id: string;
  username: string;
  email: string;
  createdAt: string;
  profileImg?: string | null;
  age?: number | null;
  sex?: Sex | null;
  race?: Race | null;
  income?: Income | null;
  married?: boolean | null;
  echoes: number;
  updatedAt: string;
  reviews?: Array<{ __typename?: "Review"; id: string }> | null;
  achievements?: Array<{ __typename?: "Achievement"; id: string }> | null;
  favoriteBusinesses?: Array<{ __typename?: "Business"; id: string }> | null;
} & { " $fragmentName"?: "UserDataFragment" };

export type LoginUserMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type LoginUserMutation = {
  __typename?: "Mutation";
  loginUser?: {
    __typename?: "SignInPayload";
    token?: string | null;
    error?: string | null;
    user?:
      | ({ __typename?: "User" } & {
          " $fragmentRefs"?: { UserDataFragment: UserDataFragment };
        })
      | null;
  } | null;
};

export type CreateUserMutationVariables = Exact<{
  createUserInputs: CreateUserInputs;
}>;

export type CreateUserMutation = {
  __typename?: "Mutation";
  createUser?: {
    __typename?: "AuthPayload";
    token: string;
    user: { __typename?: "User" } & {
      " $fragmentRefs"?: { UserDataFragment: UserDataFragment };
    };
  } | null;
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: "Query";
  users?: Array<{
    __typename?: "User";
    username: string;
    email: string;
  } | null> | null;
};

export const ReviewDataFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "ReviewData" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Review" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
      },
    },
  ],
} as unknown as DocumentNode<ReviewDataFragment, unknown>;
export const UserDataFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserData" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "profileImg" } },
          { kind: "Field", name: { kind: "Name", value: "age" } },
          { kind: "Field", name: { kind: "Name", value: "sex" } },
          { kind: "Field", name: { kind: "Name", value: "race" } },
          { kind: "Field", name: { kind: "Name", value: "income" } },
          { kind: "Field", name: { kind: "Name", value: "married" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "reviews" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "achievements" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "favoriteBusinesses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "echoes" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UserDataFragment, unknown>;
export const LoginUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "LoginUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "loginUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "UserData" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
                { kind: "Field", name: { kind: "Name", value: "error" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserData" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "profileImg" } },
          { kind: "Field", name: { kind: "Name", value: "age" } },
          { kind: "Field", name: { kind: "Name", value: "sex" } },
          { kind: "Field", name: { kind: "Name", value: "race" } },
          { kind: "Field", name: { kind: "Name", value: "income" } },
          { kind: "Field", name: { kind: "Name", value: "married" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "reviews" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "achievements" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "favoriteBusinesses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "echoes" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginUserMutation, LoginUserMutationVariables>;
export const CreateUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "createUserInputs" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateUserInputs" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "createUserInputs" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "createUserInputs" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "UserData" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "token" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "UserData" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "profileImg" } },
          { kind: "Field", name: { kind: "Name", value: "age" } },
          { kind: "Field", name: { kind: "Name", value: "sex" } },
          { kind: "Field", name: { kind: "Name", value: "race" } },
          { kind: "Field", name: { kind: "Name", value: "income" } },
          { kind: "Field", name: { kind: "Name", value: "married" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "reviews" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "achievements" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "favoriteBusinesses" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "echoes" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const GetUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUsers" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "users" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "username" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUsersQuery, GetUsersQueryVariables>;
