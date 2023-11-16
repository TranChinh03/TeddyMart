import React, { useState } from "react";
import Header from "components/Header";
import DropdownComponent from "components/DropdownComponent";
import ButtonSelect from "components/ButtonSelect";
import { IoMdArrowDropdown } from "react-icons/io";
import SearchComponent from "components/SearchComponent";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { LiaBarcodeSolid, LiaFileExcel, LiaRecycleSolid, LiaScribd } from "react-icons/lia";
import { TiPlus } from "react-icons/ti";
import { BiFilter } from "react-icons/bi";
import { ResponsiveContainer } from "recharts";
import { GroupProductTable, ProductTable } from "components/TableComponent";

export default function ProductScreen() {
  const [screens, setScreens] = useState()
  const [type, setType] = useState()
  const [productGroup, setProductGroup] = useState()
  const [status, setStatus] = useState()
  const [storeManagement, setStoreManagement] = useState()
  const [sort, setSort] = useState()
  const [search, setSearch] = useState()

  const chartWidth = window.innerWidth * 0.85;

  return (
    <div className="w-full">
      <Header width={"100%"} title={"Product"} ></Header>
      <div
        className="bg-white border-2 p-5 mx-1.5 my-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-start">
            <div className="mx-2">
              <ButtonSelect
                  iconRight={
                    <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
                  }
                  title="All"
                  label="Type"
                  value={type}
                  setValue={setType}
                  options={["All", "Product", "Combo"]}
                />
            </div>
            <div className="mx-2">
              <SearchComponent placeholder="Insert name to search!"/>
            </div>
          </div>
          <div className="flex justify-end items-center">
              <div className="mr-10">
                <ButtonComponent
                    label="Delete"
                    onClick={() => alert("Button Clicked")}
                    backgroundColor = {COLORS.checkbox_bg}
                  />
                </div>
              <div className="mr-10">
                <ButtonComponent
                  label="Add new"
                  onClick={() => alert("Button Clicked")}
                  iconLeft={
                    <TiPlus style={{ marginRight: 10, color: "white", fontSize: 22 }} />
                  }
                />
              </div>
          </div>
        </div>
        <div style={{width: 'fit-content', margin: "40px auto auto auto" }}>
          <ResponsiveContainer width={chartWidth}>
            <GroupProductTable/>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
