import Header from "components/Header";
import {
  SubHeader,
  CardButton,
  Chart,
  GeneralReport,
  ProductReport,
} from "./components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { COLORS } from "constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
export default function ReportScreen() {
  const { t } = useTranslation();
  const CARD_TITLE: string[] = [
    t("report.outcome"),
    t("report.revenue"),
    t("report.profit"),
    t("report.numberOfOrder"),
    t("report.importOrder"),
    t("report.exportOrder"),
  ];
  const [time, setTime] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const { general: GENERAL } = useSelector(
    (state: RootState) => state.reportSlice
  );
  const [cards, setCards] = useState([
    {
      name: "outcome",
      selected: true,
      color: COLORS.red,
      amount: GENERAL?.outcome,
    },
    {
      name: "revenue",
      selected: true,
      color: COLORS.yellow,
      amount: GENERAL?.revenue,
    },
    {
      name: "profit",
      selected: true,
      color: COLORS.green,
      amount: GENERAL?.profit,
    },
    {
      name: "numberOfOrder",
      selected: true,
      color: COLORS.blue,
      amount: GENERAL?.numberOfOrder,
    },
    {
      name: "importOrder",
      selected: true,
      color: COLORS.blue,
      amount: GENERAL?.importOrder,
    },
    {
      name: "exportOrder",
      selected: true,
      color: COLORS.blue,
      amount: GENERAL?.exportOrder,
    },
  ]);
  const onClickCard = (name: string) => {
    let tmp = cards.map((c) => {
      if (c.name === name) {
        return {
          ...c,
          selected: !c.selected,
        };
      }
      return c;
    });
    setCards(tmp);
  };
  return (
    <div className="bg-extreme_lg_grey pb-10 w-full">
      <Header width={"100%"} title={t("report.report")} />
      <SubHeader time={time} setTime={setTime} />
      <div className="p-5 grid md:grid-cols-3 gap-x-8 grid-cols-1 gap-y-4 sm:grid-cols-2">
        {cards.map((card, i) => {
          return (
            <CardButton
              title={CARD_TITLE[i].toLocaleUpperCase()}
              key={i}
              onClick={() => onClickCard(card.name)}
              selected={card.selected}
              color={card.color}
              amount={card.amount ?? 0}
            />
          );
        })}
      </div>
      <Chart
        time={time}
        options={{
          outcome: cards[0].selected,
          revenue: cards[1].selected,
          profit: cards[2].selected,
          numberOfOrder: cards[3].selected,
          importOrder: cards[4].selected,
          exportOrder: cards[5].selected,
        }}
      />
      <GeneralReport />
      <ProductReport />
    </div>
  );
}
