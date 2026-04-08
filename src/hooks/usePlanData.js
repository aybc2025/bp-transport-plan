import { useState, useEffect } from 'react';
import useStore from '../store';
import { DATA_PATHS } from '../constants';

export default function usePlanData() {
  const { dataCache, setDataCache } = useStore();
  const [loading, setLoading] = useState(!dataCache.planActions);

  useEffect(() => {
    if (dataCache.planActions) return;

    fetch(DATA_PATHS.planActions)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('planActions', data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataCache.planActions, setDataCache]);

  return { planActions: dataCache.planActions || null, loading };
}
