import {
  Button,
  Checkbox,
  Space,
  DatePicker,
  Dropdown,
  MenuProps,
  Tooltip,
  TabsProps,
  Tabs,
} from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import DropdownImage from "components/DropDownImage";
import DropdownComponent from "components/DropdownComponent";
import { BillTable } from "components/TableComponent";
import TextInputComponent from "components/TextInputComponent";
import { COLORS } from "constants/colors";
import { title } from "process";
import React, { useState } from "react";
import {
  BiDotsVerticalRounded,
  BiBell,
  BiStar,
  BiFilter,
  BiSearch,
  BiSave,
  BiDownload,
} from "react-icons/bi";
const { RangePicker } = DatePicker;

export default function SaleScreen() {
  const [language, setLanguage] = useState("");
  const [time, setTime] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Tất cả đơn hàng (0)",
    },
    {
      key: "2",
      label: "Chưa thanh toán (0)",
    },
    {
      key: "3",
      label: "Thanh toán 1 phần",
    },
    {
      key: "4",
      label: "Thanh toán 100% (0)",
    },
    {
      key: "5",
      label: "Đơn trả (0)",
    },
    {
      key: "6",
      label: "Đơn nợ  (0)",
    },
  ];
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <div
      className="font-roboto h-screen w-full"
      style={{
        backgroundColor: COLORS.lightGray,
      }}
    >
      {/*Header */}
      <header className="w-[100%] bg-white flex items-center py-5 px-5">
        <Button
          shape="circle"
          icon={<BiDotsVerticalRounded size={20} color="white" />}
          style={{ backgroundColor: COLORS.txt_lightgrey }}
          size="large"
        />
        <h1 className=" ml-2 text-xl">Đơn hàng</h1>
        <div className="flex-auto" />
        <DropdownImage
          options={[
            {
              image:
                "https://i.pinimg.com/564x/2a/cb/7d/2acb7d9371550e4f145d5a1a841a41cb.jpg",
              title: "VI",
            },
          ]}
          placeholder="VI"
          value={language}
          setValue={setLanguage}
        />
        <div className="w-2" />
        <DropdownComponent
          options={["TKE: 30/10/2023"]}
          placeholder="TKE: 30/10/2023"
          value={time}
          setValue={setTime}
        />
        <Button icon={<BiBell size={20} />} type="text" className="mx-3" />
        <Button icon={<BiStar size={20} />} type="text" className="mr-2" />
      </header>
      {/*Body */}
      <body className="m-5 border bg-white rounded-lg py-5 px-5">
        <Space direction="vertical" size={10}>
          <div>
            <Checkbox>
              <RangePicker showTime />
            </Checkbox>
            <Checkbox>
              <h1>Lọc theo giờ kinh doanh</h1>
            </Checkbox>
          </div>
          <Button>Tất cả</Button>
          <div className="flex items-center">
            <Space direction="horizontal">
              <Dropdown
                placement="bottom"
                dropdownRender={() => (
                  <div className="bg-white p-4 rounded-md">
                    <Space direction="vertical" size={10}>
                      <h1>Chọn điều kiện lọc</h1>
                      <DropdownComponent
                        options={[
                          "Tổng doanh thu",
                          "Ngày xác nhận",
                          "Đơn hàng",
                          "Trạng thái",
                          "Trạng thái thanh toán",
                          "Kênh bán hàng",
                        ]}
                        value={filter}
                        setValue={setFilter}
                      />
                      <h1>Khoảng từ</h1>
                      <DropdownComponent
                        options={[
                          "Hôm nay",
                          "Hôm qua",
                          "7 ngày qua",
                          "Tuần này",
                          "Tuần trước",
                          "30 ngày qua",
                        ]}
                        value={filter}
                        setValue={setFilter}
                      />
                      <Space direction="horizontal" size={5}>
                        <Button>Hủy</Button>
                        <Button
                          style={{ backgroundColor: "#e5a344", color: "white" }}
                        >
                          Áp dụng
                        </Button>
                      </Space>
                    </Space>
                  </div>
                )}
              >
                <Tooltip title="Bộ lọc">
                  <Button
                    className="flex h-12 "
                    style={{
                      backgroundColor: "#e5a344",
                      color: "white",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <BiFilter size={20} color="white" />
                    Bộ lọc
                  </Button>
                </Tooltip>
              </Dropdown>
              <TextInputComponent
                value={search}
                setValue={setSearch}
                style={{ borderRadius: 5 }}
                width={window.screen.width * 0.65}
                iconLeft={<BiSearch />}
              />
              <Button className="flex items-center text-16 h-12">
                <BiSave size={20} />
                Lưu bộ lọc
              </Button>
            </Space>
          </div>
          <div className="flex items-center">
            <Space direction="horizontal" size={10}>
              <DropdownComponent
                value={sort}
                setValue={setSort}
                options={[
                  "Mã hóa đơn: Tăng dần",
                  "Mã hóa đơn giảm dần",
                  "Ngày giờ bán hàng: Cũ nhất trước",
                  "Ngày giờ bán hàng: Mới nhất trước",
                  "Tổng tiền: Thấp ==> Cao",
                  "Tổng tiền: Cao ==> Thấp",
                ]}
              />
              <Button style={{ backgroundColor: "#e5a344", color: "white" }}>
                Xem
              </Button>
              <Button>Thao tác đơn hàng</Button>
              <Button
                style={{
                  color: "black",
                }}
                className="flex items-center text-14"
              >
                <BiDownload size={20} className="mr-2" />
                Nhập xuất Excel
              </Button>
            </Space>
          </div>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <BillTable />
        </Space>
      </body>
    </div>
  );
}
