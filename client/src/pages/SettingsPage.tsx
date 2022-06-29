import SideBar from '../components/SideBar';
import ImageUpload from '../components/ImageUpload';
import './SettingsPage.css';
import { useLocation } from 'react-router-dom';
import  Axios from 'axios';


function SettingsPage() {

    const location = useLocation<{ login: string }>();
    const uploadImages = (images: (String|ArrayBuffer)[]) => {
        Axios.post('http://localhost:3001/uploadImages/', {
          loggedUser: localStorage.getItem('login'),
          images: images
        }).then((response) =>{
        }).catch(function(error){
          
        });
      }

    return (
        <div className="MainPage">
            <SideBar />
            <div className="userSettings">
                <ImageUpload uploadImages={uploadImages}/>
            </div>
        </div>

    );
}


export default SettingsPage;