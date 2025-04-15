import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";

const RadioGroup = ({ options, value, onValueChange }) => (
  <RadioCardRoot
    value={value}
    onValueChange={onValueChange}
    orientation="vertical"
  >
    {options.map((option) => (
      <RadioCardItem
        key={option.value}
        value={option.value}
        indicator={false}
        label={option.label}
        className="filterRadioCard"
        _checked={{
          border: "1px solid #d5ab42 ",
          color: "#d5ab42",
          boxShadow: "none",
        }}
      />
    ))}
  </RadioCardRoot>
);

export const FilterSection = ({ title, options, value, onValueChange }) => (
  <div className="filterBox">
    <h3 className="filterText">{title}</h3>
    <RadioGroup options={options} value={value} onValueChange={onValueChange} />
  </div>
);
