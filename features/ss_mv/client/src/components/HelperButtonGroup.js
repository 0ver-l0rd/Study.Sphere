import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import { setShowJoystick } from '../stores/UserStore';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getAvatarString, getColorByString } from '../util';
const Backdrop = styled.div `
  position: fixed;
  display: flex;
  gap: 10px;
  bottom: 16px;
  right: 16px;
  align-items: flex-end;

  .wrapper-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const Wrapper = styled.div `
  position: relative;
  font-size: 16px;
  color: #eee;

  /* Matches the desired backgroundColor */
  background-color: rgba(17, 25, 40, 0.75);

  /* Matches the specified shadow styles */
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1),
              0px 1px 0px 0px rgba(25, 28, 33, 0.02),
              0px 0px 0px 1px rgba(25, 28, 33, 0.08);

  /* Updated border radius */
  border-radius: 12px;
  
  /* Incorporate the backdrop filter styling */
  backdrop-filter: blur(16px) saturate(180%);

  /* Matches the desired border */
  border: 1px solid rgba(255, 255, 255, 0.125);

  padding: 15px 35px 15px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .tip {
    margin-left: 12px;
  }
`;
const ButtonGroup = styled.div `
  display: flex;
  gap: 10px;
`;
const Title = styled.h3 `
  font-size: 24px;
  color: #eee;
  text-align: center;
`;
const RoomName = styled.div `
  margin: 10px 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 24px;
    color: #eee;
  }
`;
const RoomDescription = styled.div `
  margin: 0 20px;
  max-width: 460px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`;
const StyledFab = styled(Fab) `
  &:hover {
    color: #1ea2df;
  }
`;
export default function HelperButtonGroup() {
    const [showControlGuide, setShowControlGuide] = useState(false);
    const [showRoomInfo, setShowRoomInfo] = useState(false);
    const showJoystick = useAppSelector((state) => state.user.showJoystick);
    const backgroundMode = useAppSelector((state) => state.user.backgroundMode);
    const roomJoined = useAppSelector((state) => state.room.roomJoined);
    const roomId = useAppSelector((state) => state.room.roomId);
    const roomName = useAppSelector((state) => state.room.roomName);
    const roomDescription = useAppSelector((state) => state.room.roomDescription);
    const dispatch = useAppDispatch();
    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
    };
    return (_jsxs(Backdrop, { children: [_jsxs("div", { className: "wrapper-group", children: [roomJoined && (_jsx(Tooltip, { title: showJoystick ? 'Disable virtual joystick' : 'Enable virtual joystick', children: _jsx(StyledFab, { size: "small", onClick: () => dispatch(setShowJoystick(!showJoystick)), children: showJoystick ? _jsx(VideogameAssetOffIcon, {}) : _jsx(VideogameAssetIcon, {}) }) })), showRoomInfo && (_jsxs(Wrapper, { children: [_jsx(IconButton, { className: "close", onClick: () => setShowRoomInfo(false), size: "small", children: _jsx(CloseIcon, {}) }), _jsxs(RoomName, { children: [_jsx(Avatar, { style: { background: getColorByString(roomName) }, children: getAvatarString(roomName) }), _jsx("h3", { children: roomName })] }), _jsxs(RoomDescription, { children: [_jsx(ArrowRightIcon, {}), " ID: ", roomId] }), _jsxs(RoomDescription, { children: [_jsx(ArrowRightIcon, {}), " Description: ", roomDescription] }), _jsx("p", { className: "tip", onClick: copyToClipboard, children: window.location.href })] })), showControlGuide && (_jsxs(Wrapper, { children: [_jsx(Title, { children: "Controls" }), _jsx(IconButton, { className: "close", onClick: () => setShowControlGuide(false), size: "small", children: _jsx(CloseIcon, {}) }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "W, A, S, D or arrow keys" }), " to move"] }), _jsxs("li", { children: [_jsx("strong", { children: "E" }), " to sit down (when facing a chair)"] }), _jsxs("li", { children: [_jsx("strong", { children: "R" }), " to use computer to screen share (when facing a computer)"] }), _jsxs("li", { children: [_jsx("strong", { children: "Enter" }), " to open chat"] }), _jsxs("li", { children: [_jsx("strong", { children: "ESC" }), " to close chat"] })] }), _jsxs("p", { className: "tip", children: [_jsx(LightbulbIcon, {}), "Video connection will start if you are close to someone else"] })] }))] }), _jsx(ButtonGroup, { children: roomJoined && (_jsxs(_Fragment, { children: [_jsx(Tooltip, { title: "Room Info", children: _jsx(StyledFab, { size: "small", onClick: () => {
                                    setShowRoomInfo(!showRoomInfo);
                                    setShowControlGuide(false);
                                }, children: _jsx(ShareIcon, {}) }) }), _jsx(Tooltip, { title: "Control Guide", children: _jsx(StyledFab, { size: "small", onClick: () => {
                                    setShowControlGuide(!showControlGuide);
                                    setShowRoomInfo(false);
                                }, children: _jsx(HelpOutlineIcon, {}) }) })] })) })] }));
}
