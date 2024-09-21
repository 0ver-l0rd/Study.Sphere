import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import JoystickItem from './Joystick';
import phaserGame from '../PhaserGame';
import { useAppSelector } from '../hooks';
const Backdrop = styled.div `
  position: fixed;
  bottom: 100px;
  right: 32px;
  max-height: 50%;
  max-width: 100%;
`;
const Wrapper = styled.div `
  position: relative;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;
const JoystickWrapper = styled.div `
  margin-top: auto;
  align-self: flex-end;
`;
export const minimumScreenWidthSize = 650; //px
const isSmallScreen = (smallScreenSize) => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return width <= smallScreenSize;
};
export default function MobileVirtualJoystick() {
    const showJoystick = useAppSelector((state) => state.user.showJoystick);
    const showChat = useAppSelector((state) => state.chat.showChat);
    const hasSmallScreen = isSmallScreen(minimumScreenWidthSize);
    const game = phaserGame.scene.keys.game;
    useEffect(() => { }, [showJoystick, showChat]);
    const handleMovement = (movement) => {
        game.myPlayer?.handleJoystickMovement(movement);
    };
    return (_jsx(Backdrop, { children: _jsx(Wrapper, { children: !(showChat && hasSmallScreen) && showJoystick && (_jsx(JoystickWrapper, { children: _jsx(JoystickItem, { onDirectionChange: handleMovement }) })) }) }));
}
