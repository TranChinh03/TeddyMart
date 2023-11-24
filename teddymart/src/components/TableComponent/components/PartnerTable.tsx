import { Button } from "antd";
import { ChangeEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { FiEdit, FiTrash } from "react-icons/fi";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { RootState } from "state_management/reducers/rootReducer";
import { useSelector } from "react-redux";

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
type TOptions = {
  partnerID?: boolean;
  partnerName?: boolean;
  gender?: boolean;
  phoneNumber?: boolean;
  email?: boolean;
  address?: boolean;
  debt?: boolean;
  totalBuyAmount?: boolean;
  certificate?: boolean;
  note?: boolean;
};
const PartnerTable = ({
  isCustomer = false,
  filterOption,
  search = "",
  additionalFilters = {},
  resetTable = false,
}: {
  isCustomer?: boolean;
  filterOption?: TOptions;
  search?: string;
  additionalFilters?: any;
  resetTable?: boolean;
}) => {
  const { t } = useTranslation();
  const PARTNERS = useSelector((state: RootState) => state.partnerSlice);
  const ORIGINAL_DATA = useMemo(() => PARTNERS, [PARTNERS]);

  const [data, setData] = useState(ORIGINAL_DATA);
  const DATA = useMemo(
    () =>
      PARTNERS.filter((p) => {
        return (
          (isCustomer ? p.type === "Customer" : "Supplier") &&
          p.partnerName.includes(search) &&
          (!additionalFilters.gender ||
            p.gender === additionalFilters.gender) &&
          (!additionalFilters.debtBalanceFrom ||
            p.debt >= additionalFilters.debtBalanceFrom) &&
          (!additionalFilters.debtBalanceTo ||
            p.debt <= additionalFilters.debtBalanceTo) &&
          (!additionalFilters.totalPurchasesFrom ||
            p.totalBuyAmount >= additionalFilters.totalPurchasesFrom) &&
          (!additionalFilters.totalPurchasesTo ||
            p.totalBuyAmount <= additionalFilters.totalPurchasesTo)
        );
      }),
    [PARTNERS, search, additionalFilters]
  );

  const options: TOptions = {
    partnerID: true,
    partnerName: true,
    gender: true,
    phoneNumber: true,
    email: true,
    address: true,
    debt: true,
    totalBuyAmount: true,
    certificate: true,
    note: true,
    ...filterOption,
  };
  const HEADER = useMemo(
    () =>
      [
        "#",
        options.partnerID && !isCustomer
          ? t("partner.supplierID")
          : t("partner.customerID"),
        options.partnerName && !isCustomer
          ? t("partner.supplierName")
          : t("partner.customerName"),
        options.gender && isCustomer && t("partner.gender"),
        options.phoneNumber && t("partner.phoneNumber"),
        options.email && t("partner.email"),
        options.address && t("partner.address"),
        options.debt && t("partner.debt"),
        options.totalBuyAmount && t("partner.totalBuyAmount"),
        options.certificate && !isCustomer && t("partner.certificate"),
        options.note && t("note"),
        t("activities"),
      ].filter((value) => Boolean(value) !== false),
    [t, filterOption]
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const [displayData, setDisplayData] = useState(DATA.slice(0, +rowsPerPage));

  useLayoutEffect(() => {
    setDisplayData(ORIGINAL_DATA.slice(0, +rowsPerPage));
    size.current = +rowsPerPage;
  }, [ORIGINAL_DATA, rowsPerPage]);

  const size = useRef<number>(+rowsPerPage);
  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
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
    setRowsPerPage(e.target.value);
  };
  return (
    <div className="w-full">
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50">
          <thead className="bg-gray-200 sticky left-0 z-50" style={{ top: -1 }}>
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
            {displayData.map((content, index) => (
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
                  {index + 1}
                </td>
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
                {options.gender && isCustomer && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.type === "Customer" ? content.gender : null}
                  </td>
                )}
                {options.phoneNumber && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.phoneNumber}
                  </td>
                )}
                {options.email && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.email}
                  </td>
                )}
                {options.address && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.address}
                  </td>
                )}
                {options.debt && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.debt}
                  </td>
                )}
                {options.totalBuyAmount && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.totalBuyAmount}
                  </td>
                )}
                {options.certificate && !isCustomer && (
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
                        alt="Certificate"
                      />
                    ) : null}
                  </td>
                )}

                {options.note && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.note}
                  </td>
                )}
                <td className="border border-gray-300 p-2 font-[500] text-sm gap-1">
                  <div className="flex items-center gap-1 justify-center">
                    <Button>
                      <FiEdit />
                    </Button>

                    <Button>
                      <FiTrash color="red" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full text-left my-5 flex row justify-end pr-10 items-center ">
        <span className="text-sm mr-4 text-gray-400 ">{t("rowsPerPage")}</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className=" bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white "
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <div className="ml-4 flex items-center">
          <span className="text-sm text-gray-400  mr-4">{`${
            Math.ceil((size.current - displayData.length) / +rowsPerPage) + 1
          }/${Math.ceil(DATA.length / +rowsPerPage)}`}</span>
          <Button
            onClick={() => {
              if (size.current !== Number(rowsPerPage)) {
                setDisplayData(DATA.slice(0, +rowsPerPage));
                size.current = +rowsPerPage;
              }
            }}
          >
            <HiOutlineChevronDoubleLeft />
          </Button>
          <div className="w-2" />
          <Button
            onClick={() => {
              if (size.current !== Number(rowsPerPage)) {
                size.current -=
                  displayData.length < Number(rowsPerPage)
                    ? displayData.length
                    : Number(rowsPerPage);
                setDisplayData(
                  DATA.slice(size.current - Number(rowsPerPage), size.current)
                );
              }
            }}
          >
            <HiOutlineChevronLeft />
          </Button>
          <div className="w-2" />

          <Button
            onClick={() => {
              if (size.current !== DATA.length) {
                setDisplayData(
                  DATA.slice(size.current, size.current + Number(rowsPerPage))
                );
                size.current =
                  size.current + Number(rowsPerPage) < DATA.length
                    ? size.current + Number(rowsPerPage)
                    : DATA.length;
              }
            }}
          >
            <HiOutlineChevronRight />
          </Button>
          <div className="w-2" />

          <Button
            onClick={() => {
              if (size.current !== DATA.length) {
                let final = DATA.length % Number(rowsPerPage);
                if (final === 0) {
                  setDisplayData(DATA.slice(-Number(rowsPerPage)));
                } else {
                  setDisplayData(DATA.slice(-final));
                }
                size.current = DATA.length;
              }
            }}
          >
            <HiOutlineChevronDoubleRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PartnerTable;
