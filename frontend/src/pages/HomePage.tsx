import { useState, useEffect } from "react";
import useAxios from "../utils/useAxios";

interface NoteProps {
  id: number;
  body: string;
}

function HomePage() {
  const [notes, setNotes] = useState([]);

  const api = useAxios();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await api.get("/api/user/notes");
      if (response.status === 200) {
        setNotes(response.data);
      }
    } catch (error) {
      alert("Something went wrong. Try again later");
    }
  };
  return (
    <>
      <div>
        <p>You are logged in to the homepage</p>
      </div>
      <ul>
        {notes.map((note: NoteProps) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </>
  );
}

export default HomePage;
