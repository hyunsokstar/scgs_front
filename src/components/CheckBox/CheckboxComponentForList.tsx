import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface CheckboxProps {
  value: number;
  checkedValues: number[];
  setCheckedValues: React.Dispatch<React.SetStateAction<number[]>>;
  colorScheme: string;
  border: string;
  size: "sm" | "md" | "lg";
  mr: number;
  defaultChecked: boolean;
}

const CheckboxComponentForList = ({
  value,
  checkedValues,
  setCheckedValues,
  defaultChecked,
  size,
  border,
  colorScheme,
  mr,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const isChecked = checkedValues.includes(value);
    // setIsChecked(isChecked);

    if (!isChecked) {
      // Add value to checkedValues array
      setCheckedValues((prev) => [...prev, value]);
    } else {
      // Remove value from checkedValues array
      setCheckedValues((prev) => prev.filter((val) => val !== value));
    }
  };

  return (
    <Checkbox
      size={size}
      border={border}
      colorScheme={colorScheme}
      isChecked={checkedValues.includes(value) ? true : false}
      mr={mr}
      value={value}
      onChange={handleCheckboxChange}
    />
  );
};

export default CheckboxComponentForList;
