import { executeQuery } from 'src/handler/db.ts'

export const sampleRepo = async () => {
    const query = `SELECT * FROM sample_table`

    const queryResponse = executeQuery(query)

    return queryResponse
}
