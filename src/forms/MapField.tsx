import { useFormikContext } from "formik";
import Map from "../movieTheathers/Map";
import { coordinateDTO } from "../utils/coordinates.model";

const MapField = (props: mapFieldProps)=>{
    const {values} = useFormikContext<any>();

    const handleMapClick  = (coordinates:coordinateDTO) => {
        values[props.latField] = coordinates.lat;
        values[props.lngField] = coordinates.lng;
    };  

    return <Map coordinates = {props.coordinates}
    handleMapClick = {handleMapClick} />
};

export default MapField;

interface mapFieldProps{
    coordinates: coordinateDTO[],
    latField: string,
    lngField: string
};

MapField.defaultProps = {
    coordinates: []
};