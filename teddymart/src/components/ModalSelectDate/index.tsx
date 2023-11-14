import React, { Dispatch, SetStateAction, useState, useRef } from "react";
import { Button, Modal } from "antd";
import { TextInputComponent, ButtonComponent } from "components";
import { useTranslation } from "react-i18next";
import { FiCalendar } from "react-icons/fi";
import { COLORS } from "constants/colors";
import { timeFormat } from "constants/time";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { RangePickerRef } from "antd/es/date-picker/generatePicker/interface";
import { DatePickerType } from "antd/es/date-picker";

type Props = {
  txtDate: Date;
  setTxtDate: Function;
};
type D = {
  from: Date;
  to: Date;
};
export default function ModalSelectDate() {
  const { t } = useTranslation();
  const { RangePicker } = DatePicker;
  const [openModal, setOpenModal] = useState(false);
  const [txtDate, setTxtDate] = useState<string>("");
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const ref = useRef<RangePickerRef<Date>>();
  console.log(ref.current);
  const OPTIONS = [
    {
      name: "Today",
      value: "today",
    },
    {
      name: "Yesterday",
      value: "yesterday",
    },
    {
      name: "In week",
      value: "in-week",
    },
    {
      name: "7 days ago",
      value: "7-days-ago",
    },
    {
      name: "Last week",
      value: "last-week",
    },
    {
      name: "In month",
      value: "in-month",
    },
    {
      name: "Last month",
      value: "last-month",
    },
    {
      name: "30 days ago",
      value: "30-days-ago",
    },
    {
      name: "In quarter",
      value: "in-quarter",
    },
    {
      name: "Last quarter",
      value: "last-quarter",
    },
    {
      name: "In year",
      value: "in-year",
    },
    {
      name: "Last year",
      value: "last-year",
    },
    {
      name: "Option",
      value: "option",
    },
  ];
  const [mode, setMode] = useState(OPTIONS[0].value);
  const [openCalendar, setOpenCalendar] = useState(false);
  const onSelectDate = (value: string) => {
    setMode(value);
    let currentDate = new Date();
    let gap1 = currentDate.getDay();
    let quater = +((currentDate.getMonth() + 1) / 4).toFixed();
    //console.log("gap1", gap1);
    switch (value) {
      case "today":
        setDate({
          from: currentDate,
          to: currentDate,
        });
        break;
      case "yesterday":
        setDate({
          from: new Date(currentDate.getTime() - 86400000),
          to: new Date(currentDate.getTime() - 86400000),
        });
        break;
      case "in-week":
        setDate({
          from: new Date(
            currentDate.getTime() - gap1 - 1 * 24 * 60 * 60 * 1000
          ),
          to: currentDate,
        });
        break;
      case "7-days-ago":
        setDate({
          from: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
          to: currentDate,
        });
        break;
      case "last-week":
        setDate({
          from: new Date(
            currentDate.getTime() - (gap1 + 6) * 24 * 60 * 60 * 1000
          ),
          to: new Date(currentDate.getTime() - gap1 - 2 * 24 * 60 * 60 * 1000),
        });
        break;
      case "in-month":
        setDate({
          from: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          to: currentDate,
        });
        break;
      case "last-month":
        setDate({
          from: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
          ),
          to: new Date(currentDate.getFullYear(), currentDate.getMonth(), 0),
        });
        break;
      case "30-days-ago":
        setDate({
          from: new Date(
            currentDate.getTime() - (30 - 1) * 24 * 60 * 60 * 1000
          ),
          to: currentDate,
        });
        break;
      case "in-quarter":
        //console.log("Q", quater);
        setDate({
          from: new Date(currentDate.getFullYear(), quater * 3, 1),
          to: currentDate,
        });
        break;
      case "last-quarter":
        setDate({
          from: new Date(currentDate.getFullYear(), quater * 3 - 3, 1),
          to: new Date(currentDate.getFullYear(), quater * 3, 0),
        });
        break;
      case "in-year":
        setDate({
          from: new Date(currentDate.getFullYear(), 0, 1),
          to: currentDate,
        });
        break;
      case "last-year":
        setDate({
          from: new Date(currentDate.getFullYear() - 1, 0, 1),
          to: new Date(currentDate.getFullYear() - 1, 12, 0),
        });
        break;
      case "option":
        //ref?.current.openPicker();
        setOpenCalendar(!openCalendar);
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <TextInputComponent
        label={t("modal.time")}
        readOnly={true}
        onClick={() => setOpenModal(true)}
        value={txtDate}
        setValue={setTxtDate}
        icon={<FiCalendar />}
        textInputSize="14px"
      />
      <Modal
        open={openModal}
        title="Select Date"
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={(_, __) => (
          <div className="flex w-full justify-end">
            <ButtonComponent
              label={"Cancel"}
              onClick={() => setOpenModal(false)}
              backgroundColor={COLORS.txt_lightgrey}
            />
            <div className="w-2" />
            <ButtonComponent
              label={"Accept"}
              onClick={() =>
                setTxtDate(
                  `${timeFormat.format(date.from)} - ${timeFormat.format(
                    date.to
                  )}`
                )
              }
            />
          </div>
        )}
      >
        <div className="flex items-center justify-center flex-col w-full border-t py-5 px-3">
          <div className="grid grid-cols-3 gap-x-7 gap-y-3 w-full">
            {OPTIONS.map((option, i) => (
              <ButtonComponent
                label={option.name}
                key={i}
                onClick={() => onSelectDate(option.value)}
                backgroundColor={
                  mode !== option.value
                    ? COLORS.defaultWhite
                    : COLORS.highlight_sidebar
                }
                color={
                  mode !== option.value
                    ? COLORS.txt_lightgrey
                    : COLORS.defaultWhite
                }
                style={{
                  borderColor: COLORS.lightGray,
                  borderWidth: 1,
                  justifyContent: "center",
                  fontSize: "14px",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between w-full mt-5">
            <div className="w-[40%] border-dotted border-b-2 border-light_grey pb-1">
              <p className="text-txt_lightgrey">From</p>
              <p className="text-txt_blue">{timeFormat.format(date.from)}</p>
            </div>
            <div className="w-[40%] border-dotted border-b-2 border-light_grey pb-1 ">
              <p className="text-txt_lightgrey">To</p>
              <p className="text-txt_blue">{timeFormat.format(date.to)}</p>
            </div>
          </div>
          {/* <RangePicker open={openCalendar} picker="calendar" /> */}
          <DatePicker value={dayjs()} />
        </div>
      </Modal>
    </div>
  );
}
