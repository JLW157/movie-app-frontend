import { useFormikContext } from "formik";
import { ChangeEvent, useState } from "react";

const ImageField = (props: imageFieldProps) => {
    const [image64, setImage64] = useState('');
    const [imageURL, setImageURL] = useState(props.imageURL);

    const { values } = useFormikContext<any>();

    const divStyle = { marginTop: '10px' };
    const imgStyle = { width: '450px' };
    const handleOnChange = (eventArgs: ChangeEvent<HTMLInputElement>) => {
        if (eventArgs.currentTarget.files) {
            const file = eventArgs.currentTarget.files[0];
            if (file) {
                toBase64(file).then((base64representation: string) => setImage64(base64representation))
                    .catch(err => console.log(err));
                values[props.field] = file;
                setImageURL('');
            } else {
                setImage64('');
            }
        }
    };

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div>
            <label>{props.displayName}</label>
            <div>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleOnChange} />
            </div>
            {image64 ? (<div>
                <div style={divStyle}>
                    <img style={imgStyle} src={image64} alt='selected' />
                </div>
            </div>) : null}
            {imageURL ? (<div>
                <div style={divStyle}>
                    <img style={imgStyle} src={imageURL} alt='selcted' />
                </div>
            </div>) : null}
        </div>
    )
};

export default ImageField;

interface imageFieldProps {
    displayName: string;
    imageURL: string;
    field: string;
}

ImageField.defaultProps = {
    imageURL: ''
}