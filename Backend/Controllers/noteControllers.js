export const getAllnotes = (req, res) => {
  res.status(200).json({ message: "You got 20 notes" });
};

export const postNote = (req, res) => {
  res.status(201).json({ message: "Note posted successfully" });
};

export const updateNotes = (req, res) => {
  res.status(200).json({ message: "Note updated successfully" });
};

export const deleteNotes = (req, res) => {
  res.status(200).json({ message: "Note deleted successfully" });
};
