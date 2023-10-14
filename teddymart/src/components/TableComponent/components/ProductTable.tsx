import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
type TGroup =
  | "Tủ lạnh và Máy đá"
  | "Máy giặt và Sấy"
  | "Máy lạnh và Máy điều hòa"
  | "Lò nướng và Bếp điện"
  | "Máy lọc không khí và Máy tạo ẩm"
  | "Máy pha cà phê và Ấm đun nước"
  | "Máy lọc nước và Máy tạo nước nóng"
  | "Thiết bị nhà bếp nhỏ"
  | "TV và Thiết bị giải trí"
  | "Máy tính và Thiết bị điện tử"
  | "Thiết bị văn phòng"
  | "Camera an ninh và Hệ thống báo động"
  | "Máy in 3D và Thiết bị sáng tạo"
  | "Thiết bị di động và Phụ kiện"
  | "Thiết bị xem phim gia đình"
  | "Thiết bị năng lượng mặt trời"
  | "Dụng cụ và thiết bị chuyên dụng";
type TContent = {
  id: number;
  image: string;
  product_name: string;
  product_category: TGroup;
  product_code: string;
  retail_price: number;
  vat: number;
  cost: number;
  status: boolean;
};
const CONTENT: TContent[] = [
  {
    id: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Xoong.jpg",
    product_name: "Cái xooang",
    product_category: "Dụng cụ và thiết bị chuyên dụng",
    product_code: "25694984",
    retail_price: 5000,
    vat: 60,
    cost: 6000,
    status: true,
  },
  {
    id: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Xoong.jpg",
    product_name: "Cái xooang",
    product_category: "Dụng cụ và thiết bị chuyên dụng",
    product_code: "25694984",
    retail_price: 5000,
    vat: 60,
    cost: 6000,
    status: true,
  },
];

const HEADER = [
  "HÌNH ĐẠI DIỆN",
  "NHÓM SẢN PHẨM",
  "MÃ HÀNG HÓA",
  "TÊN HÀNG HÓA",
  "GIÁ BÁN",
  "VAT BÁN(%)",
  "GIÁ VỐN",
  "TRẠNG THÁI",
  "THAO TÁC",
];
const ProductTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const handleCheckBoxChange = (rowId: number) => {
    if (rowId === -1) {
      console.log("ok");
      if (selectedRows.length === 0) {
        setSelectedRows([...CONTENT.map((content) => content.id)]);
        return;
      }
      setSelectedRows([]);
      return;
    }
    if (selectedRows.includes(rowId)) {
      setSelectedRows([...selectedRows.filter((id) => id !== rowId)]);
      return;
    }
    setSelectedRows([...selectedRows, rowId]);
  };
  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("okkkkk");
    setRowsPerPage(e.target.value);
  };
  return (
    <div className="w-full">
      <table className="w-full border-collapse border border-gray-300 bg-gray-50">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 p-2 text-xs">
              <input
                className="w-15 h-15 bg-hover"
                type="checkbox"
                onChange={() => handleCheckBoxChange(-1)}
              />
            </th>
            <th className="border border-gray-300 p-2 text-xs">#</th>
            {HEADER.map((header, index) => (
              <th key={index} className="border border-gray-300 p-2 text-xs">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {CONTENT.map((content, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input
                  className="w-15 h-15 bg-hover"
                  type="checkbox"
                  onChange={() => handleCheckBoxChange(content.id)}
                  checked={selectedRows.includes(content.id) ? true : false}
                />
              </td>
              <td className="border border-gray-300 p-2 text-sm">{index}</td>
              <td className="border border-gray-300 p-2 text-sm ">
                <img
                  src={content.image}
                  width={45}
                  height={45}
                  className="inline-block"
                />
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.product_category}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.product_code}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.product_name}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.retail_price}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.vat}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.cost}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                <input
                  className="w-15 h-15 bg-hover"
                  type="checkbox"
                  checked={content.status}
                />
              </td>
              <td className="border border-gray-300 p-2 font-[500] text-sm gap-1">
                <Button className="mr-2">
                  <FiEdit />
                </Button>

                <Button>
                  <FiTrash color="red" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full text-left my-5 flex row justify-end pr-10 items-center ">
        <span className="text-sm mr-4 text-gray-400 ">Số mục mỗi trang:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className=" bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white "
        >
          <option value="10">10</option>
          <option value="20" selected>
            20
          </option>
          <option value="50">50</option>
        </select>

        <div className="ml-4 flex items-center">
          <span className="text-sm text-gray-400  mr-4">0 trên 0</span>
          <Button>
            <HiOutlineChevronDoubleLeft />
          </Button>
          <div className="w-2" />
          <Button>
            <HiOutlineChevronLeft />
          </Button>
          <div className="w-2" />

          <Button>
            <HiOutlineChevronRight />
          </Button>
          <div className="w-2" />

          <Button>
            <HiOutlineChevronDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductTable;
