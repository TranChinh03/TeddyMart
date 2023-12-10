import { Button, Space, Tooltip } from "antd";
import { t } from "i18next";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FiEdit, FiTrash } from "react-icons/fi";
import {
  HiOutlineChevronLeft,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronRight,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { TListProduct } from "./BillTable";
import ButtonComponent from "components/ButtonComponent";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { deleteProduct } from "state_management/slices/productSlice";

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

type Props = {
  filterOption?: TOptions;
  warehouseName?: string;
  productName?: string;
  productGroup?: string;
  sort?: TSort;
  filterListProduct?: TListProduct[];
  isEditQuantity?: boolean;
  setProducts?: (products: TProduct[]) => void;
  data?: TProduct[];
  setData?: (data: TProduct[]) => void;
};
const ProductTable = forwardRef<HTMLTableElement, Props>(
  (
    {
      filterOption,
      warehouseName,
      productName,
      productGroup,
      sort,
      filterListProduct,
      isEditQuantity = false,
      setProducts,
      data,
      setData,
    }: Props,
    ref
  ) => {
    const { t } = useTranslation();
    const products = useSelector((state: RootState) => state.product);
    const warehouses = useSelector((state: RootState) => state.warehouseSlice);
    const dispatch = useDispatch();
    const productsFilter = useMemo(() => {
      if (data) return data;
      let listProducts: TProduct[] = [...products];
      if (warehouseName) {
        const listProductWarehouse =
          warehouses.filter((value) => value.warehouseName === warehouseName)[0]
            ?.listProduct ?? [];
        let productFilterProductTable = listProductWarehouse.map((value) => {
          let tmp = listProducts.findIndex(
            (warehouse) => warehouse.productId === value.productId
          );
          console.log("quznty");
          if (tmp > -1)
            return {
              productId: value.productId,
              productName: value.productName,
              quantity: value.quantity,
              costPrice: listProducts[tmp].cost_price,
              payment: value.quantity * listProducts[tmp].cost_price, //????
              note: listProducts[tmp].note,
            };
        });
        listProducts = productFilterProductTable;
      }
      if (productGroup) {
        let tmp = listProducts.filter(
          (value) => value.groupName === productGroup
        );
        listProducts = tmp;
      }
      if (productName) {
        let tmp = listProducts.filter((value) =>
          value.productName.toLowerCase().includes(productName.toLowerCase())
        );
        listProducts = tmp;
      }

      if (sort?.nameAscending) {
        let tmp = listProducts.sort((a, b) =>
          a.productName.charAt(0) < b.productName.charAt(0) ? -1 : 1
        );
        listProducts = tmp;
      }
      if (sort?.nameDescending) {
        let tmp = listProducts.sort((a, b) =>
          a.productName.charAt(0) > b.productName.charAt(0) ? -1 : 1
        );
        listProducts = tmp;
      }
      if (sort?.quantityAscending) {
        let tmp = listProducts.sort((a, b) =>
          a.quantity < b.quantity ? -1 : 1
        );
        listProducts = tmp;
      }
      if (sort?.quantityDescending) {
        let tmp = listProducts.sort((a, b) =>
          a.quantity > b.quantity ? -1 : 1
        );
        listProducts = tmp;
      }

      if (filterListProduct) {
        let tmp = listProducts.map((value) => {
          let index = filterListProduct.findIndex(
            (filterProduct) => filterProduct.productId === value.productId
          );
          console.log(index);
          if (index > -1)
            return {
              ...value,
              quantity: filterListProduct[index]?.quantity,
            };
          return;
        });
        listProducts = tmp.filter((value) => value !== undefined);
        console.log("filter list", tmp);
      }

      return listProducts ?? [];
    }, [
      warehouseName,
      productName,
      sort,
      filterListProduct,
      products,
      data,
      productGroup,
    ]);
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
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const maxPages = useMemo(
      () => Math.round(productsFilter.length / rowsPerPage),
      [productsFilter]
    );
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

    const handleCheckBoxChange = (rowId: string) => {
      if (rowId === null) {
        if (selectedRows.length < productsFilter.length) {
          setSelectedRows([
            ...productsFilter.map((content) => content?.productId),
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
      setRowsPerPage(+e.target.value);
    };
    const onDeleteProduct = (productId: string) => {
      console.log(productId);
      dispatch(deleteProduct({ productId: productId }));
    };
    const onGetProducts = () => {
      let tmp = products.map((product) => {
        if (selectedRows.includes(product.productId))
          return {
            ...product,
            quantity: 0,
          };
      });
      setProducts?.(tmp.filter((product) => product !== undefined));
    };
    useEffect(() => {
      onGetProducts();
    }, [selectedRows]);
    const increaseQuantity = (productId: string) => {
      let tmp = [...data];
      let index_data = tmp.findIndex(
        (product) => product.productId === productId
      );
      let index_product = products.findIndex(
        (product) => product.productId === productId
      );
      if (index_data > -1) {
        if (tmp[index_data].quantity < products[index_product].quantity)
          tmp[index_data].quantity = tmp[index_data].quantity + 1;
      }
      setData?.(tmp);
    };
    const descreaseQuantity = (productId: string) => {
      let tmp = [...data];
      let index_data = tmp.findIndex(
        (product) => product.productId === productId
      );
      let index_product = products.findIndex(
        (product) => product.productId === productId
      );
      if (index_data > -1) {
        if (tmp[index_data].quantity > 1)
          tmp[index_data].quantity = tmp[index_data].quantity - 1;
      }
      setData?.(tmp);
    };
    return (
      <div className="w-full">
        <div className="max-h-96 overflow-y-auto visible">
          <table
            className="w-full border-collapse border border-gray-300 bg-gray-50"
            ref={ref}
          >
            <thead
              className="bg-gray-200 sticky left-0 z-50"
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
                  <th
                    key={index}
                    className="border border-gray-300 p-2 text-xs"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {productsFilter.map((content, index) => {
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
                          onChange={() =>
                            handleCheckBoxChange(content?.productId)
                          }
                          checked={
                            selectedRows.includes(content?.productId ?? "")
                              ? true
                              : false
                          }
                        />
                      </td>

                      {options.productId && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.productId}
                        </td>
                      )}
                      {options.productName && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.productName}
                        </td>
                      )}
                      {options.quantity && (
                        <td className="border border-gray-300 p-2 text-sm">
                          <Space>
                            {content?.quantity ?? 0}
                            {isEditQuantity && (
                              <Space direction="vertical" size={2}>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    if (data)
                                      increaseQuantity(content.productId);
                                  }}
                                >
                                  <TiArrowSortedUp size={10} />
                                </Button>
                                <Button
                                  size="small"
                                  onClick={() => {
                                    if (data)
                                      descreaseQuantity(content.productId);
                                  }}
                                >
                                  <TiArrowSortedDown size={10} />
                                </Button>
                              </Space>
                            )}
                          </Space>
                        </td>
                      )}

                      {options.productGroup && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.groupId}
                        </td>
                      )}
                      {options.productGroupName && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.groupName}
                        </td>
                      )}

                      {options.productImage && (
                        <td className="border border-gray-300 p-2 text-sm ">
                          <img
                            src={content?.image}
                            width={45}
                            height={45}
                            className="inline-block"
                          />
                        </td>
                      )}
                      {options.sell_price && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.sell_price}
                        </td>
                      )}

                      {options.costPrice && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.cost_price}
                        </td>
                      )}

                      {options.price && (
                        <Tooltip title="Price = Sell price * (1+VAT)">
                          <td className="border border-gray-300 p-2 text-sm">
                            {content?.price}
                          </td>
                        </Tooltip>
                      )}
                      {options.totalPrice && (
                        <Tooltip title="Total Price = Price * Quantity">
                          <td className="border border-gray-300 p-2 text-sm">
                            {content?.totalPrice ?? 0}
                          </td>
                        </Tooltip>
                      )}
                      {options.VAT && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.VAT}
                        </td>
                      )}
                      {options.note && (
                        <td className="border border-gray-300 p-2 text-sm">
                          {content?.note}
                        </td>
                      )}

                      {options.activities && (
                        <td className="border border-gray-300 p-2 text-sm">
                          <div className="flex items-center gap-1 justify-center">
                            <Button>
                              <FiEdit />
                            </Button>

                            <Button
                              onClick={() =>
                                onDeleteProduct(content?.productId)
                              }
                            >
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
          <span className="text-sm mr-4 text-gray-400 ">
            {t("rowsPerPage")}
          </span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className=" bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500 focus:bg-white "
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
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
  }
);
export default ProductTable;
