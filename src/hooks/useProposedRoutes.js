import { useState, useEffect } from 'react';
import useStore from '../store';
import { DATA_PATHS } from '../constants';

export default function useProposedRoutes() {
  const { dataCache, setDataCache } = useStore();
  const [loading, setLoading] = useState(!dataCache.proposedRoutes);

  useEffect(() => {
    if (dataCache.proposedRoutes) return;

    fetch(DATA_PATHS.proposedRoutes)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('proposedRoutes', data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataCache.proposedRoutes, setDataCache]);

  return { proposedRoutes: dataCache.proposedRoutes || null, loading };
}
