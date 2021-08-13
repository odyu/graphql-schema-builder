import { readFileSync } from 'fs'
import { join } from 'path'
import * as glob from 'fast-glob'
import { mergeTypeDefs } from '@graphql-tools/merge'
import { DocumentNode } from 'graphql'
import * as ejs from "ejs"

/**
 * Source: https://github.com/tiago154/graphql-import-files/blob/master/src/loadFiles.ts
 *
 * Loads multiple graphql files, use .graphql or .gql.
 * @param {string} matchFiles - The glob patterns uses to detect graphql files
 * @return {object} DocumentNode
 */
export const loadFiles = (): DocumentNode => {
  const ejsFiles = glob.sync("**/schema/**/*.ejs")
  const gqlFiles = glob.sync("**/schema/**/*.{graphql,gql}")

  const ejsSchema = ejsFiles.map(file => {
    const template = readFileSync(join(process.cwd(), file), 'utf8')
    return ejs.render(template)
  })

  const gqlSchema = gqlFiles.map(file =>
    readFileSync(join(process.cwd(), file), 'utf8')
  )

  return mergeTypeDefs([
    ...ejsSchema,
    ...gqlSchema,
  ])
}
