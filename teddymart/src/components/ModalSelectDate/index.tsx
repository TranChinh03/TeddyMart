import { useState } from "react";
import { DatePickerProps, Modal } from "antd";
import { TextInputComponent, ButtonComponent } from "components";
import { useTranslation } from "react-i18next";
import { FiCalendar } from "react-icons/fi";
import { COLORS } from "constants/colors";
import { timeFormat } from "constants/time";
import { DatePicker } from "antd";
import dayjs from "dayjs";
type Props = {
  setResult: Function;
};
export default function ModalSelectDate({ setResult }: Props) {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [txtDate, setTxtDate] = useState<string>(
    `${timeFormat.format(new Date())} - ${timeFormat.format(new Date())}`
  );
  const [date, setDate] = useState<D>({
    from: new Date(),
    to: new Date(),
  });
  const OPTIONS = [
    {
      name: t("modal.today"),
      value: "today",
    },
    {
      name: t("modal.yesterday"),
      value: "yesterday",
    },
    {
      name: t("modal.in-week"),
      value: "in-week",
    },
    {
      name: t("modal.7-days-ago"),
      value: "7-days-ago",
    },
    {
      name: t("modal.last-week"),
      value: "last-week",
    },
    {
      name: t("modal.in-month"),
      value: "in-month",
    },
    {
      name: t("modal.last-month"),
      value: "last-month",
    },
    {
      name: t("modal.30-days-ago"),
      value: "30-days-ago",
    },
    {
      name: t("modal.in-quarter"),
      value: "in-quarter",
    },
    {
      name: t("modal.last-quarter"),
      value: "last-quarter",
    },
    {
      name: t("modal.in-year"),
      value: "in-year",
    },
    {
      name: t("modal.last-year"),
      value: "last-year",
    },
  ];
  const [mode, setMode] = useState(OPTIONS[0].value);
  const onSelectDate = (value: string) => {
    setMode(value);
    let currentDate = new Date();
    let gap1 = currentDate.getDay();
    let quater = +((currentDate.getMonth() + 1) / 4).toFixed();
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
            currentDate.getTime() - (gap1 - 1) * 24 * 60 * 60 * 1000
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
          to: new Date(currentDate.getTime() - gap1 * 24 * 60 * 60 * 1000),
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
        style={{ borderWidth: 1.2, borderColor: COLORS.lightGray }}
      />
      <Modal
        open={openModal}
        width={"40%"}
        title={t("modal.selectDate")}
        onOk={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        footer={(_, __) => (
          <div className="flex w-full justify-end">
            <ButtonComponent
              label={t("cancel")}
              onClick={() => setOpenModal(false)}
              backgroundColor={COLORS.txt_lightgrey}
            />
            <div className="w-2" />
            <ButtonComponent
              label={t("accept")}
              onClick={() => {
                setTxtDate(
                  `${timeFormat.format(date.from)} - ${timeFormat.format(
                    date.to
                  )}`
                );
                setResult(date);
                setOpenModal(false);
              }}
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
            <div className="w-[40%]  pb-1">
              <p className="text-txt_lightgrey">{t("modal.from")}</p>

              <DatePicker
                value={dayjs(timeFormat.format(date.from), "DD/MM/YYYY")}
                format={"DD/MM/YYYY"}
                onChange={(e: DatePickerProps["value"]) => {
                  if (e) {
                    setDate({
                      from: e.toDate(),
                      to: date.to,
                    });
                  }
                }}
              />
            </div>
            <div className="w-[40%] pb-1 ">
              <p className="text-txt_lightgrey">{t("modal.to")}</p>
              <DatePicker
                value={dayjs(timeFormat.format(date.to), "DD/MM/YYYY")}
                format={["DD/MM/YYYY"]}
                onChange={(e) => {
                  if (e) {
                    setDate({
                      from: date.from,
                      to: e.toDate(),
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
