import Header from "components/Header";
import {
  SubHeader,
  CardButton,
  Chart,
  GeneralReport,
  ProductReport,
} from "./components";
import { useTranslation } from "react-i18next";

export default function ReportScreen() {
  const { t } = useTranslation();
  const CARDS = [
    {
      title: t("report.outcome"),
      name: "outcome",
    },
    {
      title: t("report.revenue"),
      name: "revenue",
    },
    {
      title: t("report.profit"),
      name: "profit",
    },
    {
      title: t("report.numberOfOrder"),
      name: "numberOfOrder",
    },
    {
      title: t("report.importOrder"),
      name: "importOrder",
    },
    {
      title: t("report.exportOrder"),
      name: "exportOrder",
    },
  ];
  return (
    <div className="bg-extreme_lg_grey pb-10 w-full">
      <Header width={"100%"} title={t("report.report")} />
      <SubHeader />
      <div className="p-5 grid md:grid-cols-3 gap-4 grid-cols-1 sm:grid-cols-2">
        {CARDS.map((card, i) => {
          return (
            <CardButton
              title={card.title.toLocaleUpperCase()}
              key={i}
              onClick={() => {}}
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
