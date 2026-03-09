import { updateNotes, getNotes } from "../services/noteSettings.js";

export const saveSettings = async (req, res) => {
  try {
    const updated = await updateNotes(req.body);
    res.status(200).json({ message: "Settings saved successfully", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSettings = async (req, res) => {
  try {
    const settings = await getNotes();
    // Frontend res[0] expect kar raha hai toh array mein bhej sakte hain
    res.status(200).json(settings ? [settings] : []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
