const Todo = require('../models/todo');


exports.getAllTodos = (req, res) => {
    Todo.getAll((err, todos) => {
        if (err) {
            return res.status(500).send('Error fetching todos');
        }
        res.render('index', { todos: todos });
    });
};

exports.addTodo = (req, res) => {
    const { title, description } = req.body;
    Todo.add(title, description, (err) => {
        if (err) {
            console.error('Error adding todo:', err);
            return res.status(500).send('Error adding todo');
        }
        res.redirect('/');
    });
};

exports.deleteTodo = (req, res) => {
    const todoId = req.params.id;
    Todo.delete(todoId, (err) => {
        if (err) {
            return res.status(500).send('Error deleting todo');
        }
        res.redirect('/');
    });
};

exports.completeTodo = (req, res) => {
    const todoId = req.params.id;
    Todo.complete(todoId, (err) => {
        if (err) {
            return res.status(500).send('Error completing todo');
        }
        res.redirect('/');
    });
};
