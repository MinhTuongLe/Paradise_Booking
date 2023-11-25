"use client";

import L from "leaflet";
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import Flag from "react-world-flags";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "node_modules/leaflet-geosearch/dist/geosearch.css";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

function Map({ center, locationValue }) {
  const [showSearchControl, setShowSearchControl] = useState(false);
  useEffect(() => {
    const map = L.map("map");

    // Initialize the map with or without the search control based on showSearchControl state
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: "bar",
    });
    if (showSearchControl) {
      map.addControl(searchControl);
    }

    return () => {
      map.remove();
    };
  }, [showSearchControl]);

  useEffect(() => {
    // Show the search control when the map is mounted
    setShowSearchControl(true);
  }, []);
  return (
    <div id="map">
      <MapContainer
        center={center || [51, -0.09]}
        zoom={center ? 4 : 2}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMapa> contributors'
        />
        {locationValue ? (
          <>
            {center && (
              <Marker position={center}>
                <Popup>
                  <div className="flex justify-center items-center animate-bounce">
                    <Flag code={locationValue} className="w-10" />
                  </div>
                </Popup>
              </Marker>
            )}
          </>
        ) : (
          <>{center && <Marker position={center} />}</>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
