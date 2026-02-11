import React from 'react';

const StatCard = ({ icon, label, value, color }) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            transition: 'transform 0.2s',
            cursor: 'pointer'
        }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                color: color,
                marginBottom: '12px',
                opacity: 0.8
            }}>
                {icon}
            </div>
            <div style={{
                color: 'white',
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '8px',
                lineHeight: 1
            }}>
                {value}
            </div>
            <div style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '13px',
                fontWeight: '500'
            }}>
                {label}
            </div>
        </div>
    );
};

export default StatCard;