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
  // response.send(controller.getAll())
})

servidor.get('/comidas/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(comida => {
      if(!comida){ // comida === null || comida === undefined
        response.sendStatus(404) // comida nao encontrada
      } else {
        response.send(comida)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400) // bad request - tem algum parametro errado
      } else {
        response.sendStatus(500) // deu ruim, e nao sabemos oq foi
      }
    })
})


servidor.post('/comidas', (request, response) => {
  const novaComida = controller.add(request.body)
  response.status(200).send(novaComida)
})

servidor.patch('/comidas/:id', async (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
  .then(response.sendStatus(204))
})

servidor.delete('/comidas/:id', async (request, response) => {
  controller.remove(request.params.id)
    .then(comida => response.sendStatus(204))
})

servidor.listen(3000)
console.log("servidorzinho rodando na porta 3000")
