import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Adam from '../images/login/Adam_login.png';
import Ash from '../images/login/Ash_login.png';
import Lucy from '../images/login/Lucy_login.png';
import Nancy from '../images/login/Nancy_login.png';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setLoggedIn } from '../stores/UserStore';
import { getAvatarString, getColorByString } from '../util';
import phaserGame from '../PhaserGame';
const Wrapper = styled.form `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  /* Matches the desired backgroundColor */
  background-color: rgba(17, 25, 40, 0.75); 
  
  /* Updated border radius */
  border-radius: 12px;
  
  /* Matches the desired border */
  border: 1px solid rgba(255, 255, 255, 0.125); 
  
  /* Incorporate the shadow styling */
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1), 
              0px 1px 0px 0px rgba(25, 28, 33, 0.02), 
              0px 0px 0px 1px rgba(25, 28, 33, 0.08);

  /* Incorporate the backdrop filter styling */
  backdrop-filter: blur(16px) saturate(180%);
  
  padding: 36px 60px;
`;
const Title = styled.p `
  margin: 5px;
  font-size: 20px;
  color: #c2c2c2;
  text-align: center;
`;
const RoomName = styled.div `
  max-width: 500px;
  max-height: 120px;
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
  max-width: 500px;
  max-height: 150px;
  overflow-wrap: anywhere;
  overflow-y: auto;
  font-size: 16px;
  color: #c2c2c2;
  display: flex;
  justify-content: center;
`;
const SubTitle = styled.h3 `
  width: 160px;
  font-size: 16px;
  color: #eee;
  text-align: center;
`;
const Content = styled.div `
  display: flex;
  margin: 36px 0;
`;
const Left = styled.div `
  margin-right: 48px;

  --swiper-navigation-size: 24px;

  .swiper {
    width: 160px;
    height: 220px;
    border-radius: 8px;
    overflow: hidden;
  }

  .swiper-slide {
    width: 160px;
    height: 220px;
    background: #000319;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 95px;
    height: 136px;
    object-fit: contain;
  }
`;
const Right = styled.div `
  width: 300px;
`;
const Bottom = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Warning = styled.div `
  margin-top: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;
const avatars = [
    { name: 'adam', img: Adam },
    { name: 'ash', img: Ash },
    { name: 'lucy', img: Lucy },
    { name: 'nancy', img: Nancy },
];
// shuffle the avatars array
for (let i = avatars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [avatars[i], avatars[j]] = [avatars[j], avatars[i]];
}
export default function LoginDialog() {
    const [name, setName] = useState('');
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [nameFieldEmpty, setNameFieldEmpty] = useState(false);
    const dispatch = useAppDispatch();
    const videoConnected = useAppSelector((state) => state.user.videoConnected);
    const roomJoined = useAppSelector((state) => state.room.roomJoined);
    const roomName = useAppSelector((state) => state.room.roomName);
    const roomDescription = useAppSelector((state) => state.room.roomDescription);
    const game = phaserGame.scene.keys.game;
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === '') {
            setNameFieldEmpty(true);
        }
        else if (roomJoined) {
            console.log('Join! Name:', name, 'Avatar:', avatars[avatarIndex].name);
            game.registerKeys();
            game.myPlayer.setPlayerName(name);
            game.myPlayer.setPlayerTexture(avatars[avatarIndex].name);
            game.network.readyToConnect();
            dispatch(setLoggedIn(true));
        }
    };
    return (_jsxs(Wrapper, { onSubmit: handleSubmit, children: [_jsx(Title, { children: "Joining" }), _jsxs(RoomName, { children: [_jsx(Avatar, { style: { background: getColorByString(roomName) }, children: getAvatarString(roomName) }), _jsx("h3", { children: roomName })] }), _jsx(RoomDescription, { children: roomDescription }), _jsxs(Content, { children: [_jsxs(Left, { children: [_jsx(SubTitle, { children: "Select an avatar" }), _jsx(Swiper, { modules: [Navigation], navigation: true, spaceBetween: 0, slidesPerView: 1, onSlideChange: (swiper) => {
                                    setAvatarIndex(swiper.activeIndex);
                                }, children: avatars.map((avatar) => (_jsx(SwiperSlide, { children: _jsx("img", { src: avatar.img, alt: avatar.name }) }, avatar.name))) })] }), _jsxs(Right, { children: [_jsx(TextField, { autoFocus: true, fullWidth: true, label: "Name", variant: "outlined", color: "secondary", error: nameFieldEmpty, helperText: nameFieldEmpty && 'Name is required', onInput: (e) => {
                                    setName(e.target.value);
                                } }), !videoConnected && (_jsxs(Warning, { children: [_jsxs(Alert, { variant: "outlined", severity: "warning", children: [_jsx(AlertTitle, { children: "Warning" }), "No webcam/mic connected - ", _jsx("strong", { children: "connect one for best experience!" })] }), _jsx(Button, { variant: "outlined", color: "secondary", onClick: () => {
                                            game.network.webRTC?.getUserMedia();
                                        }, children: "Connect Webcam" })] })), videoConnected && (_jsx(Warning, { children: _jsx(Alert, { variant: "outlined", children: "Webcam connected!" }) }))] })] }), _jsx(Bottom, { children: _jsx(Button, { variant: "contained", color: "secondary", size: "large", type: "submit", children: "Join" }) })] }));
}
