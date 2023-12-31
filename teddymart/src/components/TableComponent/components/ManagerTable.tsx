import { Button } from "antd";
import { t } from "i18next";
import { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";

type TContent = {
  address: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  shopName: string;
  userId: string;
  userName: string;
};
const CONTENT: TContent[] = [
  {
    address: "123 Main Street, City",
    email: "john@example.com",
    phoneNumber: "0356955354",
    photoURL:
      "https://i.pinimg.com/736x/0d/c9/52/0dc95289cfffeec2ca53ad443da59893.jpg",
    shopName: "KKKT",
    userId: "M001",
    userName: "KHANG",
  },
];

type TOptions = {
  userId?: boolean;
  userName?: boolean;
  photoURL?: boolean;
  address?: boolean;
  phoneNumber?: boolean;
  email?: boolean;
  shopName?: boolean;
};
const ManagerTable = ({ filterOption }: { filterOption?: TOptions }) => {
  const { t } = useTranslation();
  const options: TOptions = {
    userId: true,
    userName: true,
    photoURL: true,
    phoneNumber: true,
    address: true,
    email: true,
    shopName: true,
    ...filterOption,
  };
  const HEADER = useMemo(
    () =>
      [
        options.userId && t("manager.userId"),
        options.userName && t("manager.userName"),
        options.photoURL && t("manager.photoURL"),
        options.address && t("manager.address"),
        options.phoneNumber && t("manager.phoneNumber"),
        options.email && t("manager.email"),
        options.shopName && t("manager.shopName"),
        t("activities"),
      ].filter((value) => Boolean(value) !== false),
    [t, options]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(1);
  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
      console.log("ok");
      if (selectedRows.length === 0) {
        setSelectedRows([...CONTENT.map((content) => content.userId)]);
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
    setRowsPerPage(+e.target.value);
  };
  const maxPages = useMemo(
    () => Math.ceil(CONTENT.length / rowsPerPage),
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
  return (
    <div className="w-full">
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50">
          <thead
            className="bg-gray-200 sticky  left-0 z-50"
            style={{ top: -1 }}
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
            {CONTENT.map((content, index) => {
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
                        onChange={() => handleCheckBoxChange(content.userId)}
                        checked={
                          selectedRows.includes(content.userId) ? true : false
                        }
                      />
                    </td>
                    {options.userId && (
                      <td className="border border-gray-300 p-2 text-sm">
                        {content.userId}
                      </td>
                    )}
                    {options.userName && (
                      <td className="border border-gray-300 p-2 text-sm">
                        {content.userName}
                      </td>
                    )}
                    {options.photoURL && (
                      <td className="border border-gray-300 p-2 text-sm">
                        <img
                          src={content.photoURL}
                          style={{
                            width: "100%",
                            height: 100,
                            alignSelf: "center",
                            borderWidth: 1,
                          }}
                        />
                      </td>
                    )}
                    {options.address && (
                      <td className="border border-gray-300 p-2 text-sm">
                        {content.address}
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
                    {options.shopName && (
                      <td className="border border-gray-300 p-2 text-sm">
                        {content.shopName}
                      </td>
                    )}
                    <td className="border border-gray-300 p-2 font-[500] text-sm gap-1">
                      <Button className="mr-2">
                        <FiEdit />
                      </Button>

                      <Button>
                        <FiTrash color="red" />
                      </Button>
                    </td>
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
          <option value="10">10</option>
          <option value="20" selected>
            20
          </option>
          <option value="50">50</option>
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
    </div>
  );
};
export default ManagerTable;
