import {
  BillTable,
  CustomerTable,
  PartnerTable,
  ProductTable,
  WareHouseTable,
} from "components/TableComponent";

export default function LoginScreen() {
  return (
    <div className="flex-1">
      <BillTable />
      <CustomerTable />
      <PartnerTable />
      <ProductTable />
      <WareHouseTable />
    </div>
  );
}
