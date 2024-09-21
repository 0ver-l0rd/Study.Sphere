import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAppSelector } from './hooks';
import RoomSelectionDialog from './components/RoomSelectionDialog';
import LoginDialog from './components/LoginDialog';
import ComputerDialog from './components/ComputerDialog';
import WhiteboardDialog from './components/WhiteboardDialog';
import VideoConnectionDialog from './components/VideoConnectionDialog';
import Chat from './components/Chat';
import HelperButtonGroup from './components/HelperButtonGroup';
import MobileVirtualJoystick from './components/MobileVirtualJoystick';
import phaserGame from './PhaserGame';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import Alert from '@mui/material/Alert';
const Backdrop = styled.div `
  position: absolute;
  height: 100%;
  width: 100%;
`;
const PasswordDialog = styled(Dialog) `
  .dialog-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .MuiDialog-paper {
    background: #222639;
  }
`;
const MessageText = styled.p `
  margin: 10px;
  font-size: 18px;
  color: #eee;
  text-align: center;
`;
function App() {
    const loggedIn = useAppSelector((state) => state.user.loggedIn);
    const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen);
    const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen);
    const videoConnected = useAppSelector((state) => state.user.videoConnected);
    const roomJoined = useAppSelector((state) => state.room.roomJoined);
    const currentRoom = useAppSelector((state) => state.room.roomId);
    const [password, setPassword] = useState('');
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState('');
    const handleEnterRoom = (roomId, password) => {
        console.log('Entering Room', roomId);
        const bootstrap = phaserGame.scene.keys.bootstrap;
        bootstrap.network
            .joinCustomById(roomId, password)
            .then(() => bootstrap.launchGame())
            .catch((error) => {
            console.error(error);
            if (error.message.includes('Password'))
                setShowPasswordDialog(true);
            if (password)
                setShowPasswordError(true);
        });
    };
    const handlePasswordSubmit = (event) => {
        event.preventDefault();
        const isValidPassword = password !== '';
        if (isValidPassword === passwordFieldEmpty)
            setPasswordFieldEmpty(!passwordFieldEmpty);
        if (isValidPassword)
            handleEnterRoom(selectedRoom, password);
        resetPasswordDialog();
    };
    const resetPasswordDialog = () => {
        setShowPasswordDialog(false);
        setPassword('');
        setPasswordFieldEmpty(false);
        setShowPasswordError(false);
    };
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomIdFromURL = params.get('room');
        if (roomIdFromURL) {
            setSelectedRoom(roomIdFromURL);
        }
    }, []);
    useEffect(() => {
        if (currentRoom) {
            window.history.pushState({}, '', `?room=${currentRoom}`);
        }
    }, [currentRoom]);
    useEffect(() => {
        if (selectedRoom)
            handleEnterRoom(selectedRoom, password);
    }, [selectedRoom]);
    let ui;
    if (loggedIn) {
        if (computerDialogOpen) {
            /* Render ComputerDialog if user is using a computer. */
            ui = _jsx(ComputerDialog, {});
        }
        else if (whiteboardDialogOpen) {
            /* Render WhiteboardDialog if user is using a whiteboard. */
            ui = _jsx(WhiteboardDialog, {});
        }
        else {
            ui = (
            /* Render Chat or VideoConnectionDialog if no dialogs are opened. */
            _jsxs(_Fragment, { children: [_jsx(Chat, {}), !videoConnected && _jsx(VideoConnectionDialog, {}), _jsx(MobileVirtualJoystick, {})] }));
        }
    }
    else if (roomJoined) {
        /* Render LoginDialog if not logged in but selected a room. */
        ui = _jsx(LoginDialog, {});
    }
    else {
        /* Render RoomSelectionDialog if yet selected a room. */
        ui = _jsx(RoomSelectionDialog, {});
    }
    return (_jsxs(Backdrop, { children: [_jsx(PasswordDialog, { open: showPasswordDialog, onClose: resetPasswordDialog, children: _jsxs("form", { onSubmit: handlePasswordSubmit, children: [_jsxs(DialogContent, { className: "dialog-content", children: [_jsx(MessageText, { children: "This a private room, please enter password:" }), _jsx(TextField, { autoFocus: true, fullWidth: true, error: passwordFieldEmpty, helperText: passwordFieldEmpty && 'Required', value: password, label: "Password", type: "password", variant: "outlined", color: "secondary", onInput: (e) => {
                                        setPassword(e.target.value);
                                    } }), showPasswordError && (_jsx(Alert, { severity: "error", variant: "outlined", children: "Incorrect Password!" }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { color: "secondary", onClick: resetPasswordDialog, children: "Cancel" }), _jsx(Button, { color: "secondary", type: "submit", children: "Join" })] })] }) }), ui, !computerDialogOpen && !whiteboardDialogOpen && _jsx(HelperButtonGroup, {})] }));
}
export default App;
