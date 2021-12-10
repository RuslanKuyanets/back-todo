const Todo = require('../models/Todo.js')

class TodoController {
    async createTask(req, res) {
        try {
            const {title, completed} = req.body
            const todo = await Todo.create({title, completed})
            res.status(200).json(todo)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async getTasks(req, res) {
        try {
            const todos = await Todo.find()
            res.json(todos)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async updateTask(req, res) {
        try {
            const {id} = req.params
            const todo = req.body
            if (!id) {
                res.status(400).json({message: 'Not ID'})
            }
            const updatedTodo = await Todo.findByIdAndUpdate(id, todo, {new: true})
            res.json(updatedTodo)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async deleteTask(req, res) {
        try {
            const {id} = req.params
            if (!id) {
                res.status(400).json({message: 'Not ID'})
            }
            const todo = await Todo.findByIdAndDelete(id)
            res.json(todo)
        } catch (e) {
            res.status(400).json(e)
        }
    }  
    async toggleCompletedAll(req, res) {
        try {
            const updatedTodos = await Todo.updateMany({completed: req.body.completed})
            res.json(updatedTodos)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async deleteCompletedTasks(req, res) {
        try {
            const todos = await Todo.deleteMany({completed: 'true'})
            res.json(todos)
        } catch (e) {
            res.status(400).json(e)
        }
    }  
}

module.exports = new TodoController