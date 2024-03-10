import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthContextProps } from "../context/AuthContext";

interface NoteProps {
  id: number;
  body: string;
}

function HomePage() {
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(
    AuthContext
  ) as AuthContextProps;

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    };

    const response = await fetch("http://127.0.0.1:8000/user/notes/", options);
    const data = await response.json();
    if (response.status === 200) {
      setNotes(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
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
