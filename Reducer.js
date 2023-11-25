export const initialState = {
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_NOTES":
      return {
        ...state,
        notes: [...state.notes, action.notesDetails],
      };
  }
};

export const addNote = async (title, description, tag) => {
  const response = await fetch("http://localhost:5000/api/notes/addnote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ title, description, tag }),
  });

  const json = await response.json();
};

//Get Notes from database


export default reducer;
