// Fichier : src/hooks/useApi.js
// Rôle : Hook facilitant l'usage de l'API

import { useState } from 'react';
import { apiCall } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, endpoint, body = null) => {
    setLoading(true);
    setError(null);
    try {
      const options = { method };
      if (body) options.body = JSON.stringify(body);
      const data = await apiCall(endpoint, options);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    get: (endpoint) => request('GET', endpoint),
    post: (endpoint, body) => request('POST', endpoint, body),
    put: (endpoint, body) => request('PUT', endpoint, body),
    del: (endpoint) => request('DELETE', endpoint),
  };
};
