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
  const [cards, setCards] = useState([
    {
      name: "outcome",
      selected: true,
      color: COLORS.red,
      amount: 10,
    },
    {
      name: "revenue",
      selected: true,
      color: COLORS.yellow,
      amount: 10,
    },
    {
      name: "profit",
      selected: true,
      color: COLORS.green,
      amount: 10,
    },
    {
      name: "numberOfOrder",
      selected: true,
      color: COLORS.blue,
      amount: 10,
    },
    {
      name: "importOrder",
      selected: true,
      color: COLORS.blue,
      amount: 10,
    },
    {
      name: "exportOrder",
      selected: true,
      color: COLORS.blue,
      amount: 10,
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
      <SubHeader />
      <div className="p-5 grid md:grid-cols-3 gap-x-8 grid-cols-1 gap-y-4 sm:grid-cols-2">
        {cards.map((card, i) => {
          return (
            <CardButton
              title={CARD_TITLE[i].toLocaleUpperCase()}
              key={i}
              onClick={() => onClickCard(card.name)}
              selected={card.selected}
              color={card.color}
              amount={card.amount}
            />
          );
        })}
      </div>
      <Chart />
      <GeneralReport />
      <ProductReport />
    </div>
  );
}
