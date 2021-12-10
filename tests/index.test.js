const request = require('supertest')
const app = require('../app');
const Todo = require('../models/Todo');
const mongoose = require('./databaseConfig.js');

jest.setTimeout(10000);

describe('API', function () {
    beforeAll(async() => {      
        mongoose.connect();
        await Todo.deleteMany()
    });
    afterAll((done) => {
        mongoose.disconnect(done);
    });
    test('It should return the list of todos', async () => {
        const response = await request(app).get('/api/todos');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
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
        const todo = await Todo.create({ title: 'todo' });
        const updatedTodo = {title: 'test'}
        const response = await request(app).put(`/api/todos/${todo._id}`).send(updatedTodo);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe('test');   
    });
    test('It should return the count of deleted todos', async () => {      
        const todo = await Todo.create({ title: 'first', completed: true });
        const todo1 = await Todo.create({ title: 'second', completed: true });
        const response = await request(app).delete(`/api/todos`);

        expect(response.statusCode).toBe(200);
        expect(response.body.deletedCount).toBe(2);
    });
    test('It should return the title of updated todo', async () => {
        const todo = await Todo.create({ title: 'todo' });
        const completed = {completed: true}

        const response = await request(app).put(`/api/todos`).send(completed);
        
        expect(response.statusCode).toBe(200);
        expect(response.body.modifiedCount).toBe(3);   
    });
});
