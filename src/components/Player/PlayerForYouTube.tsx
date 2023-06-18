import React from "react";
import { Box } from "@chakra-ui/react";
import YouTube from "react-youtube";

interface PlayerForYouTubeProps {
  youtubeUrl: string;
}

const PlayerForYouTube: React.FC<PlayerForYouTubeProps> = ({ youtubeUrl }) => {
  const videoId = youtubeUrl.split("v=")[1];

  const opts = {
    width: "560",
    height: "315",
    playerVars: {
      autoplay: 0,
    },
    origin: ['http://127.0.0.1:3000','http://13.125.214.210/', 'https://www.youtube.com'],
  };

  const onReady = (event: any) => {
    event.target.pauseVideo();
  };

  return (
    <Box>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </Box>
  );
};

export default PlayerForYouTube;
