import { useState } from "react";
import api from "../../services/api.js";
import './style.css';

function RegisterForm({ closeRegister, onRegisterSuccess, onRegisterFailure }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleRegister(event) {
        event.preventDefault();
        try {
            const response = await api.post('/auth/register', { username, password });
            if (response.status === 200) {
                onRegisterSuccess(response.data.message);
            }
        } catch (err) {
            console.error("Erro no login:", err.response ? err.response.data.message : err.message);
            setError('Erro ao tentar fazer login. Verifique suas credenciais.');
            onRegisterFailure(err);
        }
    }

    return (
        <div id="registerBody">
            <div id="registerContainer">
                <p onClick={closeRegister}>X</p>
                <h1>Registrar-se</h1>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Registrar</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
