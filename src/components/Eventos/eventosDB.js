// componentes/Eventos/eventosDB.js
import { db } from "../../js/indexeddb";

// Função que aguarda até que a BD esteja inicializada
const ensureDB = () => {
    return new Promise((resolve) => {
        if (db.db) {
            resolve();
            return;
        }
        const interval = setInterval(() => {
            if (db.db) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
};

export async function carregarListaEventos() {
    await ensureDB();
    try {
        const eventos = await db.obterTodosEventos();
        return eventos;
    } catch (erro) {
        return [];
    }
}

export async function adicionarEvento(dados) {
    await ensureDB();
    return await db.adicionarEvento(dados);
}

export async function atualizarEvento(dados) {
    await ensureDB();
    return await db.atualizarEvento(dados);
}

export async function removerEvento(id) {
    await ensureDB();
    return await db.removerEvento(id);
}

export async function obterEvento(id) {
    await ensureDB();
    return await db.obterEvento(id);
}