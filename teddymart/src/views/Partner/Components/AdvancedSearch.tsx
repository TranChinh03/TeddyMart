import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import { ButtonComponent, ListCheckBox, SearchComponent, TextInputComponent, ModalSelectDate } from "components";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";

export default function AdvancedSearch() {
  const [gender, setGender] = useState();
  const [creatorName, setCreatorName] = useState("");
  const [isAdvancedSearchVisible, setAdvancedSearchVisible] = useState(false);
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  return (
    <div className="bg-white border my-4 rounded-md shadow-md h-full">
      <div
        className="relative flex flex-wrap justify-between items-center hover:bg-gray-200 p-5"
        role="button"
        onClick={() => setAdvancedSearchVisible(!isAdvancedSearchVisible)}
      >
        <input
          type="checkbox"
          className="peer absolute inset-x-0 w-full h-12 z-10 cursor-pointer opacity-0"
        />
        <h1 className="	font-semibold text-blue-600">Tìm kiếm nâng cao</h1>
        <IoMdArrowDropdown className="transition-transform duration-500 rotate-0 peer-checked:rotate-180" />
      </div>


      <div className={`overflow-hidden transition-all duration-500 ${isAdvancedSearchVisible ? "max-h-96" : "max-h-0"}`}>
        <div className="flex flex-wrap gap-8 p-5">
          <div className="flex flex-row flex-wrap gap-8">
            <ModalSelectDate setResult={setDate} />
            <ButtonSelect
              iconRight={
                <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
              }
              title="Select gender"
              label="Gender"
              value={gender}
              setValue={setGender}
              options={[1, 2, 3]}
            />
            <TextInputComponent
              label="Debt balance from"
              placeHolder={"10.000"}
              value={creatorName}
              setValue={setCreatorName}
            />
            <TextInputComponent
              label="Debt balance to"
              placeHolder={"100.000"}
              value={creatorName}
              setValue={setCreatorName}
            />
            <TextInputComponent
              label="Total purchases from"
              placeHolder={"10.000"}
              value={creatorName}
              setValue={setCreatorName}
            />
            <TextInputComponent
              label="Total purchases to"
              placeHolder={"100.000"}
              value={creatorName}
              setValue={setCreatorName}
            />
          </div>
        </div>

        <div className="flex justify-center gap-x-4 mt-4 pb-5">
          <ButtonComponent
            label="Search"
            onClick={() => alert("Button Clicked")}
          />
          <ButtonComponent
            label="Reset"
            onClick={() => alert("Button Clicked")}
          />
        </div>
      </div>
    </div>
  );
}
