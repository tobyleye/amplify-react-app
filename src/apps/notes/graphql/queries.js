export const listNotes = `
    query {
        listNotes {
            items {
                id
                name
                description
                completed
            }
        }
    }
`;

