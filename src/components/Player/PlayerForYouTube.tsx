import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import YouTube from "react-youtube";

interface PlayerForYouTubeProps {
  youtubeUrl: string;
}

const PlayerForYouTube: React.FC<PlayerForYouTubeProps> = ({ youtubeUrl }) => {
  const videoId = youtubeUrl.split("v=")[1];
  const heightOptionForYoutube = useBreakpointValue({
    base: "315", // default value for all breakpoints
    md: "315", // for medium-sized screens and up
    sm: "315", // for small screens and up
    lg: "600", // for small screens and up
  });

  const opts = {
    width: "100%", // Update the width to "100%"
    height: heightOptionForYoutube,
    playerVars: {
      autoplay: 0,
    },
    origin: [
      "http://127.0.0.1:3000",
      "http://13.125.214.210/",
      "https://www.youtube.com",
    ],
  };

  const onReady = (event: any) => {
    event.target.pauseVideo();
  };

  return (
    <Box width={"100%"}>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} />
    </Box>
  );
};

export default PlayerForYouTube;
