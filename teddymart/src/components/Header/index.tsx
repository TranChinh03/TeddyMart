import TextComponent from "components/TextComponent";
import { HeaderProps } from "./props";
import { BiDotsVerticalRounded, BiSolidStar, BiMenu } from "react-icons/bi";
import DropdownImage from "components/DropDownImage";
import { useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { COLORS } from "constants/colors";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
import { toggleDrawer } from "state_management/slices/controlSlice";
export default function Header({
  width = "100%",
  title = "Title",
}: HeaderProps) {
  const [language, setLanguage] = useState("VI");
  const { openDrawer } = useSelector((state: RootState) => state.controlSlice);
  const dispatch = useDispatch();
  //console.log(openDrawer);
  const numberOfNotifications = 2;
  const [showDrawer, setShowDrawer] = useState(false);
  return (
    <div
      className="flex bg-white border-b items-center justify-between py-2 px-10"
      style={{ width }}
    >
      <div className="flex items-center">
        <button
          className="bg-txt_mediumgrey w-8 h-8 rounded-full items-center justify-center flex hover:bg-txt_lightgrey"
          onClick={() => dispatch(toggleDrawer())}
        >
          {!openDrawer ? (
            <BiDotsVerticalRounded color={COLORS.defaultWhite} />
          ) : (
            <BiMenu color={COLORS.defaultWhite} />
          )}
        </button>
        <TextComponent
          style={{ marginLeft: 10, letterSpacing: 0.8 }}
          fontSize={20}
          color={COLORS.extra_gray}
        >
          {title}
        </TextComponent>
      </div>
      <div className="flex items-center">
        <div style={{ marginRight: 20 }}>
          <DropdownImage
            options={[
              { image: require("assets/images/vn_flag.png"), title: "VI" },
              { image: require("assets/images/en_flag.png"), title: "EN" },
            ]}
            value={language}
            setValue={setLanguage}
            width={"15vw"}
          />
        </div>
        <Button
          onClick={() => {}}
          type="text"
          shape="circle"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
          }}
        >
          <AiOutlineBell size={"22px"} color={COLORS.txt_mediumgrey} />
          <div
            className="absolute w-5 h-5 rounded-full bg-purple items-center flex justify-center text-10 text-white font-semibold hover:bg-light_purple"
            style={{ top: -5, right: -6 }}
          >
            {numberOfNotifications}
          </div>
        </Button>
        <Button
          onClick={() => {}}
          type="text"
          shape="circle"
          icon={<BiSolidStar size={"22px"} color={COLORS.checkbox_bg} />}
        />
      </div>
    </div>
  );
}
