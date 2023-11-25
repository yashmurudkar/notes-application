const express = require('express')
const router = express.Router()
const Notes = require('../models/Notes')
const fetchUser = require('../middleware/fetchUser')
const { set } = require('mongoose')

//Route 1 : Create a note using POST method : "/api/notes/addnote" . Login required
router.post('/addnote', fetchUser, async (req, res) => {
    //Got user id from fetchUser middleware
    const userId = req.user.id
    try {
        let note = await Notes.create({
            user: userId,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        res.json(note)
    }
    catch (error) {
        console.error(error)
    }
})

//Route 2 : Fetch notes using GET method : "/api/notes/fetchnotes". Login required
router.get('/fetchnotes', fetchUser, async (req, res) => {
    //Got user id from fetchUser middleware
    const userId = req.user.id
    try {
        let notes = await Notes.find({ user: userId })
        res.json(notes)
    }
    catch (error) {
        console.error(error)
    }
})

//Route 3 : Delete notes using DELETE method : "/api/notes/deletenotes". Login required
router.delete('/deletenotes/:id', fetchUser, async (req, res) => {
    //Got user id from fetchUser middleware
    try {
        //Check note to be deleted is available
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Note not found")
        }

        //Allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note Deleted Successfully" , note : note})
    }
    catch (error) {
        console.error(error)
    }
})

//Route 4 : Update notes using POST method : "/api/notes/updatenotes". Login required
router.post('/updatenotes/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    //Got user id from fetchUser middleware
    try {
        //Create a new note object
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }

        //Check note to be updated is available
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(401).send("Note not found")
        }

        //Allow updation only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })

        res.json("Note Updated Successfully")
    }
    catch (error) {
        console.error(error)
    }
})

module.exports = router