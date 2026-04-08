import { useState, useEffect } from 'react';
import useStore from '../store';
import { DATA_PATHS } from '../constants';

export default function useStops() {
  const { dataCache, setDataCache } = useStore();
  const [loading, setLoading] = useState(!dataCache.stops);

  useEffect(() => {
    if (dataCache.stops) return;

    Promise.all([
      fetch(DATA_PATHS.stops).then((r) => r.json()),
      fetch(DATA_PATHS.stations).then((r) => r.json()),
    ])
      .then(([stops, stations]) => {
        setDataCache('stops', stops);
        setDataCache('stations', stations);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataCache.stops, setDataCache]);

  return {
    stops: dataCache.stops || null,
    stations: dataCache.stations || null,
    loading,
  };
}
