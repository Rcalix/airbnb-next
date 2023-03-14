import { useState } from 'react';
import Map , {Marker, Popup} from 'react-map-gl';
import * as geolib from 'geolib';
import { ISearchResults } from '../pages/search';
import "mapbox-gl/dist/mapbox-gl.css";

type ISearchProps  = { 
    searchResults: ISearchResults[]
}
const MapComponent = ({searchResults}: ISearchProps) => {
    const [selectedLocation, setSelectedLocation] = useState<ISearchResults | {}>({});
    const coordinates = searchResults.map(result => ({
        latitude: result.lat,
        longitude: result.long
    }))
    const center = geolib.getCenter(coordinates)

    const [viewState, setViewState] = useState({
        longitude:  (center as { longitude: number}).longitude,
        latitude: (center as { latitude: number}).latitude,
        zoom: 14
      });

    return <Map
        initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14
        }}
        mapStyle="mapbox://styles/rcalix/clehqlzkj002f01nyjwmc857c"
        mapboxAccessToken={process.env.mapbox_key}
        onMove={evt => setViewState(evt.viewState)}
        {...viewState}
        >
         {searchResults.map((res) => (
            <div key={res.long} >
                <Marker longitude={res.long} latitude={res.lat} onClick={() => setSelectedLocation(res)}>
                    <p role="img"  className="animate-bounce" aria-label='Push-pin'>📍</p>
                </Marker>
                {/* <Marker longitude={res.long} latitude={res.lat} color="red"  /> */}
                {'long' in selectedLocation && selectedLocation.long === res.long ? (
                     <Popup
                     latitude={res.lat}
                     longitude={res.long}
                     closeButton={true}
                     closeOnClick={false}
                     >
                     <p>{res.title}</p>
                     </Popup>
                    ): (false)}
                 </div>
               
         ))}
    </Map>
}

export default MapComponent;
