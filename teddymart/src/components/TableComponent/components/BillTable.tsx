import { Button, Dropdown, Layout, MenuProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
/**
 * Chưa thanh toán (Unpaid): Hóa đơn vẫn chưa được thanh toán hoặc chưa đến hạn thanh toán.

  Đã thanh toán (Paid): Hóa đơn đã được thanh toán đầy đủ hoặc theo một phần.

  Chờ xác nhận (Pending): Hóa đơn đã được tạo, nhưng chưa được xác nhận hoặc chưa được chấp nhận bởi người nhận.

  Quá hạn (Overdue): Hóa đơn đã đến hạn thanh toán và vẫn chưa được thanh toán.

  Hoàn trả (Refunded): Hóa đơn đã được hoàn trả hoặc trả lại tiền cho người mua hàng.

  Hủy bỏ (Canceled): Hóa đơn đã bị hủy bỏ và không còn hiệu lực.

  Giao dịch lỗi (Error): Có sự cố hoặc lỗi trong quá trình thanh toán, và hóa đơn đang ở trạng thái này để kiểm tra và xử lý sự cố.

  Chờ duyệt (Pending Approval): Hóa đơn cần được xem xét và duyệt bởi người quản lý hoặc bộ phận tài chính trước khi thanh toán.

  Chờ giao hàng (Awaiting Delivery): Hóa đơn đã được thanh toán, nhưng hàng hóa hoặc dịch vụ chưa được giao.

  Thành công (Success): Hóa đơn đã hoàn toàn thành công và đã được xử lý.
 */
type TStatus =
  | "Unpaid"
  | "Paid"
  | "Pending"
  | "Overdue"
  | "Refunded"
  | "Canceled"
  | "Await Delivery"
  | "Success";
const COLOR_STATUS = new Map([
  ["Unpaid", "#FF0000"],
  ["Paid", "#008000"],
  ["Pending", "#FFFF00"],
  ["Overdue", "#FF0000"],
  ["Refunded", "#808080"],
  ["Canceled", "#D3D3D3"],
  ["Await Delivery", "#FF0000"],
  ["Success", "#0000FF"],
]);
type TContent = {
  id: number;
  bill_code: string;
  customer: string;
  sales_date_and_time: Date;
  sale_stafff: string;
  subTotal: number;
  total_discount: number;
  total_paid: number;
  total_cost_of_goods_sold: number;
  payment: number;
  status: TStatus;
  payment_status: TStatus;
  notes?: string;
};
const CONTENT: TContent[] = [
  {
    id: 1,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 2,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 3,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 4,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 5,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 6,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 7,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 2,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 2,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
  {
    id: 2,
    bill_code: "#B_01",
    customer: "DoanTanKhang",
    sales_date_and_time: new Date(),
    sale_stafff: "Nguyen Tien",
    subTotal: 5999,
    total_discount: 500,
    total_paid: 5499,
    total_cost_of_goods_sold: 3000,
    payment: 5999,
    status: "Success",
    payment_status: "Success",
    notes: "Khách hàng thân quen",
  },
];

const HEADER = [
  "MÃ ĐƠN HÀNG",
  "KHÁCH HÀNG",
  "NGÀY GIỜ BÁN HÀNG",
  "NHÂN VIÊN BÁN HÀNG",
  "TỔNG TIỀN",
  "TỔNG GIẢM GIÁ",
  "TỔNG THANH TOÁN",
  "TỔNG GIÁ VỐN",
  "THANH TOÁN",
  "TRẠNG THÁI",
  "TRẠNG THÁI THANH TOÁN",
  "GHI CHÚ",
];

const BillTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
  const handleRowsPerPageChange = (e: any) => {
    setRowsPerPage(e.target.value);
  };
  return (
    <div>
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50 z-50">
          <thead className="bg-gray-200 sticky top-0 left-0">
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
                  {content.id}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.customer}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.sales_date_and_time.toLocaleDateString("vi")}{" "}
                  {dayjs(content.sales_date_and_time).format("HH:mm:ss")}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.sale_stafff}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.subTotal}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.total_discount}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.total_paid}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.total_cost_of_goods_sold}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.payment}
                </td>
                <td
                  className="border border-gray-300 p-2 font-[500] text-sm"
                  style={{ color: COLOR_STATUS.get(content.status) }}
                >
                  {content.status}
                </td>
                <td
                  className="border border-gray-300 p-2 font-[500] text-sm"
                  style={{ color: COLOR_STATUS.get(content.status) }}
                >
                  {content.payment_status}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.notes}
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
          <option value="20">20</option>
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
export default BillTable;
