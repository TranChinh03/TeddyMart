import TextComponent from "components/TextComponent";
import { COLORS } from "constants/colors";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "state_management/reducers/rootReducer";
const data = [
  {
    name: "Mon",
    export: 4000,
    import: 2400,
    amt: 2400,
  },
  {
    name: "Tue",
    export: 3000,
    import: 1398,
    amt: 2210,
  },
  {
    name: "Wed",
    export: 2000,
    import: 9800,
    amt: 2290,
  },
  {
    name: "Thur",
    export: 2780,
    import: 3908,
    amt: 2000,
  },
  {
    name: "Fri",
    export: 1890,
    import: 4800,
    amt: 2181,
  },
  {
    name: "Sat",
    export: 2390,
    import: 3800,
    amt: 2500,
  },
  {
    name: "Sun",
    export: 3490,
    import: 4300,
    amt: 2100,
  },
];

type Props = {
  time: D;
  options: {
    outcome: boolean;
    revenue: boolean;
    profit: boolean;
    numberOfOrder: boolean;
    importOrder: boolean;
    exportOrder: boolean;
  };
};
function Chart({ time, options }: Props) {
  const [gap, setGap] = useState(0);
  const { t } = useTranslation();
  const GAPS = [t("report.day"), t("report.week"), t("report.month")];
  const ORDERS = useSelector((state: RootState) => state.order);
  const REPORTS = useSelector((state: RootState) => state.reportSlice);
  console.log("TIME", time);
  const [data, setData] = useState<TReport[]>([]);
  useEffect(() => {
    if (gap === 0) {
    }
  }, [time, gap]);
  return (
    <div className="bg-white border-1.5 mx-5 my-1.5 rounded-md">
      <div className="divide-y">
        {/* Header */}
        <div className="pt-5 pb-2 px-3">
          <TextComponent
            fontWeight="font-medium"
            color={COLORS.sidebar}
            fontSize={16}
          >
            {t("report.overviewChart")}
          </TextComponent>
          <div className="text-xs">{t("report.overviewTitle")}</div>
        </div>
        {/* Button Filter By Hour Day Week Month */}
        <div className="px-3 pt-2 pb-5">
          <div
            style={{ width: "40%" }}
            className="flex items-center shadow-md bg-white border-extreme_lg_grey border rounded"
          >
            {GAPS.map((g, i) => {
              return (
                <button
                  key={i}
                  className={`flex-1 py-2 ${
                    gap === i ? "bg-medium_lg_grey" : "bg-white"
                  }`}
                  onClick={() => setGap(i)}
                >
                  <div
                    className={`text-sm ${
                      gap === i
                        ? "text-highlight_sidebar"
                        : "text-txt_mediumgrey"
                    } `}
                  >
                    {g}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* Chart */}
      <div className="p-5">
        <ResponsiveContainer width={"100%"} height={500}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="linear"
              dataKey="import"
              stroke="#64a4bf"
              strokeWidth={2}
            />
            <Line
              type="linear"
              dataKey="export"
              stroke="#f34334"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;
