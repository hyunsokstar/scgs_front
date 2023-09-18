import React, { useState } from "react";
import { Switch } from "@chakra-ui/react";

interface IProps {
  challengeId: number | string;
  userName: string;
  criteria: string;
  option: "undecided" | "fail" | "pass" | string;
}

// 옵션에 따라 색상을 반환하는 함수
const getColorScheme = (option: IProps["option"]) => {
  switch (option) {
    case "undecided":
      return "yellow";
    case "fail":
      return "red";
    case "pass":
      return "green";
    default:
      return undefined;
  }
};

const ToggleButtonForUpdateResultForEvaluationForChallenge: React.FC<
  IProps
> = ({ challengeId, userName, criteria, option }: IProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  const colorScheme = getColorScheme(option);

  return (
    <Switch
      colorScheme={colorScheme}
      isChecked={isChecked}
      onChange={handleChange}
    >
      {challengeId}, {userName}, {criteria}
    </Switch>
  );
};

export default ToggleButtonForUpdateResultForEvaluationForChallenge;
