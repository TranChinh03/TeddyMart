import Header from "components/Header";
import { ResponsiveContainer } from "recharts";
import { PartnerTable } from "components/TableComponent";
import FieldCustomer from "./Components/FieldCustomer";
import AdvancedSearch from "./Components/AdvancedSearch";

export default function CustomerScreen() {
  const chartWidth = window.innerWidth * 0.7;

  return (
    <div className="w-full">
      <Header width={"100%"} title={"Customer"} />
      <div
        className="bg-white border-2 p-5 mx-1.5 my-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FieldCustomer />
        <AdvancedSearch />
        <PartnerTable />
      </div>
    </div>
  );
}
