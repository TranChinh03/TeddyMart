import { DatePicker, Modal, Space } from "antd";
import { ButtonComponent, TextInputComponent } from "components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewVoucher } from "state_management/slices/voucherSlice";
import { addVoucherFirebase, createID } from "utils/appUtils";
type Props = {
  openAddVoucher: boolean;
  setOpenAddVoucher: (openAddVoucher: boolean) => void;
};
const AddNewVoucherForm = ({ openAddVoucher, setOpenAddVoucher }: Props) => {
  const { t } = useTranslation();
  const [voucherName, setVoucherName] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const { userId } = useSelector((state: RootState) => state.manager);
  const dispatch = useDispatch();
  const onAddNewVoucher = () => {
    const voucherId = createID({ prefix: "VCH" });
    const data: TVoucher = {
      voucherId: voucherId,
      voucherName: voucherName,
      discountAmount: +discountAmount,
      expirationDate: dateTo,
      publicDate: dateFrom,
    };
    dispatch(addNewVoucher(data));
    addVoucherFirebase(data, userId, voucherId);
  };
  return (
    <Modal
      open={openAddVoucher}
      onCancel={() => setOpenAddVoucher(false)}
      title={
        <h1 className=" text-center" style={{ color: "#9A9A9A" }}>
          {t("button.addNew")}
        </h1>
      }
      footer={false}
    >
      <TextInputComponent
        label={t("voucher.voucherName")}
        labelColor="#9A9A9A"
        width={"100%"}
        style={{ marginBlock: 12 }}
      />
      <Space
        style={{
          justifyContent: "space-between",
          width: "100%",
          marginBlock: 12,
        }}
      >
        <Space direction="vertical">
          <label>{t("voucher.expirationDate")}</label>
          <DatePicker onChange={() => {}} style={{ width: 200 }} />
        </Space>
        <Space direction="vertical">
          <label>{t("voucher.publicDate")}</label>
          <DatePicker onChange={() => {}} style={{ width: 200 }} />
        </Space>
      </Space>
      <TextInputComponent
        label={t("voucher.discountAmount")}
        labelColor="#9A9A9A"
        width={"100%"}
        style={{ marginBlock: 12 }}
      />
      {/* <TextInputComponent
        label={t("voucher.note")}
        labelColor="#9A9A9A"
        width={"100%"}
        style={{ marginBlock: 12 }}
      /> */}
      <div className="flex items-center justify-center">
        <ButtonComponent
          label={t("button.publish")}
          onClick={onAddNewVoucher}
          paddingHorizontal={20}
        />
      </div>
    </Modal>
  );
};

export default AddNewVoucherForm;
