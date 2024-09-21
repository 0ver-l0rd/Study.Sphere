import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import phaserGame from '../PhaserGame';
const Backdrop = styled.div `
  position: fixed;
  top: 0;
  left: 0;
`;
const Wrapper = styled.div `
  width: 100%;
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`;
export default function VideoConnectionDialog() {
    const [connectionWarning, setConnectionWarning] = useState(true);
    return (_jsx(Backdrop, { children: _jsxs(Wrapper, { children: [connectionWarning && (_jsxs(Alert, { severity: "warning", onClose: () => {
                        setConnectionWarning(!connectionWarning);
                    }, children: [_jsx(AlertTitle, { children: "Warning" }), "No webcam connected", _jsx("br", {}), " ", _jsx("strong", { children: "connect one for full experience!" })] })), _jsx(Button, { variant: "contained", color: "secondary", onClick: () => {
                        const game = phaserGame.scene.keys.game;
                        game.network.webRTC?.getUserMedia();
                    }, children: "Connect Webcam" })] }) }));
}
