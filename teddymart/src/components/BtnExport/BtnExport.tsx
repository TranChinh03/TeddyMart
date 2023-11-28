import { ButtonComponent } from "components";
import { useRef } from "react";
import { DownloadTableExcel, downloadExcel } from "react-export-table-to-excel";
import { useTranslation } from "react-i18next";
import { LiaFileExcel } from "react-icons/lia";
type Props = {
  fileName: string;
  sheet: string;
  tableRef: any;
};
export default function BtnExport({
  fileName = "report",
  sheet = "report",
  tableRef,
}: Props) {
  const { t } = useTranslation();
  return (
    <DownloadTableExcel
      filename={fileName}
      sheet={sheet}
      currentTableRef={tableRef?.current}
    >
      <ButtonComponent
        label={t("button.exportExcel")}
        onClick={() => {}}
        style={{ backgroundColor: "#211F30", marginRight: 12 }}
        iconLeft={<LiaFileExcel size={20} color="white" />}
      />
    </DownloadTableExcel>
  );
}
