import { DatePicker, Modal, Space } from "antd";
import { ButtonComponent, Header, TextInputComponent } from "components";
import { VoucherTable } from "components/TableComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiPlus, BiSearch } from "react-icons/bi";
import { PiWarningCircle } from "react-icons/pi";
function VoucherScreen() {
  const { t } = useTranslation();
  const [openAddVoucher, setOpenAddVoucher] = useState(false);
  const [openUpdateVoucher, setOpenUpdateVoucher] = useState(false);
  const [openWarningDelete, setOpenWarningDelete] = useState(false);
  return (
    <div className="w-full">
      {/* <Header width={"100%"} title="Voucher" /> */}
      <body
        className="bg-white border-2 p-5 m-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Space direction="vertical" size={10}>
          <div className="flex items-center justify-between">
            <TextInputComponent
              iconLeft={<BiSearch />}
              placeHolder={t("voucher.searchVoucher")}
              width={"70%"}
            />
            <ButtonComponent
              label={t("button.addNew")}
              onClick={() => setOpenAddVoucher(true)}
              iconLeft={<BiPlus />}
            />
          </div>
          <div className="my-4">
            <VoucherTable />
          </div>
        </Space>
      </body>
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
        <TextInputComponent
          label={t("voucher.note")}
          labelColor="#9A9A9A"
          width={"100%"}
          style={{ marginBlock: 12 }}
        />
        <div className="flex items-center justify-center">
          <ButtonComponent
            label={t("button.publish")}
            onClick={() => {}}
            paddingHorizontal={20}
          />
        </div>
      </Modal>
      <Modal
        open={openUpdateVoucher}
        onCancel={() => setOpenUpdateVoucher(false)}
        title={
          <h1 className=" text-center" style={{ color: "#9A9A9A" }}>
            {t("button.updateVoucher")}
          </h1>
        }
        width={"auto"}
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
            <DatePicker onChange={() => {}} />
          </Space>
          <Space direction="vertical">
            <label>{t("voucher.publicDate")}</label>
            <DatePicker onChange={() => {}} />
          </Space>
        </Space>
        <TextInputComponent
          label={t("voucher.discountAmount")}
          labelColor="#9A9A9A"
          width={"100%"}
          style={{ marginBlock: 12 }}
        />
        <TextInputComponent
          label={t("voucher.note")}
          labelColor="#9A9A9A"
          width={"100%"}
          style={{ marginBlock: 12 }}
        />
        <div className="flex items-center justify-center">
          <ButtonComponent
            label={t("button.updateVoucher")}
            onClick={() => {}}
            paddingHorizontal={20}
          />
        </div>
      </Modal>
      <Modal
        open={openWarningDelete}
        onCancel={() => setOpenWarningDelete(false)}
        width={"30%"}
        footer={false}
      >
        <Space
          direction="vertical"
          size={10}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="flex items-center justify-center">
            <PiWarningCircle color="#F5BC89" size={108} />
          </div>
          <h1 className=" text-2xl font-bold text-center">
            {t("button.areYouSure")}
          </h1>
          <h1 className=" text-17 text-center">{t("warningTxt")}</h1>
          <Space className="flex items-center justify-center" size={20}>
            <ButtonComponent
              label={t("button.cancel")}
              onClick={() => {}}
              backgroundColor="#D9D9D9"
            />
            <ButtonComponent label={t("button.confirm")} onClick={() => {}} />
          </Space>
        </Space>
      </Modal>
    </div>
  );
}

export default VoucherScreen;
