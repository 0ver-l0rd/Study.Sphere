import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LockIcon from '@mui/icons-material/Lock';
import { useAppSelector } from '../hooks';
import { getAvatarString, getColorByString } from '../util';
import phaserGame from '../PhaserGame';
const MessageText = styled.p `
  margin: 10px;
  font-size: 18px;
  color: #eee;
  text-align: center;
`;
const CustomRoomTableContainer = styled(TableContainer) `
  max-height: 500px;

  table {
    min-width: 650px;
  }
`;
const TableRowWrapper = styled(TableRow) `
  &:last-child td,
  &:last-child th {
    border: 0;
  }

  .avatar {
    height: 30px;
    width: 30px;
    font-size: 15px;
  }

  .name {
    min-width: 100px;
    overflow-wrap: anywhere;
  }

  .description {
    min-width: 200px;
    overflow-wrap: anywhere;
  }

  .join-wrapper {
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .lock-icon {
    font-size: 18px;
  }
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
export const CustomRoomTable = () => {
    const [password, setPassword] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
    const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
    const availableRooms = useAppSelector((state) => state.room.availableRooms);
    const handleJoinClick = (roomId, password) => {
        if (!lobbyJoined)
            return;
        const bootstrap = phaserGame.scene.keys.bootstrap;
        bootstrap.network
            .joinCustomById(roomId, password)
            .then(() => bootstrap.launchGame())
            .catch((error) => {
            console.error(error);
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
            handleJoinClick(selectedRoom, password);
    };
    const resetPasswordDialog = () => {
        setShowPasswordDialog(false);
        setPassword('');
        setPasswordFieldEmpty(false);
        setShowPasswordError(false);
    };
    return availableRooms.length === 0 ? (_jsx(MessageText, { children: "There are no custom rooms right now, create one or join the adventure." })) : (_jsxs(_Fragment, { children: [_jsx(CustomRoomTableContainer, { component: Paper, children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, {}), _jsx(TableCell, { children: "Name" }), _jsx(TableCell, { children: "Description" }), _jsx(TableCell, { children: "ID" }), _jsx(TableCell, { align: "center", children: _jsx(PeopleAltIcon, {}) }), _jsx(TableCell, { align: "right" })] }) }), _jsx(TableBody, { children: availableRooms.map((room) => {
                                const { roomId, metadata, clients } = room;
                                const { name, description, hasPassword } = metadata;
                                return (_jsxs(TableRowWrapper, { children: [_jsx(TableCell, { children: _jsx(Avatar, { className: "avatar", style: { background: getColorByString(name) }, children: getAvatarString(name) }) }), _jsx(TableCell, { children: _jsx("div", { className: "name", children: name }) }), _jsx(TableCell, { children: _jsx("div", { className: "description", children: description }) }), _jsx(TableCell, { children: roomId }), _jsx(TableCell, { align: "center", children: clients }), _jsx(TableCell, { align: "center", children: _jsx(Tooltip, { title: hasPassword ? 'Password required' : '', children: _jsx(Button, { variant: "outlined", color: "secondary", onClick: () => {
                                                        if (hasPassword) {
                                                            setShowPasswordDialog(true);
                                                            setSelectedRoom(roomId);
                                                        }
                                                        else {
                                                            handleJoinClick(roomId, null);
                                                        }
                                                    }, children: _jsxs("div", { className: "join-wrapper", children: [hasPassword && _jsx(LockIcon, { className: "lock-icon" }), "Join"] }) }) }) })] }, roomId));
                            }) })] }) }), _jsx(PasswordDialog, { open: showPasswordDialog, onClose: resetPasswordDialog, children: _jsxs("form", { onSubmit: handlePasswordSubmit, children: [_jsxs(DialogContent, { className: "dialog-content", children: [_jsx(MessageText, { children: "This a private room, please enter password:" }), _jsx(TextField, { autoFocus: true, fullWidth: true, error: passwordFieldEmpty, helperText: passwordFieldEmpty && 'Required', value: password, label: "Password", type: "password", variant: "outlined", color: "secondary", onInput: (e) => {
                                        setPassword(e.target.value);
                                    } }), showPasswordError && (_jsx(Alert, { severity: "error", variant: "outlined", children: "Incorrect Password!" }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { color: "secondary", onClick: resetPasswordDialog, children: "Cancel" }), _jsx(Button, { color: "secondary", type: "submit", children: "Join" })] })] }) })] }));
};
