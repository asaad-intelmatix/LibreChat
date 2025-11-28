import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostAuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to welcome page after authentication
    navigate('/welcome', { replace: true });
  }, [navigate]);

  return null;
}
