import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../hooks';
import { closeComputerDialog } from '../stores/ComputerStore';
import Video from './Video';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px 180px 16px 16px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(17, 25, 40, 0.75); 
  border-radius: 12px; 
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.1),
              0px 1px 0px 0px rgba(25, 28, 33, 0.02),
              0px 0px 0px 1px rgba(25, 28, 33, 0.08);
  backdrop-filter: blur(16px) saturate(180%);
  padding: 16px;
  color: #eee;
  position: relative;
  display: flex;
  flex-direction: column;

  .close {
    position: absolute;
    top: 0px;
    right: 0px;
  }
`;

const VideoGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));

  .video-container {
    position: relative;
    background: black;
    border-radius: 8px;
    overflow: hidden;

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      min-width: 0;
      min-height: 0;
      object-fit: contain;
    }

    .player-name {
      position: absolute;
      bottom: 16px;
      left: 16px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      text-shadow: 0 1px 2px rgb(0 0 0 / 60%), 0 0 2px rgb(0 0 0 / 30%);
      white-space: nowrap;
    }
  }
`;

function VideoContainer({ playerName, stream }) {
  return (
    _jsxs("div", { className: "video-container", children: [
      _jsx(Video, { srcObject: stream, autoPlay: true }),
      playerName && _jsx("div", { className: "player-name", children: playerName })
    ] })
  );
}

export default function ComputerDialog() {
  const dispatch = useAppDispatch();
  const playerNameMap = useAppSelector((state) => state.user.playerNameMap);
  const shareScreenManager = useAppSelector((state) => state.computer.shareScreenManager);
  const myStream = useAppSelector((state) => state.computer.myStream);
  const peerStreams = useAppSelector((state) => state.computer.peerStreams);

  // New function for the additional button action
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
    // Function to redirect to a new link
    const redirectToLink = () => {
      window.location.href = 'https://www.example.com'; // Replace this with your desired URL
    };

  return (
    _jsx(Backdrop, {
      children: _jsxs(Wrapper, {
        children: [
          _jsx(IconButton, {
            "aria-label": "close dialog",
            className: "close",
            onClick: () => dispatch(closeComputerDialog()),
            children: _jsx(CloseIcon, {})
          }),

          _jsxs("div", { className: "toolbar", children: [
            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: () => {
                if (shareScreenManager?.myStream) {
                  shareScreenManager?.stopScreenShare();
                } else {
                  shareScreenManager?.startScreenShare();
                }
              },
              children: shareScreenManager?.myStream ? 'Stop sharing' : 'Share Screen'
            }),

            // New Button for toggling fullscreen
            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
              children: "CourseGen"
<<<<<<< HEAD
            }),
            
=======
            })
>>>>>>> 6d525e19346469b7dcdd69e60e54e313ea181ee8
            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
<<<<<<< HEAD
              children: "White Bored"
            }),
            
=======
              children: "CourseGen"
            })
>>>>>>> 6d525e19346469b7dcdd69e60e54e313ea181ee8
            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
<<<<<<< HEAD
              children: "Code Collabrator"
            }),

            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
              children: "Web Chat"
            }),

            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
              children: "Mock Interview"
            }),

            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
              children: "Mock Exams "
            }),
            _jsx(Button, {
              variant: "contained",
              color: "secondary",
              onClick: redirectToLink,
              style: { marginLeft: '8px' }, // Added margin for spacing
              children: "Resume"
            }),
            
            
            
            
            
=======
              children: "CourseGen"
            })
>>>>>>> 6d525e19346469b7dcdd69e60e54e313ea181ee8
          ]}),

          // Video Grid section
          _jsxs(VideoGrid, {
            children: [
              myStream && _jsx(VideoContainer, { stream: myStream, playerName: "You" }),
              [...peerStreams.entries()].map(([id, { stream }]) => {
                const playerName = playerNameMap.get(id);
                return _jsx(VideoContainer, { playerName, stream }, id);
              })
            ]
          })
        ]
      })
    })
  );
}
