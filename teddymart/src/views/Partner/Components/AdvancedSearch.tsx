import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import ButtonComponent from "components/ButtonComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";

export default function AdvancedSearch() {
  const [branch, setBranch] = useState();
  const [creator, setCreator] = useState();
  const [gender, setGender] = useState();
  const [rankCard, setRankCard] = useState();
  const [creatorName, setCreatorName] = useState("");
  return (
    <div className="bg-white border p-5 my-4 rounded-md shadow-md">
      <h1 className="	font-semibold text-blue-600">Tìm kiếm nâng cao</h1>
      <div className="flex flex-row flex-wrap gap-4">
        <ButtonSelect
          iconRight={<BiCalendar style={{ marginLeft: 200 }} />}
          title=""
          label="Date created"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Select branch"
          label="Branch"
          value={branch}
          setValue={setBranch}
          options={[1, 2, 3]}
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Select creator"
          label="Creator"
          value={creator}
          setValue={setCreator}
          options={[1, 2, 3]}
        />
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
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Choose rank card"
          label="Rank card"
          value={rankCard}
          setValue={setRankCard}
          options={[1, 2, 3]}
        />
         <TextInputComponent
          label="Debt balance from"
          placeHolder={"10.000"}
          value={creatorName} 
          setValue={setCreatorName}
        />
        <TextInputComponent
          label="Toward balance"
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
        <TextInputComponent
          label="Point from"
          placeHolder={"1"}
          value={creatorName} 
          setValue={setCreatorName}
        />
        <TextInputComponent
          label="Destination"
          placeHolder={"100"}
          value={creatorName} 
          setValue={setCreatorName}
        />
      </div>
      <div className="flex justify-center gap-x-4 mt-4">
        <ButtonComponent
          label="Tìm kiếm"
          onClick={() => alert("Button Clicked")}
        />
        <ButtonComponent
          label="Đặt lại"
          onClick={() => alert("Button Clicked")}
        />
      </div>
    </div>
  );
}
