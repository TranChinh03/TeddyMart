import Header from "components/Header";
import { ResponsiveContainer } from "recharts";
import { PartnerTable } from "components/TableComponent";
import FieldSupplier from "./Components/FieldSupplier";
export default function CustomerScreen() {
  const chartWidth = window.innerWidth * 0.7;

  return (
    <div className="flex flex-col w-full">
      <Header width={"100%"} title={"Supplier"} />
      <div
        className="bg-extreme_lg_grey border-2 p-5 mx-1.5 my-1.5 rounded-md"
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <FieldSupplier />
        <ResponsiveContainer width={chartWidth} height={500}>
          <PartnerTable />
        </ResponsiveContainer>
      </div>
    </div>
  );
}
