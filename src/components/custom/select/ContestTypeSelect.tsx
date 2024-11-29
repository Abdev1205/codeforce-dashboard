import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import React from "react";
import { LuListFilter } from "react-icons/lu";
import { RiCloseLargeLine } from "react-icons/ri";

interface ContestTypeSelectProps {
  options: { label: string; value: string }[];
  selected: string;
  onChange: (value: string) => void;
}

const ContestTypeSelect: React.FC<ContestTypeSelectProps> = ({
  options,
  selected,
  onChange,
}) => {
  const handleSelectType = (type: string) => {
    onChange(type);
  };

  const handleRemoveType = () => {
    onChange("");
  };

  return (
    <div className="flex items-center w-full">
      {/* Selected Filter Display */}
      <div className="mx-[1rem]">
        {selected && (
          <div className="flex items-center text-white">
            <div className="w-0 h-0 border-t-[14px] border-b-[14px] border-r-[20px] border-transparent border-r-primary"></div>
            <div className="text-sm flex items-center gap-[.5rem] bg-primary w-fit px-[.4rem] py-[.3rem]">
              {`${selected}`}
              <RiCloseLargeLine
                onClick={handleRemoveType}
                className="text-white cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
      {/* Filter Dropdown */}
      <Select value={selected || undefined} onValueChange={handleSelectType}>
        <SelectTrigger className="flex items-center gap-[.3rem] cursor-pointer bg-gray-100 p-[.3rem] px-[.5rem] rounded-[.3rem] focus:ring-0">
          <LuListFilter className="text-lg" />
          <span>Type</span>
        </SelectTrigger>
        <SelectContent className=" rounded-[.3rem] ">
          {options.map((option) => (
            <SelectItem
              className=" cursor-pointer "
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ContestTypeSelect;
