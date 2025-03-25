import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login';
import api from "../../services/api.js";
import './style.css';
import RegisterForm from "../../components/Register/index.jsx";

function Index() {
    const navigate = useNavigate();
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);

    async function checkAuth() {
        try {
            const response = await api.get('/auth/isAuthenticated');
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
        }
    }

    useEffect(() => {
        const fetchAuth = async () => {
            await checkAuth();
        };

        fetchAuth();


        return () => {
            document.body.style.backgroundImage = "";
        };
    }, [navigate]);


    const handleRegisterBtn = (e) => {
        e.preventDefault();
        setIsRegisterVisible(true);
    };

    const closeRegister = () => {
        console.log(isRegisterVisible);
        setIsRegisterVisible(false);
    };

    const handleLoginSuccess = (message) => {
        console.log(message);
        checkAuth();
    };

    const handleLoginFailure = (error) => {
        console.error('Erro no login:', error);
    };

    const handleRegisterSuccess = (message) => {
        console.log(message);
    };

    const handleRegisterFailure = (error) => {
        console.error('Erro no login:', error);
    };

    return (
        <div id={'loginBody'}>
            <div id="loginArea">
                <div className="logo">
                    <h1>M&S</h1>
                    <p>Bebidas</p>
                </div>
                <LoginForm onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure}/>
                <p id={'registerBtn'}
                    onClick={e => handleRegisterBtn(e)}
                >Adicionar novo usuário</p>
            </div>
            {isRegisterVisible && <RegisterForm closeRegister={closeRegister} onRegisterSuccess={handleRegisterSuccess} onRegisterFailure={handleRegisterFailure}/>}
        </div>
    );
}

export default Index;
