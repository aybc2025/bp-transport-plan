import TransitMap from '../components/map/TransitMap';
import MapControls from '../components/map/MapControls';
import MapLegend from '../components/map/MapLegend';

export default function MapView() {
  return (
    <div className="relative w-full h-full">
      <TransitMap />
      <MapControls />
      <MapLegend />
    </div>
  );
}
