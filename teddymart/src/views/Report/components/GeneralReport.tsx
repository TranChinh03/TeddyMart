import { ModalSelectDate, BtnExport } from "components";
import ButtonComponent from "components/ButtonComponent";
import GeneralReportTable from "components/TableComponent/components/GeneralReportTable";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LiaFileExcel } from "react-icons/lia";
export default function GeneralReport() {
  const { t } = useTranslation();
  const y = new Date().getFullYear();
  const m = new Date().getMonth();
  const d = new Date().getDate();
  const [date, setDate] = useState<D>({
    from: new Date(y, m, d, 0, 0, 0, 0),
    to: new Date(y, m, d, 0, 0, 0, 0),
  });
  const reportRef = useRef(null);
  return (
    <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md">
      <div className="divide-y">
        {/* Header */}
        <div className="pt-5 pb-2 px-3">
          <TextComponent
            fontWeight="font-medium"
            color={COLORS.sidebar}
            fontSize={16}
          >
            {t("report.reportByDate")}
          </TextComponent>
        </div>
        <div className="w-full py-2 px-3 flex items-center justify-between flex-wrap">
          <ModalSelectDate setResult={setDate} width={"90%"} />
          <BtnExport
            fileName={t("drawer.report")}
            sheet="sheet1"
            tableRef={reportRef}
          />
        </div>
      </div>
      <div className="w-[98%] self-center flex mx-auto">
        <GeneralReportTable date={date} ref={reportRef} />
      </div>
    </div>
  );
}
