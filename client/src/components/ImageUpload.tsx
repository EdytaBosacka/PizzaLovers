import React, { Component, useState} from 'react';
import ImageDropzone from './ImageDropzone';


function ImageUpload ({uploadImages}: {uploadImages:(images: (String |ArrayBuffer)[]) => void }) {

    const [imageFiles, setImageFiles] = useState([] as File[]);
    const onImageFilesAdded = (files: File[]) => {
        setImageFiles(imageFiles.concat(files));
    }
    const convertToBase64 = (file: File) => {
        return new Promise<String | ArrayBuffer>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            if(!fileReader.result) return '';
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      }

      const handleFileUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const promises= await imageFiles.map(convertToBase64);
        Promise.all(promises).then((images) => {
          uploadImages(images);
        })  
      };
      return (
        <div>
          <ImageDropzone onImageFilesAdded={onImageFilesAdded}/>
          <button onClick={handleFileUpload}>Upload</button>
        </div>

      )



}

export default ImageUpload;