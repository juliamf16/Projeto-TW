import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Perfil() {
  const { user, updateProfile } = useAuth();
  const [nome, setNome] = useState(user?.nome || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    if (nome !== user.nome) data.nome = nome;
    if (email !== user.email) data.email = email;
    if (password) data.password = password;
    await updateProfile(data);
    alert('Perfil atualizado');
  };

  return (
    <div style={{ maxWidth: 500, margin: '100px auto' }}>
      <h2>Meu Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" /><br />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Nova password (deixar vazio para manter)" /><br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}