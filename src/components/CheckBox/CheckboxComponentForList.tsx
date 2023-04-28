import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface CheckboxProps {
  value: number;
  setCheckedValues: React.Dispatch<React.SetStateAction<number[]>>;
  colorScheme: string;
  border: string;
  size: "sm" | "md" | "lg";
  mr: number;
  defaultChecked: boolean;
}

const CheckboxComponentForList = ({
  value,
  setCheckedValues,
  defaultChecked,
  size,
  border,
  colorScheme,
  mr,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsChecked(isChecked);

    if (isChecked) {
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
      isChecked={isChecked}
      mr={mr}
      value={value}
      onChange={handleCheckboxChange}
    />
  );
};

export default CheckboxComponentForList;

// const [checkedValues, setCheckedValues] = useState<number[]>([]);

// rows.map((row) => (
//   <CheckboxComponent
//     size="lg"
//     border={"1px solid green"}
//     colorScheme="green"
//     defaultChecked
//     mr={1}
//     value={row.pk}
//     setCheckedValues={setCheckedValues}
//   />
// ));

// // Access the checked values
// console.log(checkedValues);
