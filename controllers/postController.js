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
            return res.json(todos)
        } catch (e) {
            res.status(400).json(e)
        }
    }
    async updateTask(req, res) {
        try {
            const todo = req.body
            if (!todo._id) {
                res.status(400).json({message: 'Not ID'})
            }
            const updatedTodo = await Todo.findByIdAndUpdate(todo._id, todo)
            return res.json(updatedTodo)
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
            return res.json(todo)
        } catch (e) {
            res.status(400).json(e)
        }
    }  
}

module.exports = new TodoController