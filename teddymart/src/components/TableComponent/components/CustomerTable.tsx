import { Button } from "antd";
import { ChangeEvent, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
/**
 *  Khách hàng mới (New Customers): Đây là những người chưa từng mua sắm tại cửa hàng của bạn trước đây. Việc ghi nhận thông tin liên hệ và lịch sử mua sắm của họ có thể giúp bạn theo dõi việc họ quay lại và có thể cung cấp khuyến mãi cho họ.

    Khách hàng thường xuyên (Regular Customers): Đây là những người mua sắm thường xuyên tại cửa hàng của bạn. Thông tin về họ cần được theo dõi để cung cấp các ưu đãi hoặc giảm giá cho họ để duy trì mối quan hệ lâu dài.

    Khách hàng trung thành (Loyal Customers): Đây là những người mua sắm thường xuyên và mua sắm nhiều sản phẩm hoặc dịch vụ từ cửa hàng của bạn. Họ thường được thưởng và đánh giá cao bằng các chương trình khách hàng trung thành hoặc các ưu đãi đặc biệt.
    
    Khách hàng bị mất (Lost Customers): Đây là những người đã từng mua sắm tại cửa hàng của bạn, nhưng sau đó họ không còn mua nữa. Việc theo dõi lý do tại sao họ ra đi và cố gắng lôi kéo họ quay lại có thể quan trọng.
    */
type TStatus =
  | "New Customers"
  | "Regular Customers"
  | "Loyal Customers"
  | "Lost Customer";

const COLOR_STATUS = new Map([
  ["New Customers", "#4CAF50"],
  ["Regular Customers", "#FFC107"],
  ["Loyal Customers", "#FF0000"],
  ["Lost Customer", "#808080"],
]);
type TContent = {
  id: number;
  customer_name: string;
  phoneNumber: string;
  email: string;
  total_buy_amount: number;
  debt: number;
  status: TStatus;
};
const CONTENT: TContent[] = [
  {
    id: 1,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 2,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 1,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 2,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 1,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 2,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 1,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
  {
    id: 2,
    customer_name: "Doan Tan Khang",
    phoneNumber: "03569988",
    email: "doank2244@gmail.com",
    total_buy_amount: 5000,
    debt: 0,
    status: "New Customers",
  },
];

const HEADER = [
  "TÊN KHÁCH HÀNG",
  "SỐ ĐIỆN THOẠI",
  "EMAIL",
  "TỔNG ĐÃ MUA",
  "DƯ NỢ",
  "TRẠNG THÁI",
  "THAO TÁC",
];
const CustomerTable = () => {
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
      {/* <table className="w-full border-collapse border border-gray-300 bg-gray-50">
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

              <td className="border border-gray-300 p-2 text-sm">
                {content.customer_name}
              </td>

              <td className="border border-gray-300 p-2 text-sm">
                {content.phoneNumber}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.email}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.total_buy_amount}
              </td>
              <td className="border border-gray-300 p-2 text-sm">
                {content.debt}
              </td>

              <td
                className="border border-gray-300 p-2 font-[500] text-sm"
                style={{ color: COLOR_STATUS.get(content.status) }}
              >
                {content.status}
              </td>
              <td
                className="border border-gray-300 p-2 font-[500] text-sm gap-1"
                style={{ color: COLOR_STATUS.get(content.status) }}
              >
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
      </table> */}
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50">
          <thead className="bg-gray-200 sticky top-0 left-0 z-50">
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

                <td className="border border-gray-300 p-2 text-sm">
                  {content.customer_name}
                </td>

                <td className="border border-gray-300 p-2 text-sm">
                  {content.phoneNumber}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.email}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.total_buy_amount}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.debt}
                </td>

                <td
                  className="border border-gray-300 p-2 font-[500] text-sm"
                  style={{ color: COLOR_STATUS.get(content.status) }}
                >
                  {content.status}
                </td>
                <td
                  className="border border-gray-300 p-2 font-[500] text-sm gap-1"
                  style={{ color: COLOR_STATUS.get(content.status) }}
                >
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
      </div>
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
export default CustomerTable;
