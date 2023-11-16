const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require("path")
const app = express();

const PORT = process.env.PORT||3001;
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname,"public/index.html"))

})

app.get("/notes",(req,res) => {
    console.log(`${req.method} was the received method`)
    res.sendFile(path.join(__dirname,"public/notes.html"))
    
})
app.get("/api/notes",(req,res) => {
    fs.readFile("./db/db.json","utf8",(err,data)=> {
        if(err)throw err
        res.send(data);
    })
})
app.post("/api/notes",(req,res) => {
   const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
   }
   console.log(newNote)
   fs.readFile("./db/db.json","utf8",(err,data)=>{
    if(err)throw err
    const noteData = JSON.parse(data)
    noteData.push(newNote)
    console.log(noteData)

    fs.writeFile("./db/db.json",JSON.stringify(noteData),(err,data)=>{
        if(err)throw err;
        res.json(noteData)
    })
   })
})


app.listen(PORT,() => {
    console.log(`Running on port http://localhost:3001`)
})

