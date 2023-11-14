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
import { ProductTable } from "components/TableComponent";

export default function ProductScreen() {
  const [screens, setScreens] = useState()
  const [type, setType] = useState()
  const [productGroup, setProductGroup] = useState()
  const [status, setStatus] = useState()
  const [storeManagement, setStoreManagement] = useState()
  const [sort, setSort] = useState()
  const [search, setSearch] = useState()

  const chartWidth = window.innerWidth * 0.8;

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
            <div className="mx-2">
              <ButtonComponent
                  onClick={() => alert("Button Clicked")}
                  paddingHorizontal={10}
                  paddingVertical={10}
                  borderRadius={100}
                  iconLeft={<BiFilter style={{ color: "white", fontSize: 22 }} />}
                />
            </div>
          </div>
          <div className="flex justify-around">
              <div>
                <ButtonComponent
                    label="Delete"
                    onClick={() => alert("Button Clicked")}
                    backgroundColor = {COLORS.checkbox_bg}
                  />
                </div>
              <div>
                <ButtonComponent
                  label="Import or Export Excel"
                  onClick={() => alert("Button Clicked")}
                  backgroundColor = {COLORS.lightBlack}
                  iconLeft={
                    <LiaFileExcel
                      style={{ marginRight: 10, color: "white", fontSize: 22 }}
                    />
                  }
                />
              </div>
              <div>
                <ButtonComponent
                  label="Add new"
                  onClick={() => alert("Button Clicked")}
                  iconLeft={
                    <TiPlus style={{ marginRight: 10, color: "white", fontSize: 22 }} />
                  }
                />
              </div>
          </div>
          <div className="flex">
            <div className="flex-1">
              <ButtonSelect
                iconRight={
                  <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
                }
                width={200}
                title="Name: A-Z"
                label="Sort"
                value={sort}
                setValue={setSort}
                options={["Name: A-Z", "Name: Z-A", "Price: Low-High", "Price: High-Low", "Last update: Oldest", "Last update: Latest"]}
              />
            </div>

            <div className="flex-1">
              <ButtonSelect
                iconRight={
                  <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
                }
                width={200}
                title="All"
                label="Product Group"
                value={productGroup}
                setValue={setProductGroup}
                options={["Group 1", "Group 2"]}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{width: 'fit-content', margin: "auto" }}>
        <ResponsiveContainer width={chartWidth}>
          <ProductTable/>
        </ResponsiveContainer>
      </div>
    </div>
  )
  //   <div className="w-full">
  //     <Header width={"100%"} title={"Product"} />
  //     <div
  //       className="bg-white border-2 p-5 mx-1.5 my-1.5 rounded-md"
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         flexDirection: "column",
  //       }}
  //     >
  //       <div className="grid grid-cols-4 gap-4">
  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="Choose screens"
  //           label="Move to screens"
  //           value={screens}
  //           setValue={setScreens}
  //           options={[1, 2, 3]}
  //         />
  //         <div className="col-span-3 w-100% bg-white flex items-center justify-end gap-x-4">
  //           <ButtonComponent
  //             label="Cashier sync"
  //             onClick={() => alert("Button Clicked")}
  //             backgroundColor = {COLORS.lightBlack}
  //             iconLeft={
  //               <LiaScribd
  //                 style={{ marginRight: 10, color: "white", fontSize: 22 }}
  //               />
  //             }
  //           />
  //           <ButtonComponent
  //             label="Create Barcode"
  //             onClick={() => alert("Button Clicked")}
  //             backgroundColor = {COLORS.lightBlack}
  //           />
  //           <ButtonComponent
  //             label="Import or Export Excel"
  //             onClick={() => alert("Button Clicked")}
  //             backgroundColor = {COLORS.lightBlack}
  //             iconLeft={
  //               <LiaFileExcel
  //                 style={{ marginRight: 10, color: "white", fontSize: 22 }}
  //               />
  //             }
  //           />
  //           <ButtonComponent
  //             label="Add new"
  //             onClick={() => alert("Button Clicked")}
  //             iconLeft={
  //               <TiPlus style={{ marginRight: 10, color: "white", fontSize: 22 }} />
  //             }
  //           />
  //           <ButtonComponent
  //             onClick={() => alert("Button Clicked")}
  //             paddingHorizontal={10}
  //             paddingVertical={10}
  //             borderRadius={100}
  //             iconLeft={<BiFilter style={{ color: "white", fontSize: 22 }} />}
  //           />
  //           </div>
          
  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="All"
  //           label="Type"
  //           value={type}
  //           setValue={setType}
  //           options={["All", "Product", "Combo"]}
  //         />

  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="All"
  //           label="Product Group"
  //           value={productGroup}
  //           setValue={setProductGroup}
  //           options={["Group 1", "Group 2"]}
  //         />

  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="Available"
  //           label="Status"
  //           value={status}
  //           setValue={setStatus}
  //           options={["Available", "Unavailable", "All"]}
  //         />

  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="All"
  //           label="Store Management"
  //           value={storeManagement}
  //           setValue={setStoreManagement}
  //           options={["Yes", "No", "All"]}
  //         />

  //         <ButtonSelect
  //           iconRight={
  //             <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
  //           }
  //           width = "100%"
  //           title="Name: A-Z"
  //           label="Sort"
  //           value={sort}
  //           setValue={setSort}
  //           options={["Name: A-Z", "Name: Z-A", "Price: Low-High", "Price: High-Low", "Last update: Oldest", "Last update: Latest"]}
  //         />

  //         <SearchComponent/>
  //       </div>
  //     </div>
  //     <div style={{width: 'fit-content', margin: "auto" }}>
  //       <ResponsiveContainer width={chartWidth}>
  //         <ProductTable/>
  //       </ResponsiveContainer>
  //     </div>
  //   </div>
  // );
}
