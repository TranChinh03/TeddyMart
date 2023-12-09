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
type Props = {
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
  setProducts?: (products: TProduct[]) => void;
};
const AddProductToMenu = ({ openMenu, setOpenMenu, setProducts }: Props) => {
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [menu, setMenu] = useState<TProduct[]>([]);
  return (
    <Modal
      open={openMenu}
      onCancel={() => setOpenMenu(false)}
      footer={false}
      width={"40%"}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      title={<h1 className=" text-2xl">{t("product.searchProduct")}</h1>}
    >
      <Divider style={{ backgroundColor: "black" }} />
      <div className="flex row-auto justify-between">
        <DropdownComponent
          options={["All"]}
          label={t("product.productGroup")}
        />
        <TextInputComponent
          icon={<BiSearch />}
          placeHolder={t("partner.searchByName")}
          width={"60%"}
          value={searchName}
          setValue={setSearchName}
        />
      </div>
      <div className="flex row-auto">
        <div className="flex-1" />
        <ButtonComponent
          label={t("button.all")}
          onClick={() => {}}
          style={{ backgroundColor: "#217CA3", marginBlock: 10 }}
        />
      </div>
      <ProductTable productName={searchName} setProducts={setMenu} />
      <div className="flex row-auto">
        <div className="flex-1" />
        <Space>
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {}}
            style={{ backgroundColor: "gray", marginBlock: 10, color: "white" }}
          />
          <ButtonComponent
            label={t("button.addMenu")}
            onClick={() => {
              setProducts(menu);
              setOpenMenu(false);
            }}
            style={{ backgroundColor: "white", marginBlock: 10, color: "gray" }}
          />
        </Space>
      </div>
    </Modal>
  );
};

export default AddProductToMenu;
