import React, { Component, useState } from 'react';
import ImageDropzone from './ImageDropzone';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../node_modules/@mui/material/Button';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import './ImageUpload.css';


function ImageUpload({ uploadImages }: { uploadImages: (images: (String | ArrayBuffer)[]) => void }) {

  const [imageFiles, setImageFiles] = useState([] as File[]);
  const [dialogOpened, setDialogOpened] = useState(false);

  const onImageFilesAdded = (files: File[]) => {
    setImageFiles(imageFiles.concat(files));
    setDialogOpened(true);
  }
  const convertToBase64 = (file: File) => {
    return new Promise<String | ArrayBuffer>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (!fileReader.result) return '';
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const promises = await imageFiles.map(convertToBase64);
    Promise.all(promises).then((images) => {
      uploadImages(images);
    });
    setImageFiles([]);
    setDialogOpened(false);
  };

  const handleClickCancel = () => {
    setDialogOpened(false);
    setImageFiles([]);
  };
  return (
    <div>
      <ImageDropzone onImageFilesAdded={onImageFilesAdded} />
      <Dialog open={dialogOpened}>
        <DialogTitle style={{ backgroundColor: '#ffac45', color: 'white' }}>Upload images</DialogTitle>
        <div className="imagesCollection">
          {imageFiles.map(function (image, i) {
            return <img key={i} src={URL.createObjectURL(image)} className="imagePreview"></img>;
          })}
        </div>
        <div className="buttonBar">
          <Button variant="outlined" onClick={handleClickCancel} startIcon={< CloseOutlinedIcon />}>Cancel</Button>
          <Button variant="outlined" onClick={handleFileUpload} startIcon={< FileUploadOutlinedIcon />}>Upload</Button>
        </div>
      </Dialog>

    </div>

  )



}

export default ImageUpload;