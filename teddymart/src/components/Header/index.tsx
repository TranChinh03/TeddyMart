import TextComponent from "components/TextComponent";
import { HeaderProps } from "./props";
import { BiDotsVerticalRounded, BiStar } from "react-icons/bi";
import DropdownImage from "components/DropDownImage";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { COLORS } from "constants/colors";
export default function Header({
  width = "100%",
  title = "Title",
}: HeaderProps) {
  const [language, setLanguage] = useState("VI");
  const numberOfNotifications = 2;
  return (
    <div
      className="flex bg-white border items-center justify-between py-2 px-10"
      style={{ width }}
    >
      <div className="flex items-center">
        <button className="bg-txt_lightgrey w-8 h-8 rounded-full items-center justify-center flex hover:bg-light_grey">
          <BiDotsVerticalRounded />
        </button>
        <TextComponent style={{ marginLeft: 10 }}>{title}</TextComponent>
      </div>
      <div className="flex items-center">
        <DropdownImage
          options={[
            { image: require("assets/images/vn_flag.png"), title: "VI" },
            { image: require("assets/images/en_flag.png"), title: "EN" },
          ]}
          value={language}
          setValue={setLanguage}
        />
        <button className="relative ml-2" onClick={() => {}}>
          <AiOutlineBell size={"20px"} color={COLORS.txt_mediumgrey} />
          <div
            className="absolute w-4 h-4 rounded-full bg-purple items-center justify-center text-10 text-white font-semibold hover:bg-light_purple"
            style={{ top: -5, right: -5 }}
          >
            {numberOfNotifications}
          </div>
        </button>
        <button className="relative ml-2" onClick={() => {}}>
          <BiStar size={"20px"} color={COLORS.txt_mediumgrey} />
        </button>
      </div>
    </div>
  );
}
