import { useMemo } from 'react';
import useStore from '../store';
import { searchItems } from '../utils/search';
import { NEIGHBOURHOODS } from '../constants';

export default function useSearch(query) {
  const { dataCache } = useStore();
  const surveyData = dataCache.surveyResults;

  const results = useMemo(() => {
    if (!query || query.length < 1) return { routes: [], stops: [], areas: [] };

    // Search route proposals
    const routeResults = surveyData
      ? searchItems(surveyData.proposals, query, [
          { key: 'label', weight: 3 },
        ])
      : [];

    // Search stops
    const stopsData = dataCache.stops;
    let stopResults = [];
    if (stopsData && query.length >= 2) {
      stopResults = searchItems(
        stopsData.features.map((f) => f.properties),
        query,
        [
          { key: 'name', weight: 2 },
          { key: 'code', weight: 1 },
        ]
      ).slice(0, 10);
    }

    // Search neighbourhoods
    const areaResults = searchItems(NEIGHBOURHOODS, query, [
      { key: 'name', weight: 2 },
    ]);

    return {
      routes: routeResults.slice(0, 10),
      stops: stopResults,
      areas: areaResults.slice(0, 5),
    };
  }, [query, surveyData, dataCache.stops]);

  return results;
}
