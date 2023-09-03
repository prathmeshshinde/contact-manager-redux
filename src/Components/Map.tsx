import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const defaultPosition = {
  lat: 20,
  lng: 77,
  zoom: 4,
};

const L = require("leaflet");

let DefaultIcon = L.icon({
  iconUrl: require("../images/temp.png"),
  iconSize: [30, 30],
});

const api_URL = "https://disease.sh/v3/covid-19/countries";

const Map: React.FC = () => {
  const [loc, setLoc] = useState<[number, number]>([
    defaultPosition.lat,
    defaultPosition.lng,
  ]);
  const [country, setCountry] = useState<any>([]);

  const markerRef = useRef(null);

  const fetchData = async () => {
    await fetch(api_URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCountry(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-11/12 mt-8 m-auto">
      <h1 className=" text-blue-600 font-semibold text-xl text-center my-3">
        Map of Countries with Covid Cases
      </h1>
      <MapContainer className="map" center={loc} zoom={defaultPosition.zoom}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {country &&
          country.map((items: any, index: any) => {
            return (
              <div key={index}>
                <Marker
                  position={[items.countryInfo.lat, items.countryInfo.long]}
                  draggable={true}
                  ref={markerRef}
                  icon={DefaultIcon}
                >
                  <Popup>
                    <p className=" font-bold text-blue-600">
                      Total Cases: {items.cases.toLocaleString("en-IN")}
                    </p>
                    <p className="font-bold text-red-500">
                      Total Deaths: {items.deaths.toLocaleString("en-IN")}
                    </p>
                    <p className="font-bold text-green-600">
                      Total Recovered: {items.recovered.toLocaleString("en-IN")}
                    </p>
                  </Popup>
                </Marker>
              </div>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default Map;
