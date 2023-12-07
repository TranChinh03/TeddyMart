import { Divider, Modal, Space, message } from "antd";
import { ButtonComponent, TextInputComponent } from "components";
import { COLORS } from "constants/colors";
import { addData } from "controller/addData";
import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { addNewShelf } from "state_management/slices/shelfSlice";
import { createID } from "utils/appUtils";

type Props = {
  openAddNewShelf: boolean;
  setOpenAddShelf: (openAddNewShelf: boolean) => void;
};

export default function AddNewShelf({
  openAddNewShelf,
  setOpenAddShelf,
}: Props) {
  const [shelfName, setShelfName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [note, setNote] = useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const clearValue = () => {
    setShelfName("");
    setCapacity("");
    setNote("");
  };

  const handleInputChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    fieldname: string
  ) => {
    setValue(value);
    validateForm(fieldname, value);
  };
  const [isFormValid, setIsFormValid] = useState(false);
  const validateForm = (fieldName: string, value: string) => {
    if (fieldName === "shelfName") {
      setIsFormValid(value !== "" && capacity !== "");
    } else if (fieldName === "capacity") {
      setIsFormValid(value !== "" && shelfName !== "");
    }
  };

  const onAddNewShelf = () => {
    const ShelfID = createID({ prefix: "S" });
    const data: TShelf = {
      shelfId: ShelfID,
      shelfName: shelfName,
      capacity: +capacity,
      note: note,
    };
    dispatch(addNewShelf(data));
    addData({ data, table: "Shelf", id: ShelfID });
    message.success("Shelf added successfully!");
    setOpenAddShelf(false);
    clearValue();
  };

  return (
    <Modal
      title={<h1 className="text-2xl">{t("shelf.addNewShelf")}</h1>}
      width={"60%"}
      open={openAddNewShelf}
      onCancel={() => setOpenAddShelf(false)}
      footer={false}
    >
      <Divider style={{ backgroundColor: "black" }} />
      <div className="grid grid-cols-4">
        <label className="self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("shelf.shelfName")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="col-span-3 inline-block">
          <TextInputComponent
            value={shelfName}
            setValue={(value) =>
              handleInputChange(value, setShelfName, "shelfName")
            }
            width="100%"
          />
        </div>

        <label className="mt-5 self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("shelf.capacity")} <p className="inline-block text-red-600">*</p>
        </label>
        <div className="mt-5 col-span-3 inline-block">
          <TextInputComponent
            value={capacity}
            setValue={(value) =>
              isNaN(Number(value))
                ? message.error(t("shelf.capacityMustBeANumber"))
                : handleInputChange(value, setCapacity, "capacity")
            }
            width="100%"
          />
        </div>

        <label className="mt-5 self-center font-bold md:text-right mb-1 md:mb-0 pr-4">
          {t("shelf.note")}
        </label>
        <div className="mt-5 col-span-3 inline-block">
          <TextInputComponent value={note} setValue={setNote} width="100%" />
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
            onClick={() => {
              isFormValid ? onAddNewShelf() : message.error(t("fillData"));
            }}
          />
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => {
              setOpenAddShelf(false);
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
}
