//===================== Imports & Constants =====================
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

const DB_PATH  = path.join(__dirname, 'db/db.json'); //path to notes database. written like this because it is a TRUE constant
const PORT = process.env.PORT || 3001;

//===================== Middleware =====================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


//===================== Routes =====================
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notesData = fs.readFileSync(DB_PATH, 'utf8');
    const notesDataParsed = JSON.parse(notesData);
    res.json(notesDataParsed);
});

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const newNote = req.body;
    newNote.id = crypto.randomUUID();
    const notesArray = fs.readFileSync(DB_PATH, 'utf8');
    const notesArrayParsed = JSON.parse(notesArray);
    notesArrayParsed.push(newNote);
    const newArray = JSON.stringify(notesArrayParsed);
    fs.writeFileSync(DB_PATH, newArray);
    res.send(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
    const noteId = req.params.id;
    const notesArray = fs.readFileSync(DB_PATH, 'utf8');
    const notesArrayParsed = JSON.parse(notesArray);
    const filteredNotes = notesArrayParsed.filter(note => noteId !== note.id);
    const newArray = JSON.stringify(filteredNotes);
    fs.writeFileSync(DB_PATH, newArray);
    res.send('Note Deleted!');
});

//Catch all route at the end so it doesn't overwrite the others
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});