import * as fs from "fs"
import { print } from "graphql";
import {loadFiles} from "./loadFiles";
// import { loadFiles } from "graphql-import-files";

const typeDefs = loadFiles()
const schema = print(typeDefs)

fs.writeFileSync("schema.graphql", schema)
