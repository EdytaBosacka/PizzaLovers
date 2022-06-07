import SideBar from '../components/SideBar';
import ImageDropzone from '../components/ImageDropzone';
import './SettingsPage.css';

function SettingsPage() {

    return (
        <div className="MainPage">
            <SideBar />
            <div className="userSettings">
                <ImageDropzone/>
            </div>
        </div>

    );
}


export default SettingsPage;