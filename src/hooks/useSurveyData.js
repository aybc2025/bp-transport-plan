import { useState, useEffect } from 'react';
import useStore from '../store';
import { DATA_PATHS } from '../constants';

export default function useSurveyData() {
  const { dataCache, setDataCache } = useStore();
  const [loading, setLoading] = useState(!dataCache.surveyResults);

  useEffect(() => {
    if (dataCache.surveyResults) return;

    fetch(DATA_PATHS.surveyResults)
      .then((r) => r.json())
      .then((data) => {
        setDataCache('surveyResults', data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [dataCache.surveyResults, setDataCache]);

  return { surveyData: dataCache.surveyResults || null, loading };
}
