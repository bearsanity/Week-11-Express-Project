//===================== Imports =====================
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();


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