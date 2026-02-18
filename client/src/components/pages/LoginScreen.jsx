import React from 'react';
import { Dumbbell, User } from 'lucide-react';

const LoginScreen = ({ onLogin, users }) => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '48px',
                maxWidth: '440px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <Dumbbell size={48} style={{ color: '#00d4ff', marginBottom: '16px' }} />
                    <h1 style={{
                        fontSize: '36px',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #00d4ff 0%, #7b2ff7 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '8px',
                        letterSpacing: '-0.02em'
                    }}>TrainSync</h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '14px' }}>
                        Gestión integral para entrenadores
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '12px', marginBottom: '8px' }}>
                        Selecciona un usuario para demo:
                    </p>
                    {users.map(user => (
                        <button
                            key={user.id}
                            onClick={() => onLogin(user.id)}
                            style={{
                                background: user.role === 'trainer'
                                    ? 'linear-gradient(135deg, #7b2ff7 0%, #b24bf3 100%)'
                                    : 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '16px 24px',
                                color: 'white',
                                fontSize: '15px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(123, 47, 247, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <User size={20} />
                            <div>
                                <div>{user.name}</div>
                                <div style={{ fontSize: '12px', opacity: 0.8 }}>
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