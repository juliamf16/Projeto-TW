import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function Utilizadores() {
    const [users, setUsers] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        axios.get('/api/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Lista de Utilizadores (protegida)</h2>
            <p>Bem-vindo, {user?.nome}!</p>
            <ul>
                {users.map(u => <li key={u.id}>{u.nome} ({u.email})</li>)}
            </ul>
        </div>
    );
}