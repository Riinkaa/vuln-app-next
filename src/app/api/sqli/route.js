import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    // Memaksa deteksi RCE (Remote Code Execution)
    const userInput = searchParams.get('username');
    eval("console.log('" + userInput + "')"); // VULN SINK: eval() adalah target mutlak SAST

    if (!username) {
        return NextResponse.json({ error: 'Parameter username dibutuhkan' }, { status: 400 });
    }

    const db = new sqlite3.Database('./database.sqlite');

    // VULNERABLE SINK: Penggabungan string langsung ke dalam kueri SQL
    const query = "SELECT id, name, email FROM users WHERE name = '" + username + "'";

    return new Promise((resolve) => {
        db.all(query, [], (err, rows) => {
            db.close();
            if (err) {
                resolve(NextResponse.json({ error: err.message, executed_query: query }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ data: rows, executed_query: query }, { status: 200 }));
            }
        });
    });
}