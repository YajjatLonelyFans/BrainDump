import Note from "../Models/Note";

export  const getAllnotes = async (req, res) => {
   try {
    const note = await Note.find();
    res.status(200).json(note)
   } catch (error) {
    console.error("Failed to get all notes",error)
    res.status(500).json({message:"Internal Server error"})
   }
};

export const getOneNote = async(req,res)=>{
    try {
        const note = await Note.findById(req.params.id)
        if(!updateNotes) return res.status(404).json({message:"Note not found"})
        res.json(note)    
    } catch (error) {
        console.error("Failed to get note",error)
        res.status(500).json({message:"Internal Server error"})
    }
}

export const postNote = async(req, res) => {
  try {
    const {title,content} = req.body
    const newNote = new Note({title , content})
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)  
  } catch (error) {
    console.error("Error while creating new Note",error)
    res.status(500).json({message:"Internal server error"})
  }
};

export const updateNotes = async (req, res) => {
    try {
     const {title , content} = req.body
     const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
     if(!updateNotes) return res.status(404).json({message:"Note not found"})
    } catch (error) {
     console.error("Error while updating node" , error)
     res.status(500).json({message:"Internal server error"})
    }
  
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)
    if(!deleteNotes) return res.status(404).json({message:"Note not found"})
  } catch (error) {
    console.error("Error while Deleting note" , error)
    res.status(500).json({message:"Internal server error"})
  }
};
