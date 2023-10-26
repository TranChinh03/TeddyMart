import Header from "components/Header";
import { SubHeader, CardButton, Chart } from "./components";
import GeneralTable from "./components/GeneralTable";

export default function ReportScreen() {
  return (
    <div className="flex-col bg-extreme_lg_grey pb-10">
      <Header width={"100%"} title={"Report"} />
      <SubHeader />
      <div className="p-5 grid md:grid-cols-4 gap-4 grid-cols-1 sm:grid-cols-2">
        <CardButton title="NET REVENUE" tooltip="Net revenue" />
        <CardButton title="EXPORT ORDERS" tooltip="Net revenue" />
        <CardButton title="IMPORT ORDERS" tooltip="Net revenue" />
        <CardButton title="NET REVENUE" tooltip="Net revenue" />
        <CardButton title="EXPORT ORDERS" tooltip="Net revenue" />
        <CardButton title="IMPORT ORDERS" tooltip="Net revenue" />
      </div>
      <Chart />
      <GeneralTable />
    </div>
  );
}
