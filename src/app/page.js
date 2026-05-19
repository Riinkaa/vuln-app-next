"use client";

import { useState } from "react";

export default function Home() {
    const [sqliResult, setSqliResult] = useState(null);
    const [xssPayload, setXssPayload] = useState("");
    const [renderedXss, setRenderedXss] = useState("");

    const handleSqli = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const res = await fetch(`/api/sqli?username=${encodeURIComponent(username)}`);
        const data = await res.json();
        setSqliResult(data);
    };

    const handleXss = (e) => {
        e.preventDefault();
        setRenderedXss(xssPayload);
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto space-y-8 text-gray-800">
                <h1 className="text-3xl font-bold">Next.js SAST/DAST Testbed</h1>

                {/* MODUL 1: SQL Injection */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-red-600 mb-4">1. SQL Injection (SQLi)</h2>
                    <form onSubmit={handleSqli} className="flex gap-4">
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Payload: admin' OR '1'='1" 
                            className="flex-1 border border-gray-300 p-2 rounded" 
                            required 
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
                            Eksekusi API
                        </button>
                    </form>
                    
                    {sqliResult && (
                        <div className="mt-4 p-4 bg-gray-900 rounded text-green-400 overflow-x-auto">
                            <p className="text-gray-400 text-xs mb-2">Respons JSON dari Server:</p>
                            <pre className="text-sm">{JSON.stringify(sqliResult, null, 2)}</pre>
                        </div>
                    )}
                </section>

                {/* MODUL 2: Cross-Site Scripting */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-red-600 mb-4">2. DOM-based / Reflected XSS</h2>
                    <form onSubmit={handleXss} className="flex gap-4">
                        <input 
                            type="text" 
                            value={xssPayload} 
                            onChange={(e) => setXssPayload(e.target.value)} 
                            placeholder="Payload: <img src=x onerror=alert(document.cookie)>" 
                            className="flex-1 border border-gray-300 p-2 rounded" 
                            required 
                        />
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium">
                            Render HTML
                        </button>
                    </form>

                    {renderedXss && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
                            <p className="text-gray-600 font-semibold text-sm mb-2">Output DOM (Vulnerable Sink):</p>
                            {/* VULNERABLE SINK: Penggunaan dangerouslySetInnerHTML tanpa sanitasi */}
                            <div dangerouslySetInnerHTML={{ __html: renderedXss }} />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}