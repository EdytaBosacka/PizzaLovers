import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useRef, useState } from 'react';
import './ImageDropzone.css';

function ImageDropzone(props: any) {

    const [highlight, setHighlight] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    }

    const onImageFilesAdded = (e: React.ChangeEvent<HTMLDivElement>) => {
        const images = (e.target as HTMLInputElement).files;
        if (props.onImageFilesAdded) {
            const imageArray = Array.from(images || []);
            props.onImageFilesAdded(imageArray);
        }
    }
    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setHighlight(true);
    }
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        setHighlight(false);
    }
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const images = e.dataTransfer.files;
        if (props.onImageFilesAdded) {
            const imageArray = Array.from(images || []);
            props.onImageFilesAdded(imageArray);
        }
        setHighlight(false);
    }

    return (
        <div className={`ImageDropzone ${highlight ? 'Highlight' : ''}`}
             onClick={openFileDialog}
             onDragOver={onDragOver} 
             onDragLeave={onDragLeave}
             onDrop={onDrop}
             style={{ cursor: 'pointer' }}
        >
            <AddPhotoAlternateOutlinedIcon sx={{ color: "rgb(187, 186, 186)", fontSize: "48px", opacity: "0.7" }} />
            <input ref={fileInputRef} className="FileInput" type="file" accept="image/*" multiple={true} onChange={ onImageFilesAdded } />
        </div>

    )

}

export default ImageDropzone;