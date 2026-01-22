//===================== Imports =====================
const express = require('express');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

const DB_PATH  = path.join(__dirname, 'db.json'); //path to notes database. written like this because it is a TRUE constant

//===================== Middleware =====================
app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(express.json());


//===================== Routes =====================
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

app.get('/api/notes', (req, res) => {
    const notesData = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
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
});