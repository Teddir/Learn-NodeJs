let express = require('express')
let app = express()
let cors = require('cors')
let port = process.env.PORT || 8080

const {
  seeTodoAll,
  addTodo,
  renameTodo,
  deleteTodo,
  seeDataTodo,
  addDataTodo,
  renameDataTodo,
  deleteDataTodo
} = require('./function')
app.use(express.json())
app.use(cors())

app.get('/', (_, res) => {
  res.send("Hello NodeJs")
})

// see all file
app.get('/todo', (_, res) => {
  res.send(seeTodoAll())
})

// create file
app.post('/addTodo', (req, res) => {
  res.send(addTodo(req.body.name_file))
})

// rename file
app.put('/renameTodo', (req, res) => {
  res.send(renameTodo(req.body.name_old, req.body.name_new))
})

// delete file
app.delete('/deleteTodo', (req, res) => {
  res.send(deleteTodo(req.body.name_file,))
})

// see data on file 
app.get('/todo/see/:name_file', (req, res) => {
  res.send(seeDataTodo(req.params.name_file))
})

// add data on file 
app.post('/todo/add/:name_file', (req, res) => {
  res.send(addDataTodo(
    req.params.name_file,
    req.body.judul,
    req.body.category,
    req.body.date,
    req.body.note,
    req.body.template,
    req.body.status
  ))
})

// rename data on file
app.put('/todo/rename/:name_file/:id', (req, res) => {
  res.send(renameDataTodo(
    req.params.name_file,
    req.params.id,
    req.body.judul,
    req.body.category,
    req.body.date,
    req.body.note,
    req.body.template,
    req.body.status
  ))
})

// delete data on file
app.delete('/todo/delete/:name_file/:id', (req, res) => {
  res.send(deleteDataTodo(
    req.params.name_file,
    req.params.id,
  ))
})


app.listen(port, () => {
  console.log(`Hello Teddi Welcome to NodeJs API at http://localhost:${port}`)
})
