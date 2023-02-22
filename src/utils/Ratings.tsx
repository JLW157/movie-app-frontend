import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../auth/auth-context";
import "./Ratings.css";

const Rating = (props: ratingProps) => {
    const [maximumValueArr, setMaximumValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState<number>(props.selectedValue);
    const {claims} = useContext(AuthContext);

    useEffect(() => {
        setMaximumValueArr(Array(props.maximumValue).fill(0));
    }, [props.maximumValue]);

    const hadnleMouseOver = (rate: number) => {
        setSelectedValue(rate);
    }

    const handleClick = (rate:number) => {
        const userIsLoggedIn = claims.length > 0;
        
        if (!userIsLoggedIn) {
            Swal.fire({
                title: "Error",
                text: "You need to be loggined!",
                icon: "error"
            });
        }

        setSelectedValue(rate);
        props.onChange(rate);
    };

    return (
        <>
            {maximumValueArr.map((value, index) => {
                return <FontAwesomeIcon icon={"star"}
                    onMouseOver={() => hadnleMouseOver(index + 1)}
                    onClick={() => handleClick(index + 1)}
                    key={index} 
                    className={`fa-lg pointer ${selectedValue >= index + 1 ? "checked" : null}`}></FontAwesomeIcon>
            })}
        </>
    )
};

interface ratingProps {
    maximumValue: number;
    selectedValue: number;
    onChange: (rate: number) => void;
}

export default Rating;