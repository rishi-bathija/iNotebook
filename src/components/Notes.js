import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import { useEffect } from 'react';
import { useRef } from 'react';
import './custom-modal.css'
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const ref = useRef(null);
  
  let history = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      context.getAllNotes();
    }
    else{
      history("/login");
    }
  }, [context.note])



  const [showModal, setShowModal] = useState(false);
  // const [showValidationError, setShowValidationError] = useState(false); // New state for validation error
  // const [validationError, setValidationError] = useState("");

  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the custom modal
  const closeModal = () => {
    setShowModal(false);
    // setShowValidationError(false); 
    // setValidationError("");
  };


  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

  const updateNote = (currentNote) => {
    // console.log("updateNote called");
    // ref.current.click();
    // setIsModalOpen(true);
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }


  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleClick = (e) => {
    e.preventDefault();
    const trimmedTitle = note.etitle.trim();
    const trimmedDescription = note.edescription.trim();
    if (trimmedTitle.length < 5 || trimmedDescription.length < 5) {
      props.showAlert("Title and description must be at least 5 characters long.","danger");
      // setValidationError("Title and description must be at least 5 characters long.");
      // setShowValidationError(true);
      closeModal();
      return; // Don't edit the note if validation fails
    }
    console.log("Updating the note", note);


    context.editNote(note.id, trimmedTitle, trimmedDescription, note.etag);
    // context.addNote(note.title, note.description, note.tag);
    closeModal();
    props.showAlert("Updated Successfully","success")
    
  }

  // console.log("Context notes:", context.notes);

  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" onClick={openModal} >
        Launch demo modal
      </button>

      {showModal && (
        <div className="custom-modal modal-lg">
          <div className="custom-modal-content">
            {/* Modal content */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <div className="modal-body">
              {/* Your modal content here */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" aria-describedby="emailHelp" name="etitle" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
              {/* {showValidationError && (
                <div className="alert alert-danger" role="alert">
                  {validationError}
                  <button type="button" className="btn-close" onClick={() => { setShowValidationError(false) }} style={{ position: 'absolute', right: '10px' }}></button>
                </div>
              )} */}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleClick} style={{ margin: '0.5em' }}>Update Note</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => { closeModal() }}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-3">
          {context.notes.length === 0 && "No notes to display"}
        </div>

        {context.notes.map((note) => {
          return <NoteItem note={note} updateNote={updateNote} openModal={openModal} showAlert={props.showAlert}/>
        })}
      </div>
    </>
  )
}

export default Notes