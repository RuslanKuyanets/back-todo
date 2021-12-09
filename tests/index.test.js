const request = require('supertest')
const app = require('../app');
const Todo = require('../models/Todo');
const mongoose = require('./databaseConfig.js');

jest.setTimeout(10000);

describe('API', function () {
    beforeAll(() => {
        mongoose.connect();
    });
    afterAll((done) => {
        mongoose.disconnect(done);
    });
    test('It should return the list of todos', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(2);
    });
    test('It should return the title of new todo', async () => {
        const newTodo = {'title': 'newTodo'}
        const response = await request(app).post('/api/todos').send(newTodo);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('newTodo');
    });
    test('It should return the title of deleted todo', async () => {      
        const todo = await Todo.create({ title: 'todo' });
        const response = await request(app).delete(`/api/todos/${todo._id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('todo');
    });
    test('It should return the title of updated todo', async () => {
        const todo = {
            "_id": "61b1e9cccca8833a75200a7b",
            "title": "workandtravel",
            "completed": true,
            "__v": 0
        }
        const response = await request(app).put('/api/todos').send(todo);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('workandtravel');
        
    });
});

it('Testing to see if Jest works', () => {
    expect(1).toBe(1)
})