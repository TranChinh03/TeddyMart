import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalSelectDate } from "components";
type Props = {
  time: D;
  setTime: Function;
};

export default function SubHeader({ time, setTime }: Props) {
  const { t } = useTranslation();
  //const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="w-full bg-white flex items-center justify-between px-4 py-2">
      <TextComponent color={COLORS.sidebar} fontSize={18} letterSpacing={0.8}>
        {t("report.overviewReport")}
      </TextComponent>
      <ModalSelectDate setResult={setTime} width={"90%"} />
    </div>
  );
}
