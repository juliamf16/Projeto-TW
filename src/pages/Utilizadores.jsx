import "./styles.css";

import mediaLogo from "../components/Header/media/logo.png"
import Footer from "../components/Footer";

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Utilizadores() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const { user, getAllUsers, updateUser, deleteUser } = useAuth();

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
            alert('Erro ao carregar utilizadores');
        }
    };

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleEdit = (user) => {
        setEditingUser({ ...user, id: user._id || user.id });
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(editingUser.id, {
                nome: editingUser.nome,
                email: editingUser.email,
                role: editingUser.role
            });
            alert('Utilizador atualizado');
            setEditingUser(null);
            loadUsers();
        } catch (err) {
            alert('Erro ao atualizar');
        }
    };

    const handleDelete = async (id, nome) => {
        if (window.confirm(`Tem certeza que deseja remover o utilizador "${nome}"?`)) {
            try {
                await deleteUser(id);
                alert('Utilizador removido');
                loadUsers();
            } catch (err) {
                alert('Erro ao remover');
            }
        }
    };

    const handleChange = (e) => {
        setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    };

    return (
        <>

            <header className="login-header">
                <div className="logo">
                    <Link to="/"><img src={mediaLogo} alt="Centro Académico Clínico dos Açores" /></Link>
                </div>
            </header>

            <div className="utilizadores-page">
                <div className="utilizadores-box">
                    <h2>Gestão de Utilizadores</h2>
                    <div className="welcome-message">
                        Bem-vindo, {user?.nome} (Administrador)
                    </div>

                    {editingUser ? (
                        <div className="edit-modal">
                            <h3>Editar Utilizador</h3>
                            <form onSubmit={handleSaveEdit}>
                                <input name="nome" value={editingUser.nome} onChange={handleChange} placeholder="Nome" required />
                                <input name="email" value={editingUser.email} onChange={handleChange} placeholder="Email" required />
                                <select name="role" value={editingUser.role} onChange={handleChange}>
                                    <option value="user">Utilizador normal</option>
                                    <option value="admin">Administrador</option>
                                </select>
                                <div className="edit-buttons">
                                    <button type="submit">Guardar</button>
                                    <button type="button" onClick={() => setEditingUser(null)}>Cancelar</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <>
                            <p><strong>Lista de todos os utilizadores registados:</strong></p>
                            {users.length === 0 ? (
                                <p>Nenhum utilizador encontrado.</p>
                            ) : (
                                <ul>
                                    {users.map(u => (
                                        <li key={u.id}>
                                            <strong>{u.nome}</strong> – {u.email} {u.role === 'admin' && <span>(Admin)</span>}
                                            <div className="admin-actions">
                                                <button onClick={() => handleEdit(u)} className="btn-editar-user">Editar</button>
                                                <button onClick={() => handleDelete(u.id, u.nome)} className="btn-remover-user">Remover</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}