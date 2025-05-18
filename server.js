import mysql from 'mysql'
import cors from 'cors'
import express from 'express'

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    database: 'examination',
    password: '',
});

db.connect((error) => {
    if (error) {
        console.log('Database connection failed');
    } else {
        console.log('Database connected');
    }
});

// Insert into books
app.post('/insert', (req, res) => {
    const { title, publisher_id, supplier_id } = req.body;
    const sql = "INSERT INTO books (title, publisher_id, supplier_id) VALUES (?, ?, ?)";
    db.query(sql, [title, publisher_id, supplier_id], (error, result) => {
        if (error) return res.status(500).json('Insert failed');
        return res.status(200).json(result);
    });
});

// Insert into borrows
app.post('/insertborrows', (req, res) => {
    const { book_id, member_id, borrow_date, return_date } = req.body;
    const sql = "INSERT INTO borrows (book_id, member_id, borrow_date, return_date) VALUES (?, ?, ?, ?)";
    db.query(sql, [book_id, member_id, borrow_date, return_date], (error, result) => {
        if (error) return res.status(500).json('Insert failed');
        return res.status(200).json(result);
    });
});

// Select all borrows
app.get('/selectborrows', (req, res) => {
    const sql = "SELECT * FROM borrows";
    db.query(sql, (error, result) => {
        if (error) return res.status(500).json('Select failed');
        return res.status(200).json(result);
    });
});

// Delete borrow
app.delete('/deleteborrows/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM borrows WHERE id = ?";
    db.query(sql, [id], (error, result) => {
        if (error) return res.status(500).json('Delete failed');
        return res.status(200).json(result);
    });
});

// Update borrow
app.put('/updateborrow/:id', (req, res) => {
    const { id } = req.params;
    const { book_id, member_id, borrow_date, return_date } = req.body;
    const sql = "UPDATE borrows SET book_id = ?, member_id = ?, borrow_date = ?, return_date = ? WHERE id = ?";
    db.query(sql, [book_id, member_id, borrow_date, return_date, id], (error, result) => {
        if (error) return res.status(500).json('Update failed');
        return res.status(200).json(result);
    });
});

// Select all books
app.get('/select', (req, res) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (error, result) => {
        if (error) return res.status(500).json('Select failed');
        return res.status(200).json(result);
    });
});

// Select book by ID
app.get('/select/:book_id', (req, res) => {
    const { book_id } = req.params;
    const sql = "SELECT * FROM books WHERE book_id = ?";
    db.query(sql, [book_id], (error, result) => {
        if (error) return res.status(500).json('Select failed');
        return res.status(200).json(result[0]);
    });
});

// Delete book
app.delete('/delete/:book_id', (req, res) => {
    const { book_id } = req.params;
    const sql = "DELETE FROM books WHERE book_id = ?";
    db.query(sql, [book_id], (error, result) => {
        if (error) return res.status(500).json('Delete failed');
        return res.status(200).json(result);
    });
});

// Update book
app.put('/update/:book_id', (req, res) => {
    const { book_id } = req.params;
    const { title, publisher_id, supplier_id } = req.body;
    const sql = "UPDATE books SET title = ?, publisher_id = ?, supplier_id = ? WHERE book_id = ?";
    db.query(sql, [title, publisher_id, supplier_id, book_id], (error, result) => {
        if (error) return res.status(500).json('Update failed');
        return res.status(200).json(result);
    });
});

// Start server
app.listen(2000, () => {
    console.log('Server is running on http://localhost:2000');
});
