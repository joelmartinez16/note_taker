const fs= require('fs');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const path = require('path');



const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.get('/api/notes', (req, res) => {
    const getNotes= require('./db/db.json')
    res.json(getNotes)
});
app.post('/api/notes', (req, res) => {
    const getNotes= require('./db/db.json')
    const newNote= req.body
    newNote.id= uuidv4();
    getNotes.push(newNote)
    fs.writeFile("./db/db.json", JSON.stringify(getNotes)
    ,function(err){
        if (err) throw err
        res.json(getNotes)
    })
   
});


app.delete('/api/notes', (req, res) => {
 
 
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
