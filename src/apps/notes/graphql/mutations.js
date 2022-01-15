export const createNote = `
    mutation createNote(
       $input: CreateNoteInput!
    ) {
        createNote(input: $input) {
            name,
            completed
        }
    }
`

export const deleteNote = `
    mutation deleteNote($input: DeleteNoteInput! ) {
        deleteNote(input: $input) {
            id
        }
    }
`