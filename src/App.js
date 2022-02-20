import Layout from "./Components/Layout";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";
import { useState, useEffect } from "react";

function App() {

  const [position, setPosition] = useState("");
  const [map, setMap] = useState("");
  const [ submit, setSubmit] = useState(false);
  const [ searchResults, setSearchResults ] = useState("");

  const myStyle = {
    backgroundImage: "url(/images/pattern-bg.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };


  var myIcon = L.icon({
    iconUrl:
      "/images/icon-location.svg",
    iconSize: [46, 54],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
  });

  // Fly only if position is available and form is submitted
  if(position && submit){
    map.flyTo(position, 13, {
      duration: 2
    })
  }

  return (
    <div className="ip-tracker position-relative" id="ip-tracker">

      <Layout setPosition={setPosition} setSubmit={setSubmit} searchResults={searchResults} setSearchResults={setSearchResults} />

      <div className="blue-bg" style={myStyle}></div>

      {position ? (
        <MapContainer className="map-container" center={position} zoom={13} whenCreated={setMap}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>

        </MapContainer>
      ) : (
        <div className="map-container d-flex justify-content-center align-items-center" id="globe-container">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img src="/images/globe.gif" alt="Earth Loading Gif"/>
            <p className="mt-3">Fetching your location...</p>
          </div>
        </div>
      )}

      {/* <Layout lat={lat} setLat={setLat} lng={lng} setLng={setLng}/>       */}
    </div>
  );
}

export default App;
