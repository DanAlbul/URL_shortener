import { useState, useCallback } from 'react';

export const useHttp = () => {
  const DEFAULT_HEADERS = {
    headers: { 'Content-Type': 'application/json' },
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers = DEFAULT_HEADERS.headers;
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          throw new Error(data.message || 'Something went wrong...');
        }
        setLoading(false);

        return data;
      } catch (err) {
        setLoading(false);
        console.log('err.message', err.message);
        setError(err.message);
        throw err;
      }
    },
    [error]
  );

  const clearError = () => setError(null);
  return { loading, request, error, clearError };
};
