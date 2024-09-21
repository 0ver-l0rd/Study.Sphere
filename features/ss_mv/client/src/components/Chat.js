import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import phaserGame from '../PhaserGame';
import { getColorByString } from '../util';
import { useAppDispatch, useAppSelector } from '../hooks';
import { MessageType, setFocused, setShowChat } from '../stores/ChatStore';
const Backdrop = styled.div `
  position: fixed;
  bottom: 60px;
  left: 0;
  height: 400px;
  width: 500px;
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
const FabWrapper = styled.div `
  margin-top: auto;
`;
const ChatHeader = styled.div `
  position: relative;
  height: 35px;
  background: #000000a7;
  border-radius: 10px 10px 0px 0px;

  h3 {
    color: #fff;
    margin: 7px;
    font-size: 17px;
    text-align: center;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
const ChatBox = styled(Box) `
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #2c2c2c;
  border: 1px solid #00000029;
`;
const MessageWrapper = styled.div `
  display: flex;
  flex-wrap: wrap;
  padding: 0px 2px;

  p {
    margin: 3px;
    text-shadow: 0.3px 0.3px black;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  span {
    color: white;
    font-weight: normal;
  }

  .notification {
    color: grey;
    font-weight: normal;
  }

  :hover {
    background: #3a3a3a;
  }
`;
const InputWrapper = styled.form `
  box-shadow: 10px 10px 10px #00000018;
  border: 1px solid #000319;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
`;
const InputTextField = styled(InputBase) `
  border-radius: 0px 0px 10px 10px;
  input {
    padding: 5px;
  }
`;
const EmojiPickerWrapper = styled.div `
  position: absolute;
  bottom: 54px;
  right: 16px;
`;
const dateFormatter = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    dateStyle: 'short',
});
const Message = ({ chatMessage, messageType }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    return (_jsx(MessageWrapper, { onMouseEnter: () => {
            setTooltipOpen(true);
        }, onMouseLeave: () => {
            setTooltipOpen(false);
        }, children: _jsx(Tooltip, { open: tooltipOpen, title: dateFormatter.format(chatMessage.createdAt), placement: "right", arrow: true, children: messageType === MessageType.REGULAR_MESSAGE ? (_jsxs("p", { style: {
                    color: getColorByString(chatMessage.author),
                }, children: [chatMessage.author, ": ", _jsx("span", { children: chatMessage.content })] })) : (_jsxs("p", { className: "notification", children: [chatMessage.author, " ", chatMessage.content] })) }) }));
};
export default function Chat() {
    const [inputValue, setInputValue] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [readyToSubmit, setReadyToSubmit] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const chatMessages = useAppSelector((state) => state.chat.chatMessages);
    const focused = useAppSelector((state) => state.chat.focused);
    const showChat = useAppSelector((state) => state.chat.showChat);
    const dispatch = useAppDispatch();
    const game = phaserGame.scene.keys.game;
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            // move focus back to the game
            inputRef.current?.blur();
            dispatch(setShowChat(false));
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // this is added because without this, 2 things happen at the same
        // time when Enter is pressed, (1) the inputRef gets focus (from
        // useEffect) and (2) the form gets submitted (right after the input
        // gets focused)
        if (!readyToSubmit) {
            setReadyToSubmit(true);
            return;
        }
        // move focus back to the game
        inputRef.current?.blur();
        const val = inputValue.trim();
        setInputValue('');
        if (val) {
            game.network.addChatMessage(val);
            game.myPlayer.updateDialogBubble(val);
        }
    };
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        }
    }, [focused]);
    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, showChat]);
    return (_jsx(Backdrop, { children: _jsx(Wrapper, { children: showChat ? (_jsxs(_Fragment, { children: [_jsxs(ChatHeader, { children: [_jsx("h3", { children: "Chat" }), _jsx(IconButton, { "aria-label": "close dialog", className: "close", onClick: () => dispatch(setShowChat(false)), size: "small", children: _jsx(CloseIcon, {}) })] }), _jsxs(ChatBox, { children: [chatMessages.map(({ messageType, chatMessage }, index) => (_jsx(Message, { chatMessage: chatMessage, messageType: messageType }, index))), _jsx("div", { ref: messagesEndRef }), showEmojiPicker && (_jsx(EmojiPickerWrapper, { children: _jsx(Picker, { theme: "dark", showSkinTones: false, showPreview: false, onSelect: (emoji) => {
                                        setInputValue(inputValue + emoji.native);
                                        setShowEmojiPicker(!showEmojiPicker);
                                        dispatch(setFocused(true));
                                    }, exclude: ['recent', 'flags'] }) }))] }), _jsxs(InputWrapper, { onSubmit: handleSubmit, children: [_jsx(InputTextField, { inputRef: inputRef, autoFocus: focused, fullWidth: true, placeholder: "Press Enter to chat", value: inputValue, onKeyDown: handleKeyDown, onChange: handleChange, onFocus: () => {
                                    if (!focused) {
                                        dispatch(setFocused(true));
                                        setReadyToSubmit(true);
                                    }
                                }, onBlur: () => {
                                    dispatch(setFocused(false));
                                    setReadyToSubmit(false);
                                } }), _jsx(IconButton, { "aria-label": "emoji", onClick: () => setShowEmojiPicker(!showEmojiPicker), children: _jsx(InsertEmoticonIcon, {}) })] })] })) : (_jsx(FabWrapper, { children: _jsx(Fab, { color: "secondary", "aria-label": "showChat", onClick: () => {
                        dispatch(setShowChat(true));
                        dispatch(setFocused(true));
                    }, children: _jsx(ChatBubbleOutlineIcon, {}) }) })) }) }));
}
