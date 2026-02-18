import React from 'react';
import { Dumbbell, User } from 'lucide-react';
import './LoginScreen.css';

const LoginScreen = ({ onLogin, users }) => {
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="trainsync-header">
                    <Dumbbell size={48} className="trainsync-logo" />
                    <h1 className="trainsync-title">TrainSync</h1>
                    <p className="trainsync-subtitle">
                        Gestión integral para entrenadores
                    </p>
                </div>

                <div className="user-selection">
                    <p className="user-selection-label">
                        Selecciona un usuario para demo:
                    </p>
                    {users.map(user => (
                        <button
                            key={user.id}
                            onClick={() => onLogin(user.id)}
                            className={`user-button ${user.role === 'trainer' ? 'trainer-gradient' : 'client-gradient'}`}
                        >
                            <User size={20} />
                            <div>
                                <div>{user.name}</div>
                                <div className="user-info">
                                    {user.role === 'trainer' ? '🎯 Entrenador' : '💪 Cliente'}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
