const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todo.db');


exports.getAll = (callback) => {
    db.all('SELECT * FROM todos', [], (err, rows) => {
        callback(err, rows);
    });
};

exports.add = (title, description, callback) => {
    db.run(`INSERT INTO todos (title, description, isComplete) VALUES (?, ?, ?)`,
        [title, description, 0],
        function (err) {
            callback(err);
        });
};

exports.delete = (id, callback) => {
    db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
        callback(err);
    });
};

exports.complete = (id, callback) => {
    db.run('UPDATE todos SET isComplete = 1 WHERE id = ?', [id], function (err) {
        callback(err);
    });
};
