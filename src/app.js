const express = require('express');
const noteModel = require('./models/note.model');

const app = express();
app.use(express.json());

app.post('/notes', async (req, res) => {
    try {
        const note = await noteModel.create(req.body);

        res.status(201).json({
            message: "Note created successfully",
            note: note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error creating note"
        });
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await noteModel.find();

        res.status(200).json({
            message: "Notes fetched successfully",
            notes: notes
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching notes"
        });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting note"
        });
    }
});

app.patch('/notes/:id', async (req, res) => {
    try {
        const note = await noteModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: note
        });

    } catch (error) {
        res.status(500).json({
            message: "Error updating note"
        });
    }
});

module.exports = app;