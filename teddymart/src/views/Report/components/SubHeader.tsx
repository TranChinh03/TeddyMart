import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { Button, DatePicker, Modal, Popover, Select } from "antd";
import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import dayjs from "dayjs";
type Props = {
  //onClickFilter: MouseEventHandler<HTMLButtonElement>;
};
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const TYPES = ["Year", "Quarter", "Month"];
export default function SubHeader({}: Props) {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [year, setYear] = useState(1);
  return (
    <div className="w-full bg-white flex items-center justify-between px-4 py-2">
      <TextComponent
        fontWeight="font-semibold"
        color={COLORS.sidebar}
        fontSize={18}
        letterSpacing={0.8}
      >
        OVERVIEW REPORT
      </TextComponent>
      <div className="flex items-center">
        <div className="relative">
          <DatePicker
            defaultValue={dayjs("2015/01/01", "DD/MM/YYYY")}
            format={"DD/MM/YYYY"}
            onChange={(value, dataString) => alert(value + "\n" + dataString)}
          />
          <div className="absolute bg-white -top-2 left-2 text-10 text-txt_mediumgrey font-normal">
            From
          </div>
        </div>
        <div className="relative ml-4">
          <DatePicker
            defaultValue={dayjs("2015/01/01", "DD/MM/YYYY")}
            format={"DD/MM/YYYY"}
            onChange={(value, dataString) => alert(value + "\n" + dataString)}
          />
          <div className="absolute bg-white -top-2 left-2 text-10 text-txt_mediumgrey font-normal">
            To
          </div>
        </div>

        <Popover
          content={
            <div className="flex-col flex px-0">
              {TYPES.map((type, index) => {
                return (
                  <button
                    key={index}
                    className="py-2 px-2 hover:bg-light_grey w-full items-start flex"
                    onClick={() => {
                      setOpenModal(true);
                      setOpenPopUp(false);
                    }}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          }
          title="Choose Report Mode"
          trigger="click"
          open={openPopUp}
          onOpenChange={() => setOpenPopUp(!openPopUp)}
        >
          <Button
            style={{ marginLeft: "20px" }}
            shape="circle"
            icon={<IoFilter />}
          />
        </Popover>
      </div>
      <Modal
        open={openModal}
        title="Select Time To Report"
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={(_, __) => (
          <>
            <Button onClick={() => setOpenModal(false)}>OK</Button>
          </>
        )}
      >
        <div className="w-full flex items-center justify-around">
          <p>Year</p>
          <Select
            style={{ width: "50%" }}
            placeholder="Tags Mode"
            value={year}
            onChange={(e) => setYear(e)}
          >
            {MONTHS.map((month, i) => (
              <div key={i}>{month}</div>
            ))}
          </Select>
        </div>
        <div className="w-full flex items-center justify-around mt-2">
          <p>Quarter</p>
          <Select
            style={{ width: "50%" }}
            placeholder="Tags Mode"
            value={year}
            onChange={(e) => setYear(e)}
          >
            {MONTHS.map((month, i) => (
              <div key={i}>{month}</div>
            ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}
