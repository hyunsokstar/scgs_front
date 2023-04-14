import { Select } from "@chakra-ui/react";

interface DateRangeOption {
  label: string;
  value: string;
}

interface DateRangeSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DateRangeSelect = ({ value, onChange }: DateRangeSelectProps) => {
  const options: DateRangeOption[] = [
    { label: "이번달", value: "thisMonth" },
    { label: "이번주", value: "thisWeek" },
    { label: "오늘", value: "today" },
  ];

  return (
    <Select value={value} onChange={onChange} w={200}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default DateRangeSelect;
