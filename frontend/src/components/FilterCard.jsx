import React, { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radiogroup";
import { setSearchedQuery } from "@/redux/jobslice";
import { useDispatch } from "react-redux";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bengaluru", "Hyderabad", "Pune", "Chennai", "Kolkata"],
  },
  {
    filterType: "Categories",
    array: ["Front-End Developer", "Back-End Developer", "Full-Stack Developer", "Software Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-3LPA", "6-10LPA", "15-25LPA", "50LPA+"],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
    console.log(selectedValue);
}, [selectedValue]);


  return (
    <div className="pl-3 w-full bg-white rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="mb-3">
          <h1 className="font-medium mb-2">{data.filterType}</h1>
          <RadioGroup
            value={selectedValue}
            onValueChange={changeHandler}
            className="space-y-3"
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}

export default FilterCard;
