const {Router, request, response} = require('express')
const TodoController = require("../controllers/postController.js")

const router = Router()

router.post('/todos', TodoController.createTask)
router.get('/todos', TodoController.getTasks)
router.put('/todos/:id', TodoController.updateTask)
router.delete('/todos/:id', TodoController.deleteTask)
router.put('/todos', TodoController.toggleCompletedAll)
router.delete('/todos', TodoController.deleteCompletedTasks)

module.exports = router