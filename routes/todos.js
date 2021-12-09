const {Router, request, response} = require('express')
const TodoController = require("../controllers/postController.js")

const router = Router()

router.post('/todos', TodoController.createTask)
router.get('/todos', TodoController.getTasks)
router.put('/todos', TodoController.updateTask)
router.delete('/todos/:id', TodoController.deleteTask)

module.exports = router