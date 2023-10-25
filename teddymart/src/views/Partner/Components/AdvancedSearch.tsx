import React, { useState } from "react";
import ButtonSelect from "components/ButtonSelect";
import ButtonComponent from "components/ButtonComponent";
import { COLORS } from "constants/colors";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiCalendar } from "react-icons/bi";

export default function AdvancedSearch() {
  return (
    <div className="bg-white border p-5 my-4 rounded-md shadow-md">
      <h1 className="	font-semibold text-blue-600">Tìm kiếm nâng cao</h1>
      <div className="flex flex-row flex-wrap">
        <ButtonSelect
          iconRight={<BiCalendar style={{ marginLeft: 200 }} />}
          title=""
          label="Ngày tạo"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Chọn chi nhánh"
          label="Chi nhánh"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Chọn người tạo"
          label="Người tạo"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Chọn giới tính"
          label="Giới tính"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 50, color: "gray" }} />
          }
          title="Chọn hạng thẻ"
          label="Hạng thẻ"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="10.000"
          label="Dư nợ từ"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="100.000"
          label="Dư nợ tới"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="10.000"
          label="Tổng mua từ"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="100.000"
          label="Tổng mua tới"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="1"
          label="Điểm từ"
        />
        <ButtonSelect
          iconRight={
            <IoMdArrowDropdown style={{ marginLeft: 90, color: "gray" }} />
          }
          title="100"
          label="Điểm tới"
        />
      </div>
      <div className="flex justify-center gap-x-4 mt-4">
        <ButtonComponent
          color={COLORS.btn_main_bg}
          label="Tìm kiếm"
          onClick={() => alert("Button Clicked")}
        />
        <ButtonComponent
          color={COLORS.btn_main_bg}
          label="Đặt lại"
          onClick={() => alert("Button Clicked")}
        />
      </div>
    </div>
  );
}
