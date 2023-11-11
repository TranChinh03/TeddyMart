import { Button } from "antd";
import { ChangeEvent, useMemo, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { t } from "i18next";

type TContentCustomer = {
  address: string;
  debt: number;
  email: string;
  gender: "Male" | "Female";
  note: string;
  partnerId: string;
  partnerName: string;
  phoneNumber: string;
  totalBuyAmount: number;
  type: "Customer";
};
type TContentSupplier = {
  address: string;
  debt: number;
  email: string;
  certificate: string;
  note: string;
  partnerId: string;
  partnerName: string;
  phoneNumber: string;
  totalBuyAmount: number;
  type: "Supplier";
};
type TContent = TContentCustomer | TContentSupplier;
const CONTENT: TContent[] = [
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    gender: "Female",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    type: "Customer",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",

    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    certificate:
      "https://i.pinimg.com/236x/9d/92/6c/9d926cf33a8101e204322fde8dd81f41.jpg",
    type: "Supplier",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    gender: "Female",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    type: "Customer",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    certificate:
      "https://i.pinimg.com/236x/9d/92/6c/9d926cf33a8101e204322fde8dd81f41.jpg",
    type: "Supplier",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    gender: "Female",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    type: "Customer",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    certificate:
      "https://i.pinimg.com/236x/9d/92/6c/9d926cf33a8101e204322fde8dd81f41.jpg",
    type: "Supplier",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    gender: "Female",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    type: "Customer",
  },
  {
    address: "69 NVL",
    debt: 0,
    email: "dk@gmail.com",
    note: "HELLO",
    partnerId: "P001",
    partnerName: "Khang",
    phoneNumber: "+84356955354",
    totalBuyAmount: 1561,
    certificate:
      "https://i.pinimg.com/236x/9d/92/6c/9d926cf33a8101e204322fde8dd81f41.jpg",
    type: "Supplier",
  },
];

const PartnerTable = ({ isCustomer = false }: { isCustomer?: boolean }) => {
  const HEADER = useMemo(
    () => [
      !isCustomer ? t("partner.supplierID") : t("partner.customerID"),
      !isCustomer ? t("partner.supplierName") : t("partner.customerName"),
      t("partner.gender"),
      t("partner.phoneNumber"),
      t("partner.email"),
      t("partner.address"),
      t("partner.debt"),
      t("partner.totalBuyAmount"),
      t("partner.certificate"),
      t("note"),
      t("activities"),
    ],
    [t]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
      console.log("ok");
      if (selectedRows.length === 0) {
        setSelectedRows([...CONTENT.map((content) => content.partnerId)]);
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
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50">
          <thead className="bg-gray-200 sticky top-0 left-0 z-50">
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
                    onChange={() => handleCheckBoxChange(content.partnerId)}
                    checked={
                      selectedRows.includes(content.partnerId) ? true : false
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.partnerId}
                </td>

                <td className="border border-gray-300 p-2 text-sm">
                  {content.partnerName}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.type === "Customer" ? content.gender : null}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.phoneNumber}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.email}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.address}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.debt}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.totalBuyAmount}
                </td>
                <td className="border border-gray-300 p-2 text-sm  items-center justify-center">
                  {content.type === "Supplier" ? (
                    <img
                      src={content.certificate}
                      style={{
                        width: "100%",
                        height: 100,
                        alignSelf: "center",
                        borderWidth: 1,
                      }}
                    />
                  ) : null}
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
export default PartnerTable;
