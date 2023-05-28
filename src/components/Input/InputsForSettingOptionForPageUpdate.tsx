import React, { useState, ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Input, Button } from "@chakra-ui/react";
import { RootState } from "../../store";
import {
  setPageNumbersToEdit,
  setPageNumbersToMove2,
} from "../../reducers/studyNoteSlice";

interface InputsForSettingOptionForPageUpdateProps {
  // Add any props if needed
}

const InputsForSettingOptionForPageUpdate: React.FC<
  InputsForSettingOptionForPageUpdateProps
> = () => {
  const dispatch = useDispatch();

  const [from1, setFrom1] = useState("");
  const [from2, setFrom2] = useState("");
  const [destination1, setDestination1] = useState("");
  const [destination2, setDestination2] = useState("");

  const pageNumbersToEdit = useSelector(
    (state: RootState) => state.studyNote.pageNumbersToEdit
  );

  const pageNumbersToMove = useSelector(
    (state: RootState) => state.studyNote.pageNumbersToMove
  );

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

    if (y < x) {
      alert("시작점이 끝점보다 클 수 없습니다");
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
    // setPageNumbersToEdit 를 dispatch 해서 fromArray 를 넘겨서 pageNumbersToEdit에 저장 하고 싶어
    dispatch(setPageNumbersToEdit(fromArray));
  };

  const buttonHandlerForSetPageNumbersToDestination = () => {

    if(destination1 === "" || destination1 <= from2) {
        alert("목적지가 비어있으면 안되며 출발지보다 커야 합니다")
        return;
    }

    if (destination2 === "") {
      const result = parseInt(from2) - parseInt(from1) + parseInt(destination1);
      setDestination2(result.toString());
    }    

    const x = parseInt(destination1);
    const y = parseInt(destination2);

    if (isNaN(x)) {
      alert('Please enter valid numbers for "to" values.');
      return;
    }

    if (y < x) {
      alert("시작점이 끝점보다 클수 없습니다.");
      return;
    }

    const destinationArray = Array.from(
        { length: y - x + 1 },
        (_, index) => x + index
      );
      console.log("destinationArray : ", destinationArray);

    setDestinationArray(destinationArray);
    dispatch(setPageNumbersToMove2(destinationArray));
    
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
          fr
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
