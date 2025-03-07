const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const todoController = require('./controllers/todoController');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./todo.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the todo database.');
    }
});

db.run("DROP TABLE IF EXISTS todos;")
db.run("CREATE TABLE todos (id INTEGER PRIMARY KEY, title TEXT, description TEXT, isComplete INTEGER DEFAULT 0)", (err) => {
    if (err) {
        console.log('Error creating table:', err.message);
    } else {
        console.log('Table created or already exists');
    }
});

app.get('/', todoController.getAllTodos);
app.post('/add', todoController.addTodo);
app.post('/delete/:id', todoController.deleteTodo);
app.post('/complete/:id', todoController.completeTodo);

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
