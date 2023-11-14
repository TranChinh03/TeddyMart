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
  productId: string;
  productName: string;
  groupId: string;
  groupName: string;
  image: string;
  sell_price: number;
  cost_price: number;
  VAT: number;
  note: string;
};
const CONTENT: TContent[] = [
  {
    productId: "P001",
    productName: "Máy giặc",
    groupId: "G001",
    groupName: "Group A",
    image:
      "https://cdn.tgdd.vn/Products/Images/2402/226459/noi-nhom-chong-dinh-kangaroo-kg993mx-bo-3-cai-2-org.jpg",
    sell_price: 1231,
    cost_price: 12333,
    VAT: 0.5,
    note: "Do moi",
  },
  {
    productId: "P001",
    productName: "Máy giặc",
    groupId: "G001",
    groupName: "Group A",
    image:
      "https://cdn.tgdd.vn/Products/Images/2402/226459/noi-nhom-chong-dinh-kangaroo-kg993mx-bo-3-cai-2-org.jpg",
    sell_price: 1231,
    cost_price: 12333,
    VAT: 0.5,
    note: "Do moi",
  },
  {
    productId: "P001",
    productName: "Máy giặc",
    groupId: "G001",
    groupName: "Group A",
    image:
      "https://cdn.tgdd.vn/Products/Images/2402/226459/noi-nhom-chong-dinh-kangaroo-kg993mx-bo-3-cai-2-org.jpg",
    sell_price: 1231,
    cost_price: 12333,
    VAT: 0.5,
    note: "Do moi",
  },
  {
    productId: "P001",
    productName: "Máy giặc",
    groupId: "G001",
    groupName: "Group A",
    image:
      "https://cdn.tgdd.vn/Products/Images/2402/226459/noi-nhom-chong-dinh-kangaroo-kg993mx-bo-3-cai-2-org.jpg",
    sell_price: 1231,
    cost_price: 12333,
    VAT: 0.5,
    note: "Do moi",
  },
  {
    productId: "P001",
    productName: "Máy giặc",
    groupId: "G001",
    groupName: "Group A",
    image:
      "https://cdn.tgdd.vn/Products/Images/2402/226459/noi-nhom-chong-dinh-kangaroo-kg993mx-bo-3-cai-2-org.jpg",
    sell_price: 1231,
    cost_price: 12333,
    VAT: 0.5,
    note: "Do moi",
  },
];

const ProductTable = () => {
  const HEADER = useMemo(
    () => [
      t("product.productId"),
      t("productName"),
      t("product.productGroup"),
      t("product.productGroupName"),
      t("product.productImage"),
      t("product.retailPrice"),
      t("product.costPrice"),
      t("product.VAT"),
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
        setSelectedRows([...CONTENT.map((content) => content.productId)]);
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
            {CONTENT.map((content, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">
                  <input
                    className="w-15 h-15 bg-hover"
                    type="checkbox"
                    onChange={() => handleCheckBoxChange(content.productId)}
                    checked={
                      selectedRows.includes(content.productId) ? true : false
                    }
                  />
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.productId}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.productName}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.groupId}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.groupName}
                </td>

                <td className="border border-gray-300 p-2 text-sm ">
                  <img
                    src={content.image}
                    width={45}
                    height={45}
                    className="inline-block"
                  />
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.sell_price}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.cost_price}
                </td>
                <td className="border border-gray-300 p-2 text-sm">
                  {content.VAT}
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
export default ProductTable;
