import React, { useContext } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import { collectionContext } from '../../App';
import { useState } from 'react';
import Buttons from './Buttons';
import useGeoLocation from './useGeolocation';


const containerStyle = {
  width: '100%',
  height: '100%'
};

function Maps() {

  const { value1, value2 } = useContext(collectionContext);
  const [longAndLat] = value1;

  const [alllng] = value2;

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  }

  // const onLoad = polyline => {
  //   console.log('polyline: ', polyline)
  // };


  const [drag, setDrag] = useState({})

  try {
    var ltlng = {
      lat: parseFloat(drag.latLng.lat()).toFixed(10),
      lng: parseFloat(drag.latLng.lng()).toFixed(8)
    }
  }
  catch (err) {
    if (err === undefined) {
      console.log('Data loading')
    }
  }
  if (ltlng === undefined) {
    ltlng = {
      lat: 45.59558868,
      lng: -107.45098877
    }
  }


  const [adminLocation, setAdminLocation] = useState()
  const location = useGeoLocation();

  const handleUser = () => {
    location.loaded ? setAdminLocation(location.coordinates) : console.log("Location data not available yet.")
  }

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAq_balT-STHRcA_BgA6H5Khfpzw6hUBk0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={adminLocation === undefined ? longAndLat : adminLocation}
        zoom={10}
      >

        <Marker
          onLoad={marker => {
            const customIcon = (opts) => Object.assign({
              path: 'M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z',
              fillColor: '#34495e',
              fillOpacity: 1,
              strokeColor: '#000',
              strokeWeight: 1,
              scale: 1,
            }, opts);

            marker.setIcon(customIcon({
              fillColor: 'green',
              strokeColor: 'white'
            }));
            // return markerLoadHandler(marker, place)
          }}
          position={adminLocation === undefined ? longAndLat : adminLocation}
          draggable={true}
          onDragEnd={(e) => setDrag(e)}
          name="Current position"
          title="Draggable Marker"
        />
        <MarkerClusterer options={options}>
          {(clusterer) =>
            alllng.map((location, index) => (
              <Marker
                key={index}
                title={location.menuTitle}
                position={location.newPosition}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>

      </GoogleMap>

      <Buttons handleUser={handleUser} lat={ltlng.lat} lng={ltlng.lng} />
    </LoadScript>
  )
}

export default React.memo(Maps)
