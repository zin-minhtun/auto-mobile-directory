import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function NavBar({ title }) {
  const navigate = useNavigate();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const goBack = () => {
    navigate('/admin');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-gray-100 p-4 sm:p-2 flex items-center h-14 sm:h-16 flex-wrap">
      <button onClick={goBack} className="mr-6 sm:mr-4">
        <ArrowBackIosSharpIcon className="text-lg sm:text-sm" />
      </button>
      <h1 className="text-xl sm:text-lg flex-1 font-semibold text-center sm:text-left capitalize">{title}</h1>
      <button onClick={toggleFullScreen} className="text-gray-200">
        {isFullScreen ? (
          <FullscreenExitIcon sx={{ fontSize: 28 }} className="text-2xl sm:text-lg" />
        ) : (
          <FullscreenIcon sx={{ fontSize: 28 }} className="text-2xl sm:text-lg" />
        )}
      </button>
    </nav>
  );
}
