import ButtonSelect from "components/ButtonSelect";
import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { BiCalendar } from "react-icons/bi";
export default function SubHeader() {
  return (
    <div className="w-full bg-white flex items-center justify-between px-4 py-2">
      <TextComponent
        fontWeight="font-semibold"
        color={COLORS.sidebar}
        fontSize={20}
      >
        OVERVIEW REPORT
      </TextComponent>
      <ButtonSelect
        iconRight={<BiCalendar style={{ marginLeft: 10 }} />}
        title="19/10/2023 - 19/10/2023"
      />
    </div>
  );
}
