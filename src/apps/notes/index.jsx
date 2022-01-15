import { listNotes } from "./graphql/queries";
import { API } from "aws-amplify";
import { useState, useEffect } from "react";
import { List, Input, Button } from "antd";
import "antd/dist/antd.css";
import { v4 as uuid } from "uuid";
import { createNote, deleteNote } from "./graphql/mutations";
import { onCreateNote } from "./graphql/subscriptions";

export default function NotesApp() {
  let [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNotes() {
    try {
      setLoading(true);
      let notes = await API.graphql({
        query: listNotes,
      });
      setNotes(notes.data.listNotes.items);
      console.log(notes);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    let subscription = API.graphql({
      query: onCreateNote,
    }).subscribe({
      next(noteData) {
        console.log("new note has been added!!", noteData.value.data);
        const note = noteData.value.data.onCreateNote;
        if (note) {
          setNotes([...notes, note]);
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  function onDeleteNote(note) {
      console.log('deleting note',note)
    API.graphql({
      query: deleteNote,
      variables: {
        input: {
          id: note.id,
        },
      },
    })
      .then(() => {
        console.log("note deleted");
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  return (
    <div>
      <h3>Notes app</h3>
      <List
        style={{
          marginBottom: 50,
        }}
        loading={loading}
        bordered
        dataSource={notes}
        renderItem={(item) => (
          <List.Item
            actions={[
              <button onClick={() => onDeleteNote(item)}>delete</button>,
            ]}
          >
            <List.Item.Meta title={item.name} description={item.description} />
          </List.Item>
        )}
      />

      <AddTodoForm />
    </div>
  );
}

const CLIENT_ID = uuid();

function AddTodoForm() {
  let [form, setForm] = useState({
    name: "",
    description: "",
  });

  let updateFormValues = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  let onSubmit = async (e) => {
    if (!form.name || !form.description) {
      window.alert("name & description are required!");
      return;
    }
    e?.preventDeafult?.();
    let note = {
      ...form,
      id: uuid(),
      completed: false,
      clientId: CLIENT_ID,
    };

    API.graphql({
      query: createNote,
      variables: {
        input: note,
      },
    })
      .then(() => {
        setForm({
          name: "",
          description: "",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        value={form.name}
        name="name"
        onChange={updateFormValues}
        placeholder="Note name"
      />
      <Input
        value={form.description}
        name="description"
        onChange={updateFormValues}
        placeholder="note description"
      />
      <Button onClick={onSubmit}>Create Note</Button>
    </form>
  );
}
