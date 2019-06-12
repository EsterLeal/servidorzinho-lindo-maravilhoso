const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./ComidasController')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())

servidor.get('/comidas', async (request, response) => {
  controller.getAll()
  .then(comidas => response.send(comidas))
  response.send(controller.getAll())
})

servidor.get('/comidas/:id', async (request, response) => {
  // const id = request.params.id
  // response.send(controller.getById(id))
  const id = request.params.id
  controller.getById(id)
    .then(comida => response.send(comida))
})

servidor.post('/comidas', (request, response) => {
  const novaComida = controller.add(request.body)
  response.status(200).send(novaComida)
})

// servidor.patch('/comidas/:id' , (request, response) =>{
//   const id = resquest.params.id
//   controller.update(id, request.body)
//   response.sendStatus(204)
// })

servidor.patch('/comidas/:id', (request, response) => {
  const id = request.params.id
  const sucesso = controller.update(id, request.body)
  if(sucesso){
    response.sendStatus(204)
  } else {
    response.sendStatus(404)
  }
})

servidor.delete('/comidas/:id', (request, response) => {
  controller.remove(request.params.id)
  response.sendStatus(204)
})

servidor.listen(3000)
console.log("servidorzinho rodando na porta 3000")
