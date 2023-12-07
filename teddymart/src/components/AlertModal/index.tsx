import Modal from "antd/es/modal/Modal";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { COLORS } from "constants/colors";
import { ButtonComponent } from "components";
import { useTranslation } from "react-i18next";
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onConfirm?: () => void;
};
export default function AlertModal({ open, setOpen, onConfirm }: Props) {
  const { t } = useTranslation();
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
      <div className="flex items-center justify-center flex-col">
        <AiOutlineExclamationCircle size={100} color={COLORS.darkYellow} />
        <div className="text-2xl text-extra_gray my-2">{t("alertTitle")}</div>
        <div className="text-sm text-extra_gray my-2">{t("alertContent")}</div>
        <div className="flex items-center justify-center my-2">
          <ButtonComponent
            onClick={onConfirm}
            label={t("button.confirm")}
            style={{ marginRight: 20 }}
          />
          <ButtonComponent
            label={t("button.close")}
            backgroundColor={COLORS.lightGray}
            onClick={() => setOpen(false)}
          />
        </div>
      </div>
    </Modal>
  );
}
