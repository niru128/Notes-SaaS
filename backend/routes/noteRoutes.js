import express from "express"
import auth from "../middleware/auth.js"
import roleAuthorize from "../middleware/role.js"
import { createNote, getNotes, getNotesById, updateNote, deleteNote } from "../controllers/notesController.js"


const router = express.Router()

router.post("/",auth, roleAuthorize(['Member','Admin']), createNote);
router.get("/",auth, roleAuthorize(['Member','Admin']), getNotes);  
router.get("/:id",auth, roleAuthorize(['Member','Admin']), getNotesById);
router.put("/:id",auth, roleAuthorize(['Member','Admin']), updateNote);
router.delete("/:id",auth, roleAuthorize(['Member','Admin']), deleteNote);


export default router;