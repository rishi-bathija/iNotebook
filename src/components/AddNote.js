import React, { useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext } from 'react';
import Alert from './Alert';
const AddNote = (props) => {
  const context = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleCloseAlert = () => {
    setShowAlert(false);
  }


  const handleClick = (e) => {
    e.preventDefault();
    const trimmedTitle = note.title.trim();
    const trimmedDescription = note.description.trim();
    if (trimmedTitle.length < 5 || trimmedDescription.length < 5) {
      // setShowAlert(true); return; // Don't add the note if validation fails
      props.showAlert("Title and Description must be atleast 5 characters long","danger")
      return;
    }
    context.addNote(trimmedTitle, trimmedDescription, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully","success")
  }

  return (
    <div className="container my-3">
      <h2>Add a note</h2>

      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Title and description must be at least 5 characters long.
          <button type="button" className="btn-close" onClick={handleCloseAlert} style={{position:'absolute',right:'10px'}}></button>
        </div>
      )}

      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" aria-describedby="emailHelp" name="title" value={note.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
