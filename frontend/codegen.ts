import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:4000",
    documents: ["src/graphql/{mutations,queries,fragments}/*.graphql"],
    generates: {
      "./src/__generated__/": {
        preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
      },
    },
  };

export default config;