import { Select } from "antd";
import ButtonComponent from "components/ButtonComponent";
import { BillTable } from "components/TableComponent";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
const CATEGORY = [
  { value: "date", label: "Date" },
  { value: "import", label: "Import Order" },
  { value: "export", label: "Export Order" },
  { value: "revenue", label: "Revenue" },
];
export default function GeneralTable() {
  return (
    <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md mt-5 py-10">
      <div className="divide-y">
        {/* Header */}
        <div className="pt-5 pb-2 px-3">
          <TextComponent
            fontWeight="font-medium"
            color={COLORS.sidebar}
            fontSize={16}
          >
            Report By Date
          </TextComponent>
        </div>
        <div className="w-full pt-5 pb-2 px-3 flex items-center justify-between">
          <div className="relative ml-4" style={{ width: "50%" }}>
            <Select
              mode="tags"
              onChange={() => {}}
              options={CATEGORY}
              style={{ width: "100%" }}
            />
            <div className="absolute bg-white -top-2 left-2 text-10 text-txt_mediumgrey font-normal">
              Custom display
            </div>
          </div>
          <ButtonComponent
            onClick={() => {}}
            label="Export Report"
            maxWidth={200}
          />
        </div>
      </div>
      <BillTable />
    </div>
  );
}
