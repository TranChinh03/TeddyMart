import { Card, Divider, Modal, Space, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  ButtonComponent,
  DropdownComponent,
  TextInputComponent,
} from "components";
import { ProductTable } from "components/TableComponent";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { db } from "firebaseConfig";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewOrder } from "state_management/slices/orderSlice";
import { createOrderID } from "utils/appUtils";
const CUS_INFO = {
  customerName: "NVA",
  gender: "Male",
  phoneNumber: 123123,
  totalBuyAmount: 123,
  email: "123123@gmail.com",
  debt: 0,
};
type ListProduct = {
  productId: string;
  productName: string;
  quantity: number;
};
const AddForm = ({
  openAddForm,
  setOpenAddForm,
}: {
  openAddForm: boolean;
  setOpenAddForm: (openAddForm: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [warehouseName, setWarehouseName] = useState("Central Warehouse");
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchCustomer, setSearchCustomer] = useState("");
  const [voucher, setVoucher] = useState("");
  const [payment, setPayment] = useState("");
  const [note, setNote] = useState("");
  const listWarehouseName = useSelector(
    (state: RootState) => state.warehouseSlice
  ).map((value) => value.warehouseName);
  const vouchers = useSelector((state: RootState) => state.voucherSlice);
  const { userId } = useSelector((state: RootState) => state.manager);
  const [sum, setSum] = useState(1000);
  const [listProduct, setListProduct] = useState<ListProduct[]>([]);

  const getVoucherInfo = (voucherName: string) => {
    let item = vouchers.find((value) => value.voucherName === voucherName);
    return {
      discount: item?.discountAmount ?? 0,
      voucherId: item?.voucherId ?? "",
    };
  };
  const partners = useSelector((state: RootState) => state.partnerSlice);
  const discount = getVoucherInfo(voucher).discount;
  const voucherId = getVoucherInfo(voucher).voucherId;
  const dispatch = useDispatch();
  const customerInfo = useMemo(() => {
    let customer = partners.find((partner) =>
      partner.phoneNumber.includes(searchCustomer)
    );
    return customer;
  }, [searchCustomer]);
  const onAddOrder = async () => {
    const orderId = createOrderID();
    const data: TOrder = {
      createdAt: new Date(),
      debt: sum - discount - +payment,
      discount: discount,
      listProduct: listProduct,
      note: note,
      orderId: orderId,
      partnerId: customerInfo.partnerId,
      partnerName: customerInfo.partnerName,
      payment: +payment,
      seller: "TeddyMart",
      status: +payment > 0 ? "paid" : "unpaid",
      totalPayment: sum,
      type: "Export",
      voucherId: voucherId,
      receiver: "TeddyMart",
    };
    await setDoc(doc(db, `/Manager/${userId}/Orders`, orderId), data);
    dispatch(addNewOrder(data));
  };
  console.log(voucher);
  return (
    <Modal
      title={<h1 className="text-2xl">{t("sale.addNewOrder")}</h1>}
      width={"70%"}
      open={openAddForm}
      onCancel={() => setOpenAddForm(false)}
      footer={false}
    >
      <Divider style={{ borderWidth: 1, borderColor: "#9A9A9A" }} />
      <Card
        title={<h1 className=" text-2xl">{t("sale.customerInfo")}</h1>}
        bordered={true}
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#9A9A9A",
        }}
      >
        <div className="flex w-full items-center gap-4">
          <TextInputComponent
            width={"100%"}
            iconLeft={<BiSearch size={28} />}
            setValue={setSearchCustomer}
            placeHolder={t("sale.searchCusPhoneNumber")}
          />
          <ButtonComponent
            label={t("partner.addNewCustomer")}
            onClick={() => {}}
          />
        </div>
        <div className="grid grid-cols-4 gap-3 my-5">
          <h1 className=" text-base font-medium">
            {t("partner.customerName")}
          </h1>
          <h1 className="text-base italic">{customerInfo?.partnerName}</h1>

          <h1 className=" text-base font-medium">{t("partner.gender")}</h1>
          <h1 className="text-base italic">{customerInfo?.gender}</h1>

          <h1 className=" text-base font-medium">{t("partner.phoneNumber")}</h1>
          <h1 className="text-base italic">{customerInfo?.phoneNumber}</h1>

          <h1 className=" text-base font-medium">
            {t("partner.totalBuyAmount")}
          </h1>
          <h1 className="text-base italic">{customerInfo?.totalBuyAmount}</h1>

          <h1 className=" text-base font-medium">{t("partner.email")}</h1>
          <h1 className="text-base italic">{customerInfo?.email}</h1>

          <h1 className=" text-base font-medium">{t("partner.debt")}</h1>
          <h1 className="text-base italic">{customerInfo?.debt}</h1>
        </div>
      </Card>
      <Card
        title={
          <Space>
            <h1 className=" text-2xl">{t("product.productInfo")}</h1>
            <DropdownComponent
              options={listWarehouseName}
              value={warehouseName}
              setValue={setWarehouseName}
            />
          </Space>
        }
        bordered={true}
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#9A9A9A",
          marginBlock: 12,
        }}
      >
        <div className="flex w-full items-center gap-4">
          <TextInputComponent
            width={"100%"}
            iconLeft={<BiSearch size={28} />}
            placeHolder={t("product.searchProduct")}
            setValue={setSearch}
            enterAction={() => {
              setOpenSearchModal(!openSearchModal);
            }}
          />
          <ButtonComponent
            label={t("product.addNewProduct")}
            onClick={() => {}}
          />
        </div>
        <div className="my-5">
          <ProductTable
            filterOption={{
              productGroup: false,
              productGroupName: false,
              totalPrice: true,
              quantity: true,
              productImage: false,
              VAT: false,
              sell_price: false,
            }}
            productName={search}
            warehouseName={warehouseName}
            isEditQuantity={true}
          />
        </div>
      </Card>
      <Card
        title={<h1 className=" text-2xl">{t("voucher.voucherInfo")}</h1>}
        bordered={true}
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#9A9A9A",
          marginBlock: 12,
        }}
      >
        <DropdownComponent
          value={voucher}
          setValue={setVoucher}
          options={["Voucher A - 50%", "Voucher B - 20%", "Voucher C - 10%"]}
        />
      </Card>
      <Card
        title={<h1 className=" text-2xl">{t("voucher.note")}</h1>}
        bordered={true}
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: "#9A9A9A",
          marginBlock: 12,
        }}
      >
        <TextArea
          placeholder={t("voucher.placeholderNote")}
          rows={4}
          maxLength={150}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Card>
      <div className="flex items-centers">
        <div className="flex w-[100%]" />
        <div className=" grid grid-cols-2 gap-4 w-[30%] self-end">
          <Tooltip title="Payment = Sum(Total Price) ">
            <h1 className=" text-base font-medium">{t("sale.payment")}:</h1>
          </Tooltip>
          <h1 className=" text-base italic">${sum}</h1>

          <h1 className=" text-base font-medium">{t("sale.discount")}:</h1>
          <h1 className=" text-base italic">{discount}</h1>

          <Tooltip title="Total Payment = Payment * ( 1- Discount )">
            <h1 className=" text-base font-medium">
              {t("sale.totalPayment")}:
            </h1>
          </Tooltip>
          <input
            className=" text-base italic"
            defaultValue={payment}
            placeholder="0"
            onChange={(e) => setPayment(e.target.value)}
          ></input>
          <h1 className=" text-base font-medium">{t("sale.debt")}:</h1>
          <h1 className=" text-base italic">{sum - discount - +payment}</h1>
        </div>
      </div>
      <div className=" flex justify-center items-center">
        <ButtonComponent
          label={t("button.addOrder")}
          onClick={onAddOrder}
          paddingHorizontal={30}
          fontSize={26}
        />
      </div>
    </Modal>
  );
};

export default AddForm;
