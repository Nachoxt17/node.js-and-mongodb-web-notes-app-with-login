const express = require("express");
const router = express.Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const { isValidated } = require("../helpers/authentication.js");

// +-New Note:_
router.get(
  "/notes/add",
  isValidated,
  renderNoteForm
); /**+-Para agregar Notas.*/

router.post("/notes/new-note", createNewNote);

// +-Get All Notes:_
router.get("/notes", isValidated, renderNotes);

// +-Edit Notes:_
router.get("/notes/edit/:id", isValidated, renderEditForm);

router.put("/notes/edit/:id", isValidated, updateNote);

// +-Delete Notes:_
router.delete("/notes/delete/:id", isValidated, deleteNote);

module.exports = router;
