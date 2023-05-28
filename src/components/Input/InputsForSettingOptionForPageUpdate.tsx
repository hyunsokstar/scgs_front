import React, { useState, ChangeEvent } from "react";
import { Box, Input, Button } from "@chakra-ui/react";

interface InputsForSettingOptionForPageUpdateProps {
  // Add any props if needed
}

const InputsForSettingOptionForPageUpdate: React.FC<
  InputsForSettingOptionForPageUpdateProps
> = () => {
  const [from1, setFrom1] = useState("");
  const [from2, setFrom2] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");

  const [originArray, setOriginArray] = useState<number[]>([]);
  const [destinationArray, setDestinationArray] = useState<number[]>([]);

  const handleFrom1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setFrom1(event.target.value);
  };

  const handleFrom2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setFrom2(event.target.value);
  };

  const handleDestination1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination1(event.target.value);
  };

  const handleDestination2Change = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination2(event.target.value);
  };

  const buttonHandlerForSetPageNumbersToEdit = () => {
    // console.log("button click check 1");

    const x = parseInt(from1);
    const y = parseInt(from2);

    if (isNaN(x) || isNaN(y)) {
      alert('Please enter valid numbers for "from" values.');
      return;
    }

    if (y <= x) {
      alert(
        'The second "from" value should be greater than the first "from" value.'
      );
      return;
    }

    const fromArray = Array.from(
      { length: y - x + 1 },
      (_, index) => x + index
    );

    console.log("fromArray : ", fromArray);

    if (
      destinationArray.length > 0 &&
      fromArray[fromArray.length - 1] >= destinationArray[0]
    ) {
      alert(
        'Invalid input: The maximum value of "from" should be less than the minimum value of "to".'
      );
      return;
    }

    setOriginArray(fromArray);
  };

  const buttonHandlerForSetPageNumbersToDestination = () => {
    const x = parseInt(destination1);
    const y = parseInt(destination2);

    if (isNaN(x) || isNaN(y)) {
      alert('Please enter valid numbers for "to" values.');
      return;
    }

    if (y <= x) {
      alert(
        'The second "to" value should be greater than the first "to" value.'
      );
      return;
    }

    const destinationArray = Array.from(
      { length: y - x + 1 },
      (_, index) => x + index
    );
    console.log("destinationArray : ", destinationArray);

    if (
      originArray.length > 0 &&
      destinationArray[0] <= originArray[originArray.length - 1]
    ) {
      alert(
        'Invalid input: The minimum value of "to" should be greater than the maximum value of "from".'
      );
      return;
    }

    if(originArray.length !== destinationArray.length){
        alert("start array 와 destination array 는 범위가 같아야 합니다");
        return;
    }

    setDestinationArray(destinationArray);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
        border="1px solid gray"
        borderRadius="4px"
        p="2"
      >
        <Input
          placeholder=""
          width="50px"
          mx="2"
          value={from1}
          onChange={handleFrom1Change}
        />{" "}
        ~
        <Input width="50px" mx="2" value={from2} onChange={handleFrom2Change} />
        {/* <Button>from</Button> */}
        <Button onClick={() => buttonHandlerForSetPageNumbersToEdit()}>
          from
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
        border="1px solid gray"
        borderRadius="4px"
        p="2"
      >
        <Input
          placeholder=""
          width="50px"
          mx="2"
          value={destination1}
          onChange={handleDestination1Change}
        />{" "}
        ~
        <Input
          width="50px"
          mx="2"
          value={destination2}
          onChange={handleDestination2Change}
        />
        {/* <Button>to</Button> */}
        <Button onClick={buttonHandlerForSetPageNumbersToDestination}>
          to
        </Button>
      </Box>
    </Box>
  );
};

export default InputsForSettingOptionForPageUpdate;
