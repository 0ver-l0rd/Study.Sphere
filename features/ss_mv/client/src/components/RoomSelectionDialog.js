import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import logo from '../images/logo.png';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomRoomTable } from './CustomRoomTable';
import { CreateRoomForm } from './CreateRoomForm';
import { useAppSelector } from '../hooks';
import phaserGame from '../PhaserGame';
const Backdrop = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 60px;
  align-items: center;
`;
const Wrapper = styled.div `
  background-color: rgba(17, 25, 40, 0.75); /* Matches the desired backgroundColor */
  border-radius: 12px; /* Matches the desired borderRadius */
  border: 1px solid rgba(255, 255, 255, 0.125); /* Matches the desired border */

  /* Incorporate the shadow styling */
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1), 
              0px 1px 0px 0px rgba(25, 28, 33, 0.02), 
              0px 0px 0px 1px rgba(25, 28, 33, 0.08);

  /* Incorporate the backdrop filter styling */
  backdrop-filter: blur(16px) saturate(180%);

  padding: 36px 60px;
`;
const CustomRoomWrapper = styled.div `
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  .tip {
    font-size: 18px;
  }
`;
const TitleWrapper = styled.div `
  display: grid;
  width: 100%;

  .back-button {
    grid-column: 1;
    grid-row: 1;
    justify-self: start;
    align-self: center;
  }

  h1 {
    grid-column: 1;
    grid-row: 1;
    justify-self: center;
    align-self: center;
  }
`;
const Title = styled.h1 `
  font-size: 24px;
  color: #eee;
  text-align: center;
`;
const Content = styled.div `
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 8px;
    height: 120px;
  }
`;
const ProgressBarWrapper = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    color: #000319;
  }
`;
const ProgressBar = styled(LinearProgress) `
  width: 360px;
`;
export default function RoomSelectionDialog() {
    const [showCustomRoom, setShowCustomRoom] = useState(false);
    const [showCreateRoomForm, setShowCreateRoomForm] = useState(false);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
    const handleConnect = () => {
        if (lobbyJoined) {
            const bootstrap = phaserGame.scene.keys.bootstrap;
            bootstrap.network
                .joinOrCreatePublic()
                .then(() => bootstrap.launchGame())
                .catch((error) => console.error(error));
        }
        else {
            setShowSnackbar(true);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Snackbar, { anchorOrigin: { vertical: 'top', horizontal: 'center' }, open: showSnackbar, autoHideDuration: 3000, onClose: () => {
                    setShowSnackbar(false);
                }, children: _jsx(Alert, { severity: "error", variant: "outlined", 
                    // overwrites the dark theme on render
                    style: { background: '#fdeded', color: '#7d4747' }, children: "Trying to connect to server, please try again!" }) }), _jsxs(Backdrop, { children: [_jsx(Wrapper, { children: showCreateRoomForm ? (_jsxs(CustomRoomWrapper, { children: [_jsxs(TitleWrapper, { children: [_jsx(IconButton, { className: "back-button", onClick: () => setShowCreateRoomForm(false), children: _jsx(ArrowBackIcon, {}) }), _jsx(Title, { children: "Create Custom Room" })] }), _jsx(CreateRoomForm, {})] })) : showCustomRoom ? (_jsxs(CustomRoomWrapper, { children: [_jsxs(TitleWrapper, { children: [_jsx(IconButton, { className: "back-button", onClick: () => setShowCustomRoom(false), children: _jsx(ArrowBackIcon, {}) }), _jsxs(Title, { children: ["Custom Rooms", _jsx(Tooltip, { title: "We update the results in realtime, no refresh needed!", placement: "top", children: _jsx(IconButton, { children: _jsx(HelpOutlineIcon, { className: "tip" }) }) })] })] }), _jsx(CustomRoomTable, {}), _jsx(Button, { variant: "contained", color: "secondary", onClick: () => setShowCreateRoomForm(true), children: "Create new room" })] })) : (_jsxs(_Fragment, { children: [_jsx(Title, { children: "StudyVerse" }), _jsxs(Content, { children: [_jsx("img", { src: logo, alt: "logo" }), _jsx(Button, { variant: "contained", color: "secondary", onClick: handleConnect, children: "Connect To Public Lobby" }), _jsx(Button, { variant: "outlined", color: "secondary", onClick: () => (lobbyJoined ? setShowCustomRoom(true) : setShowSnackbar(true)), children: "Explore Custom Rooms" })] })] })) }), !lobbyJoined && (_jsxs(ProgressBarWrapper, { children: [_jsx("h3", { children: " Connecting to server..." }), _jsx(ProgressBar, { color: "secondary" })] }))] })] }));
}
