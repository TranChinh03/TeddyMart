import { Button, Tooltip } from "antd";
import { t } from "i18next";
import { ChangeEvent, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";

type TContent = {
  productId: string;
  productName: string;
  groupId: string;
  groupName: string;
  image?: string;
  sell_price: number;
  cost_price?: number;
  VAT?: number;
  note?: string;
  quantity?: number;
  totalPrice?: number;
  price?: number;
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

type TOptions = {
  productId?: boolean;
  productName?: boolean;
  productGroup?: boolean;
  productGroupName?: boolean;
  productImage?: boolean;
  sell_price?: boolean;
  costPrice?: boolean;
  VAT?: boolean;
  note?: boolean;
  quantity?: boolean;
  totalPrice?: boolean;
  activities?: boolean;
  price?: boolean;
};

type TSort = {
  nameAscending?: boolean;
  nameDescending?: boolean;
  quantityAscending?: boolean;
  quantityDescending?: boolean;
};
const ProductTable = ({
  filterOption,
  warehouseName,
  productName,
  sort,
}: {
  filterOption?: TOptions;
  warehouseName?: string;
  productName?: string;
  sort?: TSort;
}) => {
  const { t } = useTranslation();
  const products = useSelector((state: RootState) => state.product);
  const warehouses = useSelector((state: RootState) => state.warehouseSlice);

  console.log("PRODUCTS", products);
  const productsFilter = useMemo(() => {
    //console.log(warehouseName, productName);
    let listProducts: any[] = [];

    if (!warehouseName && !productName) listProducts = products;
    else {
      const listProductWarehouse = warehouses.filter(
        (value) => value.warehouseName === warehouseName
      )[0].listProduct;
      //console.log("listProductWarehouse", listProductWarehouse);
      // const listProducts: any[] = [];
      listProductWarehouse.map((value) => {
        const tmp = products.findIndex(
          (product) => product.productId === value.productId
        );
        listProducts?.push({
          productId: value.productId,
          productName: value.productName,
          quantity: value.quantity,
          costPrice: products[tmp].cost_price,
          payment: 0, //????
          note: products[tmp].note,
        });
      });
    }
    if (sort?.nameAscending) {
      listProducts.sort((a, b) =>
        a.productName.charAt(0) < b.productName.charAt(0) ? -1 : 1
      );
    }
    if (sort?.nameDescending) {
      listProducts.sort((a, b) =>
        a.productName.charAt(0) > b.productName.charAt(0) ? -1 : 1
      );
    }
    if (sort?.quantityAscending) {
      listProducts.sort((a, b) => (a.quantity < b.quantity ? -1 : 1));
    }
    if (sort?.quantityDescending) {
      listProducts.sort((a, b) => (a.quantity > b.quantity ? -1 : 1));
    }
    return listProducts;
  }, [warehouseName, productName, sort]);
  //console.log(productsFilter);

  const options: TOptions = {
    productId: true,
    productName: true,
    productGroup: true,
    productGroupName: true,
    productImage: true,
    sell_price: true,
    costPrice: true,
    VAT: true,
    note: true,
    quantity: false,
    totalPrice: false,
    activities: true,
    price: false,
    ...filterOption,
  };
  const HEADER = useMemo(
    () =>
      [
        options.productId && t("product.productId"),
        options.productName && t("product.productName"),
        options.quantity && t("warehouse.quantity"),
        options.productGroup && t("product.productGroup"),
        options.productGroupName && t("product.productGroupName"),
        options.productImage && t("product.productImage"),
        options.sell_price && t("product.sell_price"),
        options.costPrice && t("product.costPrice"),
        options.totalPrice && t("sale.totalPayment"),
        options.VAT && t("product.VAT"),
        options.note && t("note"),
        options.activities && t("activities"),
        options.price && t("product.price"),
      ].filter((value) => Boolean(value) !== false),
    [t, options]
  );
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [displayData, setDisplayData] = useState(
    productsFilter.slice(0, +rowsPerPage)
  );

  useLayoutEffect(() => {
    setDisplayData(productsFilter.slice(0, +rowsPerPage));
  }, [rowsPerPage, productsFilter]);

  const size = useRef<number>(+rowsPerPage);

  const handleCheckBoxChange = (rowId: string) => {
    if (rowId === null) {
      if (selectedRows.length < productsFilter.length) {
        setSelectedRows([
          ...productsFilter.map((content) => content.productId),
        ]);
        return;
      }
      if (selectedRows.length === productsFilter.length) {
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
                    onChange={() => handleCheckBoxChange(content.productId)}
                    checked={
                      selectedRows.includes(content.productId) ? true : false
                    }
                  />
                </td>

                {options.productId && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.productId}
                  </td>
                )}
                {options.productName && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.productName}
                  </td>
                )}
                {options.quantity && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.quantity ?? 0}
                  </td>
                )}

                {options.productGroup && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.groupId}
                  </td>
                )}
                {options.productGroupName && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.groupName}
                  </td>
                )}

                {options.productImage && (
                  <td className="border border-gray-300 p-2 text-sm ">
                    <img
                      src={content.image}
                      width={45}
                      height={45}
                      className="inline-block"
                    />
                  </td>
                )}
                {options.sell_price && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.sell_price}
                  </td>
                )}

                {options.costPrice && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.cost_price}
                  </td>
                )}

                {options.price && (
                  <Tooltip title="Price = Sell price * (1+VAT)">
                    <td className="border border-gray-300 p-2 text-sm">
                      {content.price}
                    </td>
                  </Tooltip>
                )}
                {options.totalPrice && (
                  <Tooltip title="Total Price = Price * Quantity">
                    <td className="border border-gray-300 p-2 text-sm">
                      {content.totalPrice ?? 0}
                    </td>
                  </Tooltip>
                )}
                {options.VAT && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.VAT}
                  </td>
                )}
                {options.note && (
                  <td className="border border-gray-300 p-2 text-sm">
                    {content.note}
                  </td>
                )}

                {options.activities && (
                  <td className="border border-gray-300 p-2 text-sm">
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
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        {/* <div className="ml-4 flex items-center">
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
        </div> */}

        <div className="ml-4 flex items-center">
          <span className="text-sm text-gray-400  mr-4">{`${
            Math.ceil((size.current - displayData.length) / +rowsPerPage) + 1
          }/${Math.ceil(productsFilter.length / +rowsPerPage)}`}</span>
          <Button
            onClick={() => {
              if (size.current !== Number(rowsPerPage)) {
                setDisplayData(productsFilter.slice(0, +rowsPerPage));
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
                  productsFilter.slice(
                    size.current - Number(rowsPerPage),
                    size.current
                  )
                );
              }
            }}
          >
            <HiOutlineChevronLeft />
          </Button>
          <div className="w-2" />

          <Button
            onClick={() => {
              if (size.current !== productsFilter.length) {
                setDisplayData(
                  productsFilter.slice(
                    size.current,
                    size.current + Number(rowsPerPage)
                  )
                );
                size.current =
                  size.current + Number(rowsPerPage) < productsFilter.length
                    ? size.current + Number(rowsPerPage)
                    : productsFilter.length;
              }
            }}
          >
            <HiOutlineChevronRight />
          </Button>
          <div className="w-2" />

          <Button
            onClick={() => {
              if (size.current !== productsFilter.length) {
                let final = productsFilter.length % Number(rowsPerPage);
                if (final === 0) {
                  setDisplayData(productsFilter.slice(-Number(rowsPerPage)));
                } else {
                  setDisplayData(productsFilter.slice(-final));
                }
                size.current = productsFilter.length;
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
export default ProductTable;
