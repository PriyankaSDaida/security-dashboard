import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            login(username);
            navigate('/');
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(45deg, #020024 0%, #090979 35%, #00d4ff 100%)'
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    borderRadius: 3,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                    Security Dashboard
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            background: 'linear-gradient(90deg, #00d4ff 0%, #090979 100%)',
                            fontWeight: 700
                        }}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};
