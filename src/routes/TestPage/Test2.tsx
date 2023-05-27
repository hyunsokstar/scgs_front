import React, { MouseEvent } from 'react';
import { Button } from '@chakra-ui/react';

const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  if (event.shiftKey) {
    console.log('shift click');
  } else {
    console.log('just click');
  }
};

const Test2: React.FC = () => {
  return (
    <Button onClick={handleClick} variant={"outline"}>
      Click me
    </Button>
  );
};

export default Test2;
