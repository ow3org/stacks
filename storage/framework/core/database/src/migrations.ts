import { path } from '@stacksjs/path'
import { log } from '@stacksjs/logging'
import { err, ok } from '@stacksjs/error-handling'
import { fs, glob } from '@stacksjs/storage'
import type { FieldOptions } from '@stacksjs/types'
import { FileMigrationProvider, Migrator } from 'kysely'
import { database } from '@stacksjs/config'
import { db } from './utils'

export const migrator = new Migrator({
  db,

  provider: new FileMigrationProvider({
    fs,
    path,
    // This needs to be an absolute path.
    migrationFolder: path.userMigrationsPath(),
  }),

  migrationTableName: database.migrations,
  migrationLockTableName: database.migrationLocks,
})

export async function runDatabaseMigration() {
  try {
    log.info('Migrating database...')

    const migration = await migrator.migrateToLatest()

    if (migration.error) {
      log.error(migration.error)
      return err(migration.error)
    }

    if (migration.results?.length === 0) {
      log.success('No new migrations were executed')
      return ok('No new migrations were executed')
    }

    if (migration.results) {
      migration.results.forEach(({ migrationName }) => {
        log.info(`Migration Name: ${migrationName}`)
      })

      log.success('Database migrated successfully.')
      return ok(migration)
    }

    log.success('Database migration completed with no new migrations.')
    return ok('Database migration completed with no new migrations.')
  }
  catch (error) {
    console.error('Migration failed:', error)
    return err(error)
  }
}

export interface MigrationOptions {
  name: string
  up: string
}

export function generateMigrationFile(options: MigrationOptions) {
  const { name, up } = options

  const timestamp = new Date().getTime().toString()
  const fileName = `${timestamp}-${name}.ts`
  const filePath = path.userMigrationsPath(fileName)
  const fileContent = `import type { Database } from '@stacksjs/database'
import { sql } from '@stacksjs/database'

export async function up(db: Database<any>) {
  ${up}
})`

  // TODO: use Bun.write
  fs.writeFileSync(filePath, fileContent)

  log.success(`Created migration: ${fileName}`)
}

export async function generateMigrations() {
  log.info('Generating migrations based on your models...')
  const modelFiles = glob.sync(path.userModelsPath('*.ts'))

  for (const file of modelFiles)
    await generateMigration(file)
}

export async function generateMigration(modelPath: string) {
  const model = await import(modelPath)
  const tableName = model.default.table
  const fields = model.default.fields

  let migrationContent = `import type { Database } from '@stacksjs/database'\n`
  migrationContent += `import { sql } from '@stacksjs/database'\n\n`
  migrationContent += `export async function up(db: Database<any>) {\n`
  migrationContent += `  await db.schema\n`
  migrationContent += `    .createTable('${tableName}')\n`

  for (const [fieldName, options] of Object.entries(fields)) {
    const fieldOptions = options as FieldOptions
    const columnType = mapFieldTypeToColumnType(fieldOptions.validator?.rule)
    console.log('columnType', columnType)
    migrationContent += `    .addColumn('${fieldName}', '${columnType}', col => col`
    if (fieldOptions.unique)
      migrationContent += `.unique()`

    if (fieldOptions.validator?.rule?.required)
      migrationContent += `.notNull()`

    migrationContent += `)\n`
  }

  migrationContent += `    .execute()\n`
  migrationContent += `}\n`

  const timestamp = new Date().getTime().toString()
  const migrationFileName = `${timestamp}-create-${tableName}-table.ts`
  const migrationFilePath = path.join(path.userMigrationsPath(), migrationFileName)

  // Assuming fs.writeFileSync is available or use an equivalent method
  fs.writeFileSync(migrationFilePath, migrationContent)

  log.success(`Created migration: ${migrationFileName}`)
}

function mapFieldTypeToColumnType(rule: any): string {
  // Check if the rule is for a string and has specific validations
  if (rule[Symbol.for('schema_name')].includes('string'))
    // Default column type for strings
    return prepareTextColumnType(rule)

  // need to now handle all other types

  // Add cases for other types as needed, similar to the original function
  switch (rule) {
    case 'integer':
      return 'int'
    case 'boolean':
      return 'boolean'
    case 'date':
      return 'date'
    case 'datetime':
      return 'timestamp'
    case 'float':
      return 'float'
    case 'decimal':
      return 'decimal'
    default:
      return 'text' // Fallback for unknown types
  }
}

function prepareTextColumnType(rule) {
  let columnType = 'varchar(255)'

  // Find min and max length validations
  const minLengthValidation = rule.validations.find(v => v.options?.min !== undefined)
  const maxLengthValidation = rule.validations.find(v => v.options?.max !== undefined)

  // If there's a max length validation, adjust the column type accordingly
  if (maxLengthValidation) {
    const maxLength = maxLengthValidation.options.max
    columnType = `varchar(${maxLength})`
  }

  // If there's only a min length validation and no max, consider using text
  // This is a simplistic approach; adjust based on your actual requirements
  if (minLengthValidation && !maxLengthValidation)
    columnType = 'text'

  return columnType
}
