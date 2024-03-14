import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);

    const { note, updateNote, openModal} = props;
    return (
        <div className='col-md-3'>
            <div class="card my-3">
                <div class="card-body">
                    <div className="d-flex justify-content-between">
                        {/* heading tag is a block level element */}
                        <h5 class="card-title">{note.title}</h5>
                        <div className="icons">
                            <i class="fa-solid fa-trash-can mx-2" onClick={()=>{context.deleteNote(note._id); props.showAlert("Deleted Successfully","success")}}></i>
                            <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{
                                updateNote(note);
                                openModal();
                                }}></i>
                        </div>
                    </div>

                    <p class="card-text">{note.description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
