import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  });

  return (
    <div>
      <div>
        <h2>Page not Found</h2>
        <br />
        <h5> Error Code: 404</h5>
      </div>
    </div>
  );
};
