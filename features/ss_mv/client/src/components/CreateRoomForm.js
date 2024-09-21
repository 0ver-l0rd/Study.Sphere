import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAppSelector } from '../hooks';
import phaserGame from '../PhaserGame';
const CreateRoomFormWrapper = styled.form `
  display: flex;
  flex-direction: column;
  width: 320px;
  gap: 20px;
`;
export const CreateRoomForm = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        password: null,
        autoDispose: true,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [nameFieldEmpty, setNameFieldEmpty] = useState(false);
    const [descriptionFieldEmpty, setDescriptionFieldEmpty] = useState(false);
    const lobbyJoined = useAppSelector((state) => state.room.lobbyJoined);
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const isValidName = values.name !== '';
        const isValidDescription = values.description !== '';
        if (isValidName === nameFieldEmpty)
            setNameFieldEmpty(!nameFieldEmpty);
        if (isValidDescription === descriptionFieldEmpty)
            setDescriptionFieldEmpty(!descriptionFieldEmpty);
        // create custom room if name and description are not empty
        if (isValidName && isValidDescription && lobbyJoined) {
            const bootstrap = phaserGame.scene.keys.bootstrap;
            bootstrap.network
                .createCustom(values)
                .then(() => bootstrap.launchGame())
                .catch((error) => console.error(error));
        }
    };
    return (_jsxs(CreateRoomFormWrapper, { onSubmit: handleSubmit, children: [_jsx(TextField, { label: "Name", variant: "outlined", color: "secondary", autoFocus: true, error: nameFieldEmpty, helperText: nameFieldEmpty && 'Name is required', onChange: handleChange('name') }), _jsx(TextField, { label: "Description", variant: "outlined", color: "secondary", error: descriptionFieldEmpty, helperText: descriptionFieldEmpty && 'Description is required', multiline: true, rows: 4, onChange: handleChange('description') }), _jsx(TextField, { type: showPassword ? 'text' : 'password', label: "Password (optional)", onChange: handleChange('password'), color: "secondary", InputProps: {
                    endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { "aria-label": "toggle password visibility", onClick: () => setShowPassword(!showPassword), edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })),
                } }), _jsx(Button, { variant: "contained", color: "secondary", type: "submit", children: "Create" })] }));
};
