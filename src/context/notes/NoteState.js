import React, { useState } from "react";
import NoteContext from "./NoteContext";

const initialNotes = [];

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const s1 = {
    "name": "Rishi",
    "class": "c2"
  }

  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({
        "name": "Aayush",
        "class": "c1"
      })
    }, 1000);
  }

  const [notes, setNotes] = useState(initialNotes);


  const getAllNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      console.log("Fetched notes:", json);
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error); // Add this log
    }
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json();

    const note = {
      "_id": "64f0d3458ea32148419b626e",
      "user": "64eccda912b5d7d4f291a23a",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-08-31T17:52:05.322Z",
      "__v": 0
    };

    setNotes(notes.concat(note));
  }


  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = response.json();
    console.log(json);

    console.log("Deleting the note with id " + id);
    // only keep those nodes whose id doesent matches to the id of the node to be deleted and remove ones with the matched id's
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }


  const editNote = async (id, title, description, tag) => {
    // Example POST method implementation:
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = response.json();

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id == id) {
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
      }
    }
    setNotes(notes);
  }

  return (
    // provider provides all the data or states which are enclosed in context 
    // you can also pass below javascript object as {state:state,update:update}
    <NoteContext.Provider value={{ state, update, notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;