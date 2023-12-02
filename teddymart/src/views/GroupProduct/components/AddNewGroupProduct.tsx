import { Divider, Modal, Space, message } from "antd";
import { ButtonComponent, ButtonSelect, TextInputComponent } from "components";
import { COLORS } from "constants/colors";
import { addData } from "controller/addData";
import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { addNewGroupProduct } from "state_management/slices/groupProductSlice";
import { createID } from "utils/appUtils";

type Props = {
    openAddNewGroupProduct: boolean;
    setOpenAddNewSupplier: (openAddNewGroupProduct: boolean) => void;
  };

export default function AddNewGroupProduct ({
    openAddNewGroupProduct,
    setOpenAddNewSupplier,
}: Props) {
    const [groupProductName, setGroupProductName] = useState("");
    const [shelfID, setShelfID] = useState("");
    const [shelfName, setShelfName] = useState("");
    const [note, setNote] = useState("");
    const SHELF = useSelector((state: RootState) => state.shelf);
    const ShelfOptions = SHELF.map((item) => ({
      ID: item.shelfId,
      shelfname: item.shelfName
    }))

    

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const handleInputChange = (
      value: string,
      setValue: React.Dispatch<React.SetStateAction<string>>,
      fieldName: string
    ) => {
      setValue(value);
      validateForm(fieldName, value);
    };
    const [isFormValid, setIsFormValid] = useState(false);
    const validateForm = (fieldName: string, value: string) => {
      if (fieldName === "groupProductName")
        setIsFormValid(value !== "" && shelfID !== "" && shelfName !== "");
      else if (fieldName === "shelfID")
      setIsFormValid(value !== "" && groupProductName !== "");
    };


    const onAddNewGroupProduct = () => {
        const GroupID = createID({ prefix: "GP" });
        const data: TGroupProduct = {
            groupId: GroupID,
            groupName: groupProductName,
            shelfID: shelfID,
            shelfName: shelfName,
            note: note
        };
        dispatch(addNewGroupProduct(data));
        addData({ data, table: "Group_Product", id: GroupID });
        message.success("Group Product added successfully!")
        setOpenAddNewSupplier(false);
    }

    return (
        <Modal
            title={<h1 className="text-2xl">{t("product.addNewProduct")}</h1>}
            width={"60%"}
            open={openAddNewGroupProduct}
            onCancel={() => setOpenAddNewSupplier(false)}
            footer={false}
      >
        <Divider style={{ backgroundColor: "black" }} />
        <div className="grid grid-cols-4">
          <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("group.groupName")}{" "}
            <p className="inline-block text-red-600">*</p>
          </label>
          <div className="px-2 col-span-3 inline-block">
            <TextInputComponent
              value={groupProductName}
              setValue={(value) => handleInputChange(value, setGroupProductName, "groupProductName")}
              width="100%"
            />
          </div>

          <label className="mt-5 self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("shelf.shelfName")} <p className="inline-block text-red-600">*</p>
          </label>
          <div className="mt-5 col-span-3 inline-block">
            <ButtonSelect
                  iconRight={
                    <IoMdArrowDropdown
                      style={{ marginLeft: 50, color: "gray" }}
                    />
                  }
                  width="100%"
                  title="All"
                  label={t("shelf.shelfName")}
                  value={shelfName}
                  setValue={(value) => {
                    setShelfName(ShelfOptions[value].shelfname)
                    handleInputChange(ShelfOptions[value].ID, setShelfID, "shelfID")
                  }}
                  options={ShelfOptions.map((item) => (item.shelfname))}
                />
          </div>

          <label className="mt-5 self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
            {t("note")}
          </label>
          <div className="px-2 mt-5 col-span-3 inline-block">
            <TextInputComponent
                value={note}
                setValue={setNote}
                width="100%"
            />
          </div>
        </div>
        <div className="flex mt-10 items-center justify-center">
          <Space>
            <ButtonComponent
              label={t("button.save")}
              backgroundColor={
                isFormValid ? COLORS.darkYellow : COLORS.defaultWhite
              }
              color={isFormValid ? COLORS.defaultWhite : COLORS.lightGray}
              onClick={() => {isFormValid?onAddNewGroupProduct() : message.error(t("fillData"))}}
            />
            <ButtonComponent
              label={t("button.cancel")}
              onClick={() => {
                setOpenAddNewSupplier(false);
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
    )
}