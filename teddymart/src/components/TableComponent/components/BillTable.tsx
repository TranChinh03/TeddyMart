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
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";

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
type ColOptions = {
  orderId?: boolean;
  createdAt?: boolean;
  partnerID?: boolean;
  partnerName?: boolean;
  receiver?: boolean;
  listProduct?: boolean;
  payment?: boolean;
  debt?: boolean;
  discount?: boolean;
  totalPayment?: boolean;
  voucherID?: boolean;
  seller?: boolean;
  status?: boolean;
  note?: boolean;
  activities?: boolean;
};
const BillTable = ({ filterOption }: { filterOption?: ColOptions }) => {
  const { t } = useTranslation();
  const options = {
    orderId: true,
    createdAt: true,
    partnerID: true,
    partnerName: true,
    receiver: true,
    listProduct: true,
    payment: true,
    debt: true,
    discount: true,
    totalPayment: true,
    voucherID: true,
    seller: false,
    status: true,
    note: true,
    activities: true,
    ...filterOption,
  };
  const bills = useSelector((state: RootState) => state.order);
  const HEADER = useMemo(
    () =>
      [
        options.orderId && t("sale.orderId"),
        options.createdAt && t("sale.createdAt"),
        options.partnerID && t("sale.customerId"),
        options.partnerName && t("sale.customerName"),
        options.receiver && t("sale.receiver"),
        options.listProduct && t("sale.listProduct"),
        options.payment && t("sale.payment"),
        options.debt && t("sale.debt"),
        options.discount && t("sale.discount"),
        options.totalPayment && t("sale.totalPayment"),
        options.voucherID && t("voucher.voucherID"),
        options.seller && t("sale.seller"),
        options.status && t("sale.status"),
        options.note && t("sale.note"),
        options.activities && t("activities"),
      ].filter((value) => Boolean(value) !== false),
    [t, options]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
      if (selectedRows.length < bills.length) {
        setSelectedRows([...bills.map((content) => content.orderId)]);
        return;
      }
      if (selectedRows.length === bills.length) {
        setSelectedRows([]);
        return;
      }
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
            {bills.map((content, index) => (
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
                {options.orderId && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.orderId}
                  </td>
                )}
                {options.createdAt && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {new Date(content.createdAt).toLocaleDateString("vi")}{" "}
                    {dayjs(content.createdAt).format("HH:mm:ss")}
                  </td>
                )}
                {options.partnerID && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.partnerId}
                  </td>
                )}

                {options.partnerName && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.partnerName}
                  </td>
                )}
                {options.receiver && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.type === "Import" ? content.receiver : null}
                  </td>
                )}
                {options.listProduct && (
                  <td className="border border-gray-300 p-2 text-sm">
                    <Button>
                      <BiDetail />
                    </Button>
                  </td>
                )}
                {options.payment && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.payment}
                  </td>
                )}
                {options.debt && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.debt}
                  </td>
                )}
                {options.discount && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.discount}
                  </td>
                )}
                {options.totalPayment && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.totalPayment}
                  </td>
                )}
                {options.voucherID && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.type === "Export" ? content.voucherId : null}
                  </td>
                )}
                {options.seller && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.type === "Export" ? content.seller : null}
                  </td>
                )}

                {options.status && (
                  <td
                    className="border border-gray-300 p-2 font-[500] text-sm"
                    style={{ color: COLOR_STATUS.get(content.status) }}
                  >
                    {content.status}
                  </td>
                )}
                {options.note && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.note}
                  </td>
                )}
                {options.activities && (
                  <td className="border border-gray-300 p-2 font-[500] text-sm gap-1">
                    <div className="flex items-center gap-1">
                      <Button>
                        <FiEdit />
                      </Button>

                      <Button>
                        <FiTrash color="red" />
                      </Button>
                    </div>
                  </td>
                )}
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
