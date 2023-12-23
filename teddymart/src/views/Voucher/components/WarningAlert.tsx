import { Modal, Space } from "antd";
import { ButtonComponent } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { PiWarningCircle } from "react-icons/pi";
type Props = {
  openWarningDelete: boolean;
  setOpenWarningDelete: (openWarningDelete: boolean) => void;
  onConfirm?: () => void;
};
const WarningAlert = ({
  openWarningDelete,
  setOpenWarningDelete,
  onConfirm,
}: Props) => {
  const { t } = useTranslation();
  return (
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
            onClick={() => setOpenWarningDelete(false)}
            backgroundColor="#D9D9D9"
          />
          <ButtonComponent
            label={t("button.confirm")}
            onClick={() => {
              setOpenWarningDelete(false);
              onConfirm();
            }}
          />
        </Space>
      </Space>
    </Modal>
  );
};

export default WarningAlert;
