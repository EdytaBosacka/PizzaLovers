import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { useRef } from 'react';
import './ImageDropzone.css';

function ImageDropzone () {

    const fileInputRef = useRef<HTMLInputElement>(null);
    const openFileDialog = () => {
        fileInputRef.current?.click();
    }
    return (
        <div className="ImageDropzone" onClick={openFileDialog}>
            <CloudUploadOutlinedIcon sx={{color:"rgb(187, 186, 186)", fontSize: "48px",  opacity: "0.7"}}/>
            <input ref={fileInputRef} className="FileInput" type="file"/>
        </div>

    )

}

export default ImageDropzone;