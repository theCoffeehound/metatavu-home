import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts";
import { renderCustomizedTooltipBarChart, totalTimeToChart } from "../../utils/chart-utils";
import { theme } from "../../theme";
import strings from "../../localization/strings";
import { getHours } from "../../utils/time-utils";
import { personTotalTimeAtom } from "../../atoms/person";
import { useAtomValue } from "jotai";
import { Worktime } from "../../types";

/**
 * Time bank overview chart component
 */
const TimebankOverviewChart = () => {
  // rome-ignore lint/style/noNonNullAssertion: personTotalTime is validated in the parent component with conditional return
  const personTotalTime = useAtomValue(personTotalTimeAtom)!;
  const chartData = totalTimeToChart(personTotalTime);

  return (
    <ResponsiveContainer width="75%" height={250}>
      <BarChart
        data={chartData}
        layout="vertical"
        barGap={0}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <XAxis
          type="number"
          axisLine={false}
          tickFormatter={(value) => getHours(value as number)}
          domain={[0, (dataMax: number) => dataMax]}
        />
        <YAxis type="category" dataKey="name" />
        <Tooltip content={renderCustomizedTooltipBarChart} />
        <Legend />
        <Bar
          dataKey={Worktime.Billable}
          name={strings.timebank.billableProject}
          barSize={60}
          stackId="stackedBar"
          fill={theme.palette.success.dark}
        />
        <Bar
          dataKey={Worktime.NonBillable}
          name={strings.timebank.nonBillableProject}
          barSize={60}
          stackId="stackedBar"
          fill={theme.palette.success.light}
        />
        <Bar
          dataKey={Worktime.Internal}
          name={strings.timebank.internal}
          barSize={60}
          stackId="stackedBar"
          fill={theme.palette.warning.main}
        />
        <Bar
          dataKey={Worktime.Expected}
          name={strings.timebank.expected}
          barSize={60}
          stackId="stackedBar"
          fill={theme.palette.info.main}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimebankOverviewChart;
