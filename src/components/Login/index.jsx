import { useState } from 'react';
import api from "../../services/api.js";
import './style.css';

function LoginForm({ onLoginSuccess, onLoginFailure }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            if (response.status === 200) {
                onLoginSuccess(response.data.message);
            }
        } catch (err) {
            console.error("Erro no login:", err.response ? err.response.data.message : err.message);
            setError('Erro ao tentar fazer login. Verifique suas credenciais.');
            onLoginFailure(err);
        }
    }

    return (
        <div id={'loginContainer'}>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>

    );
}

export default LoginForm;