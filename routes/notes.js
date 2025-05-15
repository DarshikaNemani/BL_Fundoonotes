const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Create note
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content, userId: req.user.id });
    await note.save();
    res.status(201).json(note);
});

// Get all notes
router.get('/', async (req, res) => {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
});

// Get one note
router.get('/:id', async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, userId: req.user.id });
    if (!note) return res.status(404).send("Note not found");
    res.json(note);
});

// Update note
router.put('/:id', async (req, res) => {
    const updated = await Note.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
    );
    if (!updated) return res.status(404).send("Note not found");
    res.json(updated);
});

// Delete note
router.delete('/:id', async (req, res) => {
    const deleted = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).send("Note not found");
    res.send("Note deleted");
});

module.exports = router;