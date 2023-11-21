import { Button } from "antd";
import React, { ChangeEvent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
type TContent = {
  revenue: number;
  outcome: number;
  profit: number;
  numberOfOrder: number;
  importOrder: number;
  exportOrder: number;
};
const CONTENT: TContent[] = [
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
  {
    revenue: 1232,
    outcome: 3134,
    profit: 1332,
    numberOfOrder: 12,
    importOrder: 23,
    exportOrder: 23,
  },
];
type TOptions = {
  date?: boolean;
  revenue?: boolean;
  outcome?: boolean;
  profit?: boolean;
  numberOfOrder?: boolean;
  importOrder?: boolean;
  exportOrder?: boolean;
};

const NUMBER_PER_PAGE = ["5", "10", "15"];
const GeneralReportTable = ({
  filterOption,
  date,
}: {
  filterOption?: TOptions;
  date?: D;
}) => {
  const { t } = useTranslation();
  const options: TOptions = {
    date: true,
    revenue: true,
    outcome: true,
    profit: true,
    numberOfOrder: true,
    importOrder: true,
    exportOrder: true,
    ...filterOption,
  };
  const HEADER = useMemo(
    () =>
      [
        options.date && t("report.date"),
        options.revenue && t("report.revenue"),
        options.outcome && t("report.outcome"),
        options.profit && t("report.profit"),
        options.numberOfOrder && t("report.numberOfOrder"),
        options.importOrder && t("report.importOrder"),
        options.exportOrder && t("report.exportOrder"),
      ].filter((value) => Boolean(value) !== false),
    [t, options]
  );
  const [rowsPerPage, setRowsPerPage] = useState("10");

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //console.log("okkkkk");
    setRowsPerPage(e.target.value);
  };

  const REPORTS = useSelector((state: RootState) => state.reportSlice);
  const DATA: TReport[] = useMemo(() => {
    let tmp: TReport[] = [];
    REPORTS.byDate?.forEach((r) => {
      if (
        new Date(r.date).getTime() >= new Date(date.from).getTime() &&
        new Date(r.date).getTime() <= new Date(date.to).getTime()
      ) {
        tmp.push(r);
      }
    });
    return tmp;
  }, [REPORTS, date]);

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
            {DATA?.map((content, index) => (
              <tr key={index}>
                {options.date && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {new Date(content.date).toLocaleDateString("vi")}
                  </td>
                )}
                {options.outcome && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.outcome}
                  </td>
                )}

                {options.revenue && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.revenue}
                  </td>
                )}
                {options.profit && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.profit}
                  </td>
                )}
                {options.numberOfOrder && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.numberOfOrder}
                  </td>
                )}
                {options.importOrder && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.importOrder}
                  </td>
                )}
                {options.exportOrder && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.exportOrder}
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
          {NUMBER_PER_PAGE.map((value, i) => (
            <option key={i} value={value}>
              {value}
            </option>
          ))}
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
