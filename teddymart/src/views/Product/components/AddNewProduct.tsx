import { Divider, Space } from "antd";
import Modal from "antd/es/modal/Modal";
import { ButtonComponent, ButtonSelect } from "components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";

const AddNewProduct = ({
  openAddForm,
  setOpenAddForm,
}: {
  openAddForm: boolean;
  setOpenAddForm: (openAddForm: boolean) => void;
}) => {
  const { t } = useTranslation();
  const [productGroup, setProductGroup] = useState();
  const GROUP = useSelector((state: RootState) => state.groupProduct);

  return (
    <Modal
      title={<h1 className="text-2xl">{t("product.addNewProduct")}</h1>}
      width={"60%"}
      open={openAddForm}
      onCancel={() => setOpenAddForm(false)}
      footer={false}
    >
      <Divider style={{ backgroundColor: "black" }} />
      <div className="grid grid-cols-4">
        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productGroup")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <ButtonSelect
            iconRight={
              <IoMdArrowDown style={{ marginLeft: 50, color: "gray" }} />
            }
            width="100%"
            title="All"
            label={t("group.groupName")}
            value={productGroup}
            setValue={setProductGroup}
            options={GROUP.map((item) => item.groupName)}
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productName")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <input
            type="text"
            className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
            required
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.productImage")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <div
            style={{
              padding: "5px",
              border: "1px solid gray",
              borderRadius: "10px",
              width: "fit-content",
            }}
            className="cursor-pointer m-auto"
          >
            <img src={require("../../../assets/images/Camera.png")} />
          </div>
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.price")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <input
            type="text"
            className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
            required
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.sell_price")}{" "}
          <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <input
            type="text"
            className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
            required
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("product.VAT")}
        </label>
        <div className="col-span-3 inline-block">
          <input
            type="text"
            className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
            required
          />
        </div>

        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("note")}
        </label>
        <div className="col-span-3 inline-block">
          <input
            type="text"
            className="border text-gray-900 text-sm rounded-lg block w-full m-2 p-2"
            required
          />
        </div>
      </div>
      <div className="flex mt-10 items-center justify-center">
        <Space>
          <ButtonComponent
            label={t("button.save")}
            onClick={() => {}}
            backgroundColor="#9A9A9A"
          />
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {
              setOpenAddForm(false);
            }}
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

export default AddNewProduct;
