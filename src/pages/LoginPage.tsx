import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/admin/LoginForm';
import { Layout } from '../components/shared/Layout';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin');
  };

  return (
    <Layout>
      <div className="page-transition flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </Layout>
  );
};
