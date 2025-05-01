"use client";

import React from "react";
import { RadioCardItem, RadioCardRoot } from "@/components/ui/radio-card";
import { DialogActionTrigger } from "@/components/ui/dialog";

export const PRICE_OPTIONS = [
  { value: "1", label: "default" },
  { value: "2", label: "high to low" },
  { value: "3", label: "low to high" },
];

export const STOCK_OPTIONS = [
  { value: "1", label: "default" },
  { value: "2", label: "stock" },
  { value: "3", label: "out of stock" },
];

export const DATE_OPTIONS = [
  { value: "1", label: "default" },
  { value: "2", label: "(A > Z)" },
  { value: "3", label: "(Z > A)" },
];

export function FilterSection({ title, options, value, onValueChange }) {
  return (
    <div className="filterBox">
      <h3 className="filterText">{title}</h3>
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
                border: "1px solid #d5ab42",
                color: "#d5ab42",
                boxShadow: "none",
              }}
            />
          </DialogActionTrigger>
        ))}
      </RadioCardRoot>
    </div>
  );
}
