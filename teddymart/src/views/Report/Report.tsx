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
    },
    {
      name: "revenue",
      selected: true,
    },
    {
      name: "profit",
      selected: true,
    },
    {
      name: "numberOfOrder",
      selected: true,
    },
    {
      name: "importOrder",
      selected: true,
    },
    {
      name: "exportOrder",
      selected: true,
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
      <div className="p-5 grid md:grid-cols-3 gap-10 grid-cols-1 sm:grid-cols-2">
        {cards.map((card, i) => {
          return (
            <CardButton
              title={CARD_TITLE[i].toLocaleUpperCase()}
              key={i}
              onClick={() => onClickCard(card.name)}
              selected={card.selected}
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
