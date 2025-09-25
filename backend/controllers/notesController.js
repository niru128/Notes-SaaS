import mongoose from "mongoose";
import Note from "../models/Note.js";
import Tenant from "../models/Tenant.js";

export const createNote = async (req, res) => {

    const { title, content } = req.body;
    const tenantData = await Tenant.findOne({name :req.user.tenant});


    if (!tenantData) {
        return res.status(400).json({ msg: "Invalid tenant" });
    }

    try {

        if (tenantData.plan === "Free") {
            const noteCount = await Note.countDocuments({ tenant: tenantData.name });
            if (noteCount >= 3) {
                return res.status(403).json({ msg: "Free plan limit reached. Upgrade to Pro." });
            }
        }


        const note = new Note({
            title,
            content,
            tenant: tenantData.name,
            user: req.user.id,
        });

        note.save();

        res.json(note);

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
        console.log(err);
    }
}

export const getNotes = async (req, res) => {

    try {

        const notes = await Note.find({ tenant: req.user.tenant })
    .populate('tenant', 'name')
    .populate('user', 'email')
    .sort({ createdAt: -1 });

        res.json(notes)

    } catch (err) {
        res.status(500).json({ msg: "Server error" });
        console.log(err);
    }
}

export const getNotesById = async (req, res) => {
    try {

        const note = await Note.findOne({ _id: req.params.id, tenant: req.user.tenant });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        res.json(note);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
        console.log(err);
    }
}

export const updateNote = async (req, res) => {
    try {

        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, tenant: req.user.tenant },
            req.body,
            { new: true }
        )

        res.json(note);

    } catch (error) {
        res.status(500).json({ msg: "Server error" });
        console.log(error);
    }
}

export const deleteNote = async (req, res) => {
    try {

        const note = await Note.findOneAndDelete({ _id: req.params.id, tenant: req.user.tenant });
        if (!note) {
            return res.status(404).json({ msg: "Note not found" });
        }

        res.json({ msg: "Note deleted successfully" });



    } catch (err) {
        res.status(500).json({ msg: "Server error" });
        console.log(err);
    }
}   