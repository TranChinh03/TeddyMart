import { Button } from "antd";
import { t } from "i18next";
import { ChangeEvent, useMemo, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";

type TContent = {
  groupId: string;
  groupName: string;
  note: string;
};
const CONTENT: TContent[] = [
  {
    groupId: "GP001",
    groupName: "Home Appliance",
    note: "Explore essential appliances required for household needs. From refrigerators to kitchen essentials, this group provides reliable and efficient solutions to simplify daily routines at home.",
  },
  {
    groupId: "GP001",
    groupName: "Home Appliance",
    note: "Explore essential appliances required for household needs. From refrigerators to kitchen essentials, this group provides reliable and efficient solutions to simplify daily routines at home.",
  },
  {
    groupId: "GP001",
    groupName: "Home Appliance",
    note: "Explore essential appliances required for household needs. From refrigerators to kitchen essentials, this group provides reliable and efficient solutions to simplify daily routines at home.",
  },
  {
    groupId: "GP001",
    groupName: "Home Appliance",
    note: "Explore essential appliances required for household needs. From refrigerators to kitchen essentials, this group provides reliable and efficient solutions to simplify daily routines at home.",
  },
];

const GroupProductTable = () => {
  const HEADER = useMemo(
    () => [
      t("group.groupId"),
      t("group.groupName"),
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
        setSelectedRows([...CONTENT.map((content) => content.groupId)]);
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
                    onChange={() => handleCheckBoxChange(content.groupId)}
                    checked={
                      selectedRows.includes(content.groupId) ? true : false
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.groupId}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.groupName}
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
export default GroupProductTable;