const fs= require('fs');
const { v4: uuidv4 } = require('uuid');

const express = require('express');
const path = require('path');



const app = express();
const PORT = process.env.PORT||3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
let getNotes= require('./db/db.json')
app.get('/api/notes', (req, res) => {
    // const getNotes= require('./db/db.json')
    res.json(getNotes)
});
app.post('/api/notes', (req, res) => {
    // const getNotes= require('./db/db.json')
    const newNote= req.body
    newNote.id= uuidv4();
    getNotes.push(newNote)
    fs.writeFile("./db/db.json", JSON.stringify(getNotes)
    ,function(err){
        if (err) throw err
        res.json(getNotes)
    })
   
});


app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    // const getNotes= require('./db/db.json')
    const array = getNotes.filter(note => note.id !== id);
    getNotes = array
    fs.writeFile("./db/db.json", JSON.stringify(array)
    ,function(err){
        if (err) throw err
        res.json(array)
    })
 
});


app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));


