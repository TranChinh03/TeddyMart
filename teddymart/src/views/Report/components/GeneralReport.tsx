import { ModalSelectDate } from "components";
import ButtonComponent from "components/ButtonComponent";
import GeneralReportTable from "components/TableComponent/components/GeneralReportTable";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
export default function GeneralReport() {
  const { t } = useTranslation();
  const REPORTS = useSelector((state: RootState) => state.reportSlice);
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });

  const [data, setData] = useState<TReport[]>([]);
  useEffect(() => {
    let tmp: TReport[] = [];
    REPORTS.byDate?.forEach((r) => {
      if (
        new Date(r.date).getTime() >= new Date(date.from).getTime() &&
        new Date(r.date).getTime() <= new Date(date.to).getTime()
      ) {
        tmp.push(r);
      }
      setData(tmp);
    });
  }, [REPORTS, date]);
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
          <div className="flex items-end">
            <ButtonComponent
              onClick={() => {}}
              label={t("button.all")}
              backgroundColor={COLORS.defaultWhite}
              color={COLORS.txt_lightgrey}
              style={{
                borderColor: COLORS.lightGray,
                borderWidth: 1.5,
              }}
            />
            <div className="w-5" />
            <ModalSelectDate setResult={setDate} />
          </div>
          <ButtonComponent
            onClick={() => {}}
            label={t("button.exportReport")}
            backgroundColor={COLORS.defaultBlack}
            color={COLORS.defaultWhite}
          />
        </div>
      </div>
      <div className="w-[98%] self-center flex mx-auto">
        <GeneralReportTable data={data} />
      </div>
    </div>
  );
}
