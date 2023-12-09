import { Divider, Modal, Space } from "antd";
import {
  ButtonComponent,
  DropdownComponent,
  TextInputComponent,
} from "components";
import { ProductTable } from "components/TableComponent";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BiSearch } from "react-icons/bi";

const SearchProductForm = ({
  openSearchModal,
  setOpenSearchModal,
}: {
  setOpenSearchModal: (openSearchModal: boolean) => void;
  openSearchModal: boolean;
}) => {
  const { t } = useTranslation();
  return (
    <Modal
      title={
        <h1 className=" text-2xl">{t("product.searchProductFromOrder")}</h1>
      }
      open={openSearchModal}
      onCancel={() => setOpenSearchModal(false)}
      footer={false}
      width={"70%"}
    >
      <Divider style={{ backgroundColor: "black" }} />
      <div className="flex items-center justify-between">
        <DropdownComponent label="Product Group" options={[]} />
        <TextInputComponent
          label="Insert name to search"
          width={"70%"}
          iconLeft={<BiSearch />}
        />
      </div>
      <div className="flex items-center my-3">
        <div className="flex w-full" />
        <ButtonComponent
          label={t("button.displayAll")}
          onClick={() => {}}
          backgroundColor="#74ADC6"
        />
      </div>
      <ProductTable />
      <div className="flex items-center">
        <div className="flex w-full" />
        <Space>
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {}}
            backgroundColor="#9A9A9A"
          />
          <ButtonComponent
            label={t("button.addMenu")}
            onClick={() => {}}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              color: "#9A9A9A",
            }}
          />
        </Space>
      </div>
    </Modal>
  );
};

export default SearchProductForm;
