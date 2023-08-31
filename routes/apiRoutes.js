const fs = require("fs")
const path = require('path');
const notes = require("../db/db.json")
const express = require("express")
const router = express.Router()

const saveNotes = () => {
    fs.writeFileSync(path.resolve(__dirname, "../db/db.json"), JSON.stringify(notes))
}

router.get("/notes", (req, res) => {
    let notesData = notes.map((note, index) => ({
        ...note, 
        id: index
    })
    )
    console.log(notesData)
    res.json(notesData)
})

router.post("/notes", (req, res) => {
    notes.push(req.body)
    saveNotes(notes)
    res.json(notes) 
})

router.delete("/notes/:id", (req, res) => {
    console.log(req.params.id)
    notes.splice(req.params.id, 1)
    // notes = notes.filter((note) => note.id === req.params.id)
    saveNotes()
    res.json()
})


module.exports = router;