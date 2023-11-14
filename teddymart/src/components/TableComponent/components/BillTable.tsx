import { Button, Dropdown, Layout, MenuProps } from "antd";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiDetail } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";

type TStatus = "unpaid" | "paid";
const COLOR_STATUS = new Map([
  ["unpaid", "#FF0000"],
  ["paid", "#008000"],
]);
type TProduct = {
  productId: string;
  productName: string;
  quantity: number;
};
type TContentExport = {
  orderId: string;
  partnerId: string;
  partnerName: string;
  payment: number;
  status: TStatus;
  totalPayment: number;
  note: string;
  createdAt: string;
  debt: number;
  discount: number;
  listProduct: TProduct[];
  voucherId: string;
  seller: string;
  type: "Export";
};
type TContentImport = {
  orderId: string;
  partnerId: string;
  partnerName: string;
  payment: number;
  status: TStatus;
  totalPayment: number;
  note: string;
  createdAt: string;
  debt: number;
  discount: number;
  listProduct: TProduct[];
  receiver: string;
  type: "Import";
};
type TContent = TContentExport | TContentImport;
const CONTENT: TContent[] = [
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    status: "paid",
    totalPayment: 21264,
    type: "Export",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
    seller: "Teddy Mart",
    voucherId: "VCH010",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    status: "paid",
    totalPayment: 21264,
    type: "Export",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
    seller: "Teddy Mart",
    voucherId: "VCH010",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    status: "paid",
    totalPayment: 21264,
    type: "Export",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
    seller: "Teddy Mart",
    voucherId: "VCH010",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    status: "paid",
    totalPayment: 21264,
    type: "Export",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
    seller: "Teddy Mart",
    voucherId: "VCH010",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    status: "paid",
    totalPayment: 21264,
    type: "Export",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
    seller: "Teddy Mart",
    voucherId: "VCH010",
  },
  {
    orderId: "ORD001",
    partnerId: "P006",
    partnerName: "Sophia Martinez",
    payment: 21264,
    receiver: "Teddy Mart",
    status: "paid",
    totalPayment: 21264,
    type: "Import",
    note: "Import order from supplier A",
    listProduct: [
      {
        productId: "PD038",
        productName: "Smart Digital Picture Frame",
        quantity: 25,
      },
      {
        productId: "PD007",
        productName: "Gaming Console Pro",
        quantity: 44,
      },
    ],
    debt: 0,
    discount: 0,
    createdAt: "2023-10-07T17:00:00.000Z",
  },
];

const BillTable = () => {
  const { t } = useTranslation();
  const HEADER = useMemo(
    () => [
      t("sale.orderId"),
      t("sale.createdAt"),
      t("sale.customerId"),
      t("sale.customerName"),
      t("sale.receiver"),
      t("sale.listProduct"),
      t("sale.payment"),
      t("sale.debt"),
      t("sale.discount"),
      t("sale.totalPayment"),
      t("voucher.voucherID"),
      t("sale.seller"),
      t("sale.status"),
      t("sale.note"),
      t("activities"),
    ],
    [t]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
      console.log("ok");
      if (selectedRows.length === 0) {
        setSelectedRows([...CONTENT.map((content) => content.orderId)]);
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
          <thead
            className="sticky left-0 z-50"
            style={{
              backgroundColor: "#F0EAEA",
              top: -1,
            }}
          >
            <tr>
              <th className="border border-gray-300 p-2 text-xs">
                <input
                  className="w-15 h-15 bg-hover"
                  type="checkbox"
                  onChange={() => handleCheckBoxChange(null)}
                />
              </th>
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
                    onChange={() => handleCheckBoxChange(content.orderId)}
                    checked={
                      selectedRows.includes(content.orderId) ? true : false
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.orderId}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {new Date(content.createdAt).toLocaleDateString("vi")}{" "}
                  {dayjs(content.createdAt).format("HH:mm:ss")}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.partnerId}
                </td>

                <td className="border border-gray-300 p-2 text-sm">
                  {content.partnerName}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.type === "Import" ? content.receiver : null}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  <Button>
                    <BiDetail />
                  </Button>
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.payment}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.debt}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.discount}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.totalPayment}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.type === "Export" ? content.voucherId : null}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.type === "Export" ? content.seller : null}
                </td>

                <td
                  className="border border-gray-300 p-2 font-[500] text-sm"
                  style={{ color: COLOR_STATUS.get(content.status) }}
                >
                  {content.status}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.note}
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
