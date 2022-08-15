import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createStore, StateMachineProvider } from "little-state-machine";
import MainPage from "./pages/MainPage";
import SettingsPage from "./pages/SettingsPage";
import ChatPage from "./pages/ChatPage";
import './App.css';
import 'antd/dist/antd.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { HowToVoteSharp } from "@mui/icons-material";

function App() {

  createStore({});

  const theme = createTheme({
    palette: {
      primary: {
        main:  '#e9692c',
      },
      secondary: {
        main: '#fc7e42',
      }
    },
    components: {
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            height:'43vh',
            
          },
          viewTransitionContainer: {
            minHeight: '230px',
            overflowY:'hidden'
  
          }
          
        },
      },
      MuiYearPicker: {
        styleOverrides: {
          root: {
            overflowY:'auto',  
            height:'35vh',
            PrivatePickersYear: {
              MuiSelected: {
                focus: {backgroundcolor: "pink"}
                
              }
            
            }
          },
          
        },
      }

    },
    
  });
 
  return (
    <StateMachineProvider>
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/settings" element={<SettingsPage/>}/>
          <Route path="/home" element={<MainPage/>}/>
          <Route path="/" element={<LoginPage/>}/>
        </Routes>
      
      </Router>
    </div>
    </ThemeProvider>
    </StateMachineProvider>
  );
}

export default App;
