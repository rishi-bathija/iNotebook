const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const { set } = require('mongoose');

// Route 1:- This endpoint will fetch/GET all the notes of the logged in user from the database, login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
        try {
                const notes = await Note.find({ user: req.user.id });
                res.json(notes);
                // res.json([]);  
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

// Route 2:- Add a new note using POST "/api/notes/addnote", Login required
router.post('/addnote', fetchUser, [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        try {

                const { title, description, tag } = req.body;
                // If there are errors, return bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                }

                const note = new Note({
                        title, description, tag, user: req.user.id
                })
                const savedNote = await note.save();


                res.json(savedNote);
                // res.json([]);
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }


})

// Route 3:- Update an existing note using PUT "api/notes/updatenote", Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
        // destructuring the things to be updated from our body
        const { title, description, tag } = req.body;
        try {
                // Create a newNote object
                // const newNote = {};
                // if(title){newNote.title = title};
                // if(description){newNote.description = description};
                // if(tag){newNote.tag = tag};

                // find the note to be updated and update it
                let note = await Note.findById(req.params.id);
                // if(!note){return res.status(404).send("Not Found")}

                // note.user.toString() returns the id of the current user
                // if(note.user.toString() !== req.user.id.to)
                // {
                //         return res.status(401).send("Not allowed");
                // }

                if (note) {
                        note.title = title;
                        note.description = description;
                        note.tag = tag;
                        const updateNote = await note.save();
                        res.json(updateNote);
                } else {
                        return res.status(404).send("Note not found");
                }

                // note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new: true});
                // res.json(note);     

        } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
        }
})

// Route 4:- Delete an existing note using DELETE "api/notes/deletenote", Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
        try {
                // destructuring the things to be updated from our body
                const { title, description, tag } = req.body;

                // find the note to be deleted and update it
                let note = await Note.findById(req.params.id);
                if (!note) { return res.status(404).send("Not Found") }

                // note.user.toString() returns the id of the current user
                // if(note.user.toString() !== req.user.id)
                // {
                //         return res.status(401).send("Not allowed");
                // }

                note = await Note.findByIdAndDelete(req.params.id);

                res.json({ "Success": "Note has been deleted", note: note });
        }
        catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
        }
})
module.exports = router;