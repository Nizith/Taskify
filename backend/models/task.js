const db = require('../database');

const Task = {
    createTable: function () {
        const sql = `CREATE TABLE IF NOT EXISTS task (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
            dueDate DATETIME,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log('Tasks table created or already exists');
        });
    },

    create: async function (title, description, status, dueDate) {
        const sql = `INSERT INTO task (title, description, status, dueDate) VALUES (?, ?, ?, ?)`;
        const [result] = await db.promise().query(sql, [title, description, status || 'pending', dueDate]);
        return result.insertId;
    },

    getAll: async function () {
        const [tasks] = await db.promise().query('SELECT * FROM task');
        return tasks;
    },

    getById: async function (id) {
        const [task] = await db.promise().query('SELECT * FROM task WHERE id = ?', [id]);
        return task.length > 0 ? task[0] : null;
    },

    update: async function (id, title, description, status, dueDate) {
        const sql = `UPDATE task SET title = ?, description = ?, status = ?, dueDate = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
        const [result] = await db.promise().query(sql, [title, description, status, dueDate, id]);
        return result.affectedRows;
    },

    delete: async function (id) {
        const [result] = await db.promise().query('DELETE FROM task WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = Task;
