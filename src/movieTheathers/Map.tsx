import { MapContainer, Marker, TileLayer, Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { coordinateDTO } from "../utils/coordinates.model";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

L.Marker.prototype.options.icon = defaultIcon;

const Map = (props: mapProps) => {
    const [coord, setCoords] = useState<coordinateDTO[]>(props.coordinates);
    return <>
        <MapContainer
            center={[49.840033, 24.020699]} zoom={14} scrollWheelZoom={true}
            style={{ height: props.height }}>
            <TileLayer attribution="React movies"
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
            {props.readonly ? null : <MapClick setCoordinates={(coordinates => {
                setCoords([coordinates]);
                props.handleMapClick(coordinates);
            })} />}
            {coord.map((coordinates, index) => {
                return <Marker key={index} position={[coordinates.lat, coordinates.lng]}>
                    {coordinates.name ? <Popup>
                        Name of place: {coordinates.name} <br />
                        Coordinates: {coordinates.lat} | {coordinates.lng}
                    </Popup> : null}
                </Marker>
            })}
        </MapContainer>
    </>
};

export default Map;

function MapClick(props: mapClickProps) {
    useMapEvent('click', eventArgs => {
        props.setCoordinates({ lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng });
    });

    return null;
}

interface mapClickProps {
    setCoordinates(coordinates: coordinateDTO): void;
}

interface mapProps {
    height?: string;
    coordinates: coordinateDTO[],
    handleMapClick(coordinates: coordinateDTO): void,
    readonly: boolean;
}

Map.defaultProps = {
    height: '500px',
    handleMapClick: () => { },
    readonly: false
};