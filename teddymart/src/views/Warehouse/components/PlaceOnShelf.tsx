import { Modal } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
};
export default function PlaceOnShelf({ open, setOpen }: Props) {
  const { t } = useTranslation();
  return (
    <Modal
      title={<h1 className="text-2xl">{t("warehouse.placeShelf")}</h1>}
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      width={"40%"}
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="overflow-y-auto h-96 w-auto">
        <div>AA</div>
      </div>
    </Modal>
  );
}
