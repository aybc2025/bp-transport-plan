import { useState, useEffect } from 'react';
import useStore from '../store';
import { DATA_PATHS } from '../constants';

export default function useRouteData() {
  const { dataCache, setDataCache } = useStore();
  const [loading, setLoading] = useState(!dataCache.routes);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (dataCache.routes) return;

    fetch(DATA_PATHS.routes)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load routes: ${r.status}`);
        return r.json();
      })
      .then((data) => {
        setDataCache('routes', data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [dataCache.routes, setDataCache]);

  return { routes: dataCache.routes || null, loading, error };
}
