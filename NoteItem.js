import React from "react";

function NoteItem({ title, description, tag, id, updateNote, note}) {
  const deleteNote = async (id) => {
    const response = await fetch(
    `http://localhost:5000/api/notes/deletenotes/${id}`,{
        method : 'DELETE',
        headers : {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token')
        }
    });

    const json = await response.json
    console.log(json)
  };

  return (
    <div className="my-4 mx-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex" style={{ alignItems: "center" }}>
            <h5 className="card-title">{title}</h5>
            <i className="far fa-trash-alt mx-2" onClick={()=>deleteNote(id)}></i>
            <i className="far fa-edit mx-2" onClick={() =>updateNote(note)}></i>
          </div>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
