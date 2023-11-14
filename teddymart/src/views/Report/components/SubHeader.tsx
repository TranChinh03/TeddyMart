import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalSelectDate } from "components";
type Props = {
  //onClickFilter: MouseEventHandler<HTMLButtonElement>;
};

export default function SubHeader({}: Props) {
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const { t } = useTranslation();
  //const [date, setDate] = useState<Date>(new Date());
  return (
    <div className="w-full bg-white flex items-center justify-between px-4 py-2">
      <TextComponent
        fontWeight="font-semibold"
        color={COLORS.sidebar}
        fontSize={18}
        letterSpacing={0.8}
      >
        {t("report.overviewReport")}
      </TextComponent>
      <ModalSelectDate setResult={setDate} />
    </div>
  );
}
