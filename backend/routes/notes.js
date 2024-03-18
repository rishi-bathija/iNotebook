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
        try {
                const { title, description, tag } = req.body;

                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).json({ success: false, message: "Note not found" });
                }

                // Check if the note belongs to the authenticated user
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).json({ success: false, message: "Not allowed" });
                }

                // Update the note
                note.title = title;
                note.description = description;
                note.tag = tag;
                const updatedNote = await note.save();
                res.json({ success: true, message: "Note updated successfully", note: updatedNote });
        } catch (error) {
                console.error(error.message);
                res.status(500).json({ success: false, message: "Internal Server Error" });
        }
});

// Route 4:- Delete an existing note using DELETE "api/notes/deletenote", Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
        try {
                // destructuring the things to be updated from our body


                // find the note to be deleted and update it
                let note = await Note.findById(req.params.id);
                if (!note) {
                        return res.status(404).json({ success: false, message: "Note not found" });
                }

                // Check if the note belongs to the authenticated user
                if (note.user.toString() !== req.user.id) {
                        return res.status(401).json({ success: false, message: "Not allowed" });
                }

                note = await Note.findByIdAndDelete(req.params.id);

                res.json({ success: true, message: "Note has been deleted" });
        }
        catch (error) {
                console.log(error.message);
                res.status(500).send({ success: false, message: "Internal Server Error" });
        }
})
module.exports = router;