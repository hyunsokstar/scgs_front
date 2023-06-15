import React from 'react';
import { Box } from '@chakra-ui/react';
import YouTube from 'react-youtube';

interface PlayerForYouTubeProps {
  youtubeUrl: string;
}

const PlayerForYouTube: React.FC<PlayerForYouTubeProps> = ({ youtubeUrl }) => {
  const videoId = youtubeUrl.split('v=')[1];

  const opts = {
    width: '560',
    height: '315',
    playerVars: {
      autoplay: 0,
    },
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