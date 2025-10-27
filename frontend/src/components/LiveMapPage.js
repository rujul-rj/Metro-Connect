// frontend/src/components/LiveMapPage.js

import React, { useRef } from 'react'; // Simplified imports
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LiveMapPage.css'; // Simple CSS for styling
import metroData from '../data/metroGeoData.json';
import L from 'leaflet';

const LiveMapPage = () => {
  const mapCenter = [12.9716, 77.5946];
  const geoJsonLayerRef = useRef(null);

  // Styling function - keeps line colors, makes all station dots orange
  const styleGeoJSON = (feature) => {
    // Style Lines
    if (feature.geometry.type === 'LineString') {
      let color = '#555';
      const lineDesc = feature.properties.description?.toLowerCase();
      if (lineDesc === 'purple') color = 'var(--color-purple, #6a0dad)';
      if (lineDesc === 'green') color = 'var(--color-green, #008000)';
      if (lineDesc === 'yellow') color = 'var(--color-secondary, #f59e0b)';
      if (lineDesc === 'pink') color = '#ec4899';
      if (lineDesc === 'blue') color = 'var(--color-primary, #f97316)';
      return { color: color, weight: 5, opacity: 0.8 };
    }
    // Style Points (Stations) - ALL ORANGE
    if (feature.geometry.type === 'Point') {
       return {
         radius: 6,
         fillColor: 'var(--color-primary)', // Use primary orange for all
         color: "var(--text-primary)", // Border color
         weight: 1,
         opacity: 1,
         fillOpacity: 0.9
       };
    }
    return {};
  };

  // Function to add permanent labels (tooltips)
  const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.Name && feature.geometry.type === 'Point') {
      layer.bindTooltip(feature.properties.Name, {
        permanent: true, // Label always exists
        direction: 'right', // Position label to the right
        offset: [10, 0],   // Offset it slightly from the point
        className: 'station-label-tooltip' // CSS class for styling
      });
    }
  };

  // Convert points to circle markers
  const pointToLayer = (feature, latlng) => {
     if (feature.geometry.type === 'Point') {
       return L.circleMarker(latlng, styleGeoJSON(feature));
     }
  };

  return (
    // Removed motion.div
    <div className="map-page">
      <h2>Metro Network Map</h2>
      <div className="map-container">
        <MapContainer
          center={mapCenter}
          zoom={12} // Start at a reasonable zoom
          scrollWheelZoom={true}
          style={{ height: '70vh', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            ref={geoJsonLayerRef}
            key={JSON.stringify(metroData)} // Force re-render if needed
            data={metroData.features}
            style={styleGeoJSON}
            onEachFeature={onEachFeature}
            pointToLayer={pointToLayer}
          />
          {/* Removed MapZoomHandler */}
        </MapContainer>
      </div>
    </div>
  );
};

export default LiveMapPage;