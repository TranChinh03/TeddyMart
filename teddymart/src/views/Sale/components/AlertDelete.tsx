import { Modal, Space } from "antd";
import { ButtonComponent } from "components";
import React from "react";
import { useTranslation } from "react-i18next";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { deleteMultiOrder } from "state_management/slices/orderSlice";
type Props = {
  openAlertModal: boolean;
  setOpenAlertModal: (openAlertModal: boolean) => void;
  selectedRows: string[];
};
const AlertDelete = ({
  openAlertModal,
  setOpenAlertModal,
  selectedRows,
}: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <Modal
      open={openAlertModal}
      onCancel={() => setOpenAlertModal(false)}
      footer={false}
    >
      <div className="flex justify-center items-center flex-col">
        <IoAlertCircleOutline size={128} color="#F5BC89" />
        <h1 className=" font-medium" style={{ color: "#9A9A9A", fontSize: 36 }}>
          {t("alertTitle")}
        </h1>
        <h1 style={{ color: "#3E3C3C", fontSize: 24, textAlign: "center" }}>
          {t("alertContent")}
        </h1>
        <Space className="my-4">
          <ButtonComponent
            label={t("button.confirm")}
            onClick={() => {
              dispatch(deleteMultiOrder(selectedRows));
              setOpenAlertModal(false);
            }}
            style={{
              backgroundColor: "#E29930",
              borderWidth: 1,
            }}
          />
          <ButtonComponent
            label={t("button.cancel")}
            onClick={() => setOpenAlertModal(false)}
            backgroundColor="#D9D9D9"
          />
        </Space>
      </div>
    </Modal>
  );
};

export default AlertDelete;
