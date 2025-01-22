const express = require('express')
const path = require('path'); 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Cao Dinh Bao!')
})

app.get("/about", (req, res)=>{
    res.send("<h1>Hello About Page</h1>")
})

app.get('/cv', (req, res) => {
    res.sendFile(path.join(__dirname, './public/cv.html')); // Trả về file HTML
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})