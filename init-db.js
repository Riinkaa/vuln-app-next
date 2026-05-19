const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
    db.run("INSERT INTO users (name, email) VALUES ('admin', 'admin@local.system')");
    db.run("INSERT INTO users (name, email) VALUES ('target_user', 'target@local.system')");
});

db.close();
console.log("Database SQLite berhasil diinisialisasi.");