import React, { useContext } from 'react'
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import { collectionContext } from '../../App';
const containerStyle = {
  width: '100%',
  height: '100%'
};


function Maps() {

  const { value1 } = useContext(collectionContext);
  const [longAndLat] = value1;

  const locations = [
    { lat: 45.59558868, lng: -107.45098877 },
    { lat: 45.59725952, lng: -107.45169830 },
    { lat: 45.59764481, lng: -107.45288849 },
    { lat: 45.59761810, lng: -107.45289612 },
    { lat: 45.59756088, lng: -107.45290375 },
    { lat: 45.59758759, lng: -107.45290375 },
    { lat: 45.59754944, lng: -107.45335388 },
    { lat: 45.59752655, lng: -107.45333099 },
    { lat: 45.59749985, lng: -107.45330811 },
    { lat: 45.59747696, lng: -107.45327759 },
    { lat: 45.59455490, lng: -107.45500183 },
    { lat: 45.59761429, lng: -107.45076752 },
    { lat: 45.59765625, lng: -107.45078278 },
    { lat: 45.59777832, lng: -107.45008087 },
    { lat: 45.59777832, lng: -107.45004272 },
    { lat: 45.59777832, lng: -107.45000458 },
    { lat: 45.59777832, lng: -107.44997406 },
    { lat: 45.59777832, lng: -107.44993591 },
    { lat: 45.59778214, lng: -107.44989777 },
    { lat: 45.59772110, lng: -107.44959259},
    { lat: 45.59771729, lng: -107.44955444 },
    { lat: 45.59745407, lng: -107.44847107 },
    { lat: 45.59882355, lng: -107.44848633 },
  ]

  const options = {
    imagePath:
      'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
  }

  function createKey(location) {
    return location.lat + location.lng
  }

  // const onLoad = marker => {
  //   console.log('marker: ', marker)
  // }
  return (
    <LoadScript
      // AIzaSyA9pwzh8oq3MnIzgin15N13SZAqzylfYpE
      //AIzaSyDwH2tsbAyowwhUu5OeVz2r4dEaYmwDiO4
      //AIzaSyDeOEJ0wtvPT8ybmB4Uh4M_v4WMRo85uII
      //AIzaSyAq_balT-STHRcA_BgA6H5Khfpzw6hUBk0
      //AIzaSyCeKAgLlO9IYuxU3EQ35up438Gn0ZKLjCA
      googleMapsApiKey="AIzaSyAq_balT-STHRcA_BgA6H5Khfpzw6hUBk0"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={longAndLat}
        zoom={10}
      >
        {/* <Marker
          onLoad={onLoad}
          position={longAndLat}
        /> */}
        
        <MarkerClusterer options={options}>
          {(clusterer) =>
            locations.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer} animation={2} />
            ))
          }
        </MarkerClusterer>
        
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Maps)