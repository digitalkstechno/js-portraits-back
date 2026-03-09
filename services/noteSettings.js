import NoteSettings from "../models/noteSettings.js";

export const getNotes = async () => {
  // .findOne() use karein kyunki humein sirf ek document chahiye
  return await NoteSettings.findOne();
};

export const updateNotes = async (data) => {
  // data ek object hona chahiye { quotationNote, orderNote, billNote, updateBy }
  // {} filter matlab collection ka pehla document uthao
  // upsert: true matlab agar nahi hai toh bana do, hai toh update karo
  return await NoteSettings.findOneAndUpdate({}, data, {
    new: true,
    upsert: true,
  });
};
