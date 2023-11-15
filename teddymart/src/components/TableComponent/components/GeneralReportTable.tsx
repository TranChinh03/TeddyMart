import { Button } from "antd";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
type TContent = {
  revenue: number;
  outcome: number;
  profit: number;
  totalOrder: number;
  totalImportOrder: number;
};
const CONTENT: TContent[] = [
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    totalOrder: 12,
    totalImportOrder: 23,
  },
];
type TOptions = {
  revenue?: boolean;
  outcome?: boolean;
  profit?: boolean;
  totalOrder?: boolean;
  totalImportOrder?: boolean;
};
const GeneralReportTable = ({ filterOption }: { filterOption?: TOptions }) => {
  const { t } = useTranslation();
  const options: TOptions = {
    revenue: true,
    outcome: true,
    profit: true,
    totalOrder: true,
    totalImportOrder: true,
    ...filterOption,
  };
  const HEADER = useMemo(
    () =>
      [
        options.revenue && t("report.revenue"),
        options.outcome && t("report.outcome"),
        options.profit && t("report.profit"),
        options.totalOrder && t("report.totalOrder"),
        options.totalImportOrder && t("report.totalImportOrder"),
      ].filter((value) => Boolean(value) !== false),
    [t, options]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //console.log("okkkkk");
    setRowsPerPage(e.target.value);
  };
  return (
    <div className="w-full">
      <div className="max-h-96 overflow-y-auto visible">
        <table className="w-full border-collapse border border-gray-300 bg-gray-50">
          <thead className="bg-gray-200 sticky left-0 z-50" style={{ top: -1 }}>
            <tr>
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
                {options.revenue && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.revenue}
                  </td>
                )}
                {options.outcome && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.outcome}
                  </td>
                )}
                {options.profit && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.profit}
                  </td>
                )}
                {options.totalOrder && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.totalOrder}
                  </td>
                )}
                {options.totalImportOrder && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.totalImportOrder}
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

export default GeneralReportTable;
