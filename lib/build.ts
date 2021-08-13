import * as fs from "fs"
import { print } from "graphql";
import { loadFiles } from "graphql-import-files";

const typeDefs = loadFiles("**/schema/**/*.{graphql,gql}")
const schema = print(typeDefs)

fs.writeFileSync("schema.graphql", schema)
