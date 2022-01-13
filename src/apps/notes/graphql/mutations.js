export const addNote = `
    mutation addNote(
        $id: String!
        $name: String!
        $description: String!
        $clientId: String
        $completed: Boolean
    ) {
        createNote(input: {
            id: $id
            name: $name
            description: $description
            clientId: $clientId
            completed: $completed
        }) {
            name,
            completed
        }
    }
`

export const deleteNote = `
    mutation deleteNote($id: String!) {
        deleteNote(input: {
            id: $id
        }) {
            id,
        }
    }
`