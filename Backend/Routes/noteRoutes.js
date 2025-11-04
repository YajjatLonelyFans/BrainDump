import express from "express";
import {getAllnotes, postNote, updateNotes, deleteNotes , getOneNote} from '../Controllers/noteControllers.js';


const router = express.Router();

router.get("/" , getAllnotes)
router.get("/:id" , getOneNote)
router.post("/" , postNote)
router.put("/:id" , updateNotes)
router.delete("/:id" , deleteNotes)

export default router;