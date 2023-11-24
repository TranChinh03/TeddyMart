import { Button, Dropdown, Layout, MenuProps, Modal } from "antd";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiDetail } from "react-icons/bi";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { deleteOrder } from "state_management/slices/orderSlice";
import ProductTable from "./ProductTable";
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
// const CONTENT: TContent[] = [
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     status: "paid",
//     totalPayment: 21264,
//     type: "Export",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//     seller: "Teddy Mart",
//     voucherId: "VCH010",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     status: "paid",
//     totalPayment: 21264,
//     type: "Export",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//     seller: "Teddy Mart",
//     voucherId: "VCH010",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     status: "paid",
//     totalPayment: 21264,
//     type: "Export",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//     seller: "Teddy Mart",
//     voucherId: "VCH010",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     status: "paid",
//     totalPayment: 21264,
//     type: "Export",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//     seller: "Teddy Mart",
//     voucherId: "VCH010",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     status: "paid",
//     totalPayment: 21264,
//     type: "Export",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//     seller: "Teddy Mart",
//     voucherId: "VCH010",
//   },
//   {
//     orderId: "ORD001",
//     partnerId: "P006",
//     partnerName: "Sophia Martinez",
//     payment: 21264,
//     receiver: "Teddy Mart",
//     status: "paid",
//     totalPayment: 21264,
//     type: "Import",
//     note: "Import order from supplier A",
//     listProduct: [
//       {
//         productId: "PD038",
//         productName: "Smart Digital Picture Frame",
//         quantity: 25,
//       },
//       {
//         productId: "PD007",
//         productName: "Gaming Console Pro",
//         quantity: 44,
//       },
//     ],
//     debt: 0,
//     discount: 0,
//     createdAt: "2023-10-07T17:00:00.000Z",
//   },
// ];
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
enum SORT {
  ORDER_INCREASE,
  ORDER_DECREASE,
  TIME_DECREASE,
  TIME_INCREASE,
  PAYMENT_INCREASE,
  PAYMENT_DECREASE,
}
export type TListProduct = {
  productId: string;
  quantity: number;
  productName: string;
};
const BillTable = ({
  filterOption,
  selectedRows = [],
  setSelectedRows,
  startDate,
  endDate,
  search,
  sort,
  setOpenAlertModal,
}: {
  selectedRows?: string[];
  setSelectedRows?: (selectedRows: string[]) => void;
  filterOption?: ColOptions;
  startDate?: number;
  endDate?: number;
  search?: string;
  sort?: number;
  setOpenAlertModal?: (openAlertModal: boolean) => void;
}) => {
  console.log(search);
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
  const [tmpData, setTmpData] = useState(bills);
  const [openListProduct, setOpenListProduct] = useState(false);
  const [listProduct, setListProduct] = useState<TListProduct[]>([]);
  const bubbleSort = (
    orders: TOrder[],
    compare: (order_1: TOrder, order_2: TOrder) => boolean
  ) => {
    const length = orders.length;
    let tmpValue = [...orders];
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - 1 - i; j++) {
        // refer to note below
        if (compare(tmpValue[j], tmpValue[j + 1])) {
          {
            [tmpValue[j], tmpValue[j + 1]] = [tmpValue[j + 1], tmpValue[j]];
          }
        }
      }
    }
    return tmpValue;
  };
  const filterData = () => {
    let tmp: TOrder[] = bills;
    if (startDate && endDate) {
      let tmp_1 = bills.filter(
        (order) =>
          new Date(order.createdAt).getTime() >= startDate &&
          new Date(order.createdAt).getTime() <= endDate
      );
      tmp = tmp_1;
    }
    if (search) {
      let tmp_1 = tmp.filter(
        (order) =>
          order.partnerName.includes(search) || order.orderId.includes(search)
      );
      tmp = tmp_1;
    }

    if (sort) {
      switch (sort) {
        case SORT.ORDER_INCREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) => order_1.orderId > order_2.orderId
          );
          tmp = tmp_1;
          break;
        }
        case SORT.ORDER_DECREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) => order_1.orderId < order_2.orderId
          );
          tmp = tmp_1;
          break;
        }
        case SORT.PAYMENT_DECREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) => order_1.payment < order_2.payment
          );
          tmp = tmp_1;
          break;
        }
        case SORT.PAYMENT_INCREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) => +order_1.payment > +order_2.payment
          );
          tmp = tmp_1;
          break;
        }
        case SORT.TIME_DECREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) =>
              new Date(order_1.createdAt).getTime() >
              new Date(order_2.createdAt).getTime()
          );
          tmp = tmp_1;
          break;
        }
        case SORT.TIME_INCREASE: {
          let tmp_1 = bubbleSort(
            tmp,
            (order_1, order_2) =>
              new Date(order_1.createdAt).getTime() <
              new Date(order_2.createdAt).getTime()
          );
          tmp = tmp_1;
          break;
        }
      }
    }
    setTmpData([...tmp]);
  };
  useEffect(() => {
    filterData();
  }, [bills, startDate, endDate, search, sort]);
  const dispatch = useDispatch();
  const HEADER = useMemo(
    () =>
      [
        "#",
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
  // const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const onDeleteRow = (orderId: string) => {
    setOpenAlertModal(true);
    setSelectedRows([...selectedRows, orderId]);
  };
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
  const maxPages = useMemo(
    () => Math.round(bills.length / rowsPerPage),
    [rowsPerPage]
  );
  const [currentPage, setCurrentPage] = useState(1);

  const onBackAll = () => {
    setCurrentPage(1);
  };
  const onBack = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const onForward = () => {
    if (currentPage < maxPages) setCurrentPage(currentPage + 1);
  };
  const onForwardAll = () => {
    setCurrentPage(maxPages);
  };
  const onOpenListModal = (listProduct: TListProduct[]) => {
    setOpenListProduct(true);
    setListProduct(listProduct);
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
            {tmpData.map((content, index) => {
              if (
                index < currentPage * rowsPerPage &&
                index >= (currentPage - 1) * rowsPerPage
              )
                return (
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
                      {index + 1}
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
                        <Button
                          onClick={() => onOpenListModal(content.listProduct)}
                        >
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
                        <div className="flex items-center justify-center">
                          {/* <Button>
                            <FiEdit />
                          </Button> */}

                          <Button onClick={() => onDeleteRow(content.orderId)}>
                            <FiTrash color="red" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                );
            })}
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
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        <div className="ml-4 flex items-center">
          <span className="text-sm text-gray-400  mr-4">
            {currentPage} trên {maxPages}
          </span>
          <Button onClick={onBackAll}>
            <HiOutlineChevronDoubleLeft />
          </Button>
          <div className="w-2" />
          <Button onClick={onBack}>
            <HiOutlineChevronLeft />
          </Button>
          <div className="w-2" />

          <Button onClick={onForward}>
            <HiOutlineChevronRight />
          </Button>
          <div className="w-2" />

          <Button onClick={onForwardAll}>
            <HiOutlineChevronDoubleRight />
          </Button>
        </div>
      </div>
      {/*Modal Open Product */}
      <Modal
        open={openListProduct}
        onCancel={() => setOpenListProduct(false)}
        footer={false}
        width={"80%"}
      >
        <ProductTable
          filterOption={{ activities: false, quantity: true }}
          filterListProduct={listProduct}
        />
      </Modal>
    </div>
  );
};
export default BillTable;
