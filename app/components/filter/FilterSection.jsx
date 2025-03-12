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
          borderColor: "#d5ab42",
          color: "#d5ab42",
        }}
      />
    ))}
  </RadioCardRoot>
);

export const FilterSection = ({ title, options, value, onValueChange }) => (
  <AccordionRoot collapsible variant="plain" className="filterBox">
    <AccordionItem>
      <AccordionItemTrigger className="filterText">
        {title}
      </AccordionItemTrigger>
      <AccordionItemContent>
        <RadioGroup
          options={options}
          value={value}
          onValueChange={onValueChange}
        />
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
);
