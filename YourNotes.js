import React, { useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function YourNotes({ updateNote }) {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const getNotes = async () => {
    const response = await fetch("http://localhost:5000/api/notes/fetchnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, [notes]);

  return (
    <div>
      <h2>Your Notes</h2>
      <div className=" d-flex flex-wrap">
        {notes?.map((note) => (
          <NoteItem
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            tag={note.tag}
            updateNote={updateNote}
            note = {note}
          />
        ))}
      </div>
    </div>
  );
}

export default YourNotes;
