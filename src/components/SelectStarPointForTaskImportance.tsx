import { Select } from "@chakra-ui/react";

interface SelectStarPointForTaskImportanceProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectStarPointForTaskImportance = ({
  value,
  onChange,
}: SelectStarPointForTaskImportanceProps) => {
  const options = [...Array(5)].map((_, index) => ({
    label: `${index + 1}개 ${"⭐️".repeat(index + 1)}`,
    value: index + 1,
  }));

  return (
    <Select value={value} onChange={onChange} w={200}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
};

export default SelectStarPointForTaskImportance;