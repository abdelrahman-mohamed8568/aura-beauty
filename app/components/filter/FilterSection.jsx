import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { DialogActionTrigger } from "@/components/ui/dialog";

const RadioGroup = ({ options, value, onValueChange }) => (
  <RadioCardRoot
    value={value}
    onValueChange={onValueChange}
    orientation="vertical"
  >
    {options.map((option) => (
      <DialogActionTrigger asChild key={option.value}>
        <RadioCardItem
          value={option.value}
          indicator={false}
          label={option.label}
          className="filterRadioCard"
          _checked={{
            border: "1px solid #d5ab42 ",
            color: "#d5ab42",
            boxShadow: "none",
          }}
          onClick={() => onValueChange(option)}
        />
      </DialogActionTrigger>
    ))}
  </RadioCardRoot>
);

export const FilterSection = ({ title, options, value, onValueChange }) => (
  <div className="filterBox">
    <h3 className="filterText">{title}</h3>
    <RadioGroup options={options} value={value} onValueChange={onValueChange} />
  </div>
);
