import { ModalSelectDate } from "components";
import ButtonComponent from "components/ButtonComponent";
import GeneralReportTable from "components/TableComponent/components/GeneralReportTable";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LiaFileExcel } from "react-icons/lia";
export default function GeneralReport() {
  const { t } = useTranslation();
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });

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

          <ButtonComponent
            onClick={() => {}}
            label={t("button.exportReport")}
            backgroundColor={COLORS.mediumBlack}
            color={COLORS.defaultWhite}
            iconLeft={<LiaFileExcel size={20} color="white" />}
          />
        </div>
      </div>
      <div className="w-[98%] self-center flex mx-auto">
        <GeneralReportTable date={date} />
      </div>
    </div>
  );
}
