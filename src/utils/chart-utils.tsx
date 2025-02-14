import { Box, Typography } from "@mui/material";
import { TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { DailyEntry, PersonTotalTime } from "../generated/client";
import strings from "../localization/strings";
import { theme } from "../theme";
import { getHoursAndMinutes } from "./time-utils";
import { CustomLabel } from "../types";

/**
 * Reformats inputted daily entry to be presented in the pie chart
 *
 * @param dailyEntry
 * @returns an array of elements each representing a section in the pie chart
 */
export const dailyEntryToChart = (dailyEntry: DailyEntry) => [
  { name: strings.timebank.billableProject, dataKey: dailyEntry.billableProjectTime },
  { name: strings.timebank.nonBillableProject, dataKey: dailyEntry.nonBillableProjectTime },
  { name: strings.timebank.internal, dataKey: dailyEntry.internalTime }
];

/**
 * Reformats inputted person total time object to be presented in the bar chart
 *
 * @param personTotalTime
 * @returns an array of objects, each object representing a bar in the bar chart
 */
export const totalTimeToChart = (personTotalTime: PersonTotalTime) => [
  {
    name: strings.timebank.logged,
    internal: personTotalTime.internalTime,
    billableProject: personTotalTime.billableProjectTime,
    nonBillableProject: personTotalTime.nonBillableProjectTime
  },
  { name: strings.timebank.expected, expected: personTotalTime.expected }
];

/**
 * Renders custom labels in the pie chart
 *
 * @param props Props from the pie chart data, such as name and value
 * @returns string
 */
export const renderCustomizedLabel = (props: CustomLabel) =>
  `${props.name} ${getHoursAndMinutes(props.value)}`;

/**
 * Renders a customized tooltip when hovering over the chart. Pie chart version.
 *
 * @param props props, such as displayed data (payload), passed from the parent (chart)
 * @returns JSX element as a tooltip
 */
export const renderCustomizedTooltipPieChart = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload } = props;
  if (!active || !payload || !payload.length) {
    return null;
  }

  const selectedData = payload[0];

  if (!selectedData.value || !selectedData.name) {
    return null;
  }

  const sectionName = {
    [strings.timebank.billableProject]: strings.timebank.billableProject,
    [strings.timebank.nonBillableProject]: strings.timebank.nonBillableProject,
    [strings.timebank.internal]: strings.timebank.internal
  }[selectedData.name];

  return (
    <Box style={{ backgroundColor: "rgba(0, 0, 0)", opacity: "70%" }}>
      <Typography
        variant="h6"
        style={{
          color: "#fff",
          padding: theme.spacing(1)
        }}
      >
        {`${sectionName}: ${getHoursAndMinutes(selectedData.value as number)}`}
      </Typography>
    </Box>
  );
};

/**
 * Renders MUI typography element inside the tooltip
 *
 * @param name Data name
 * @param time Data value, time in minutes
 * @param color Font color of the line
 * @returns MUI Typography line inside the tooltip containing data name and value.
 */
const renderCustomizedTooltipRow = (name: string, time: number, color: string) => (
  <Typography
    variant="h6"
    style={{
      color: color,
      padding: theme.spacing(1)
    }}
  >
    {`${name}: ${getHoursAndMinutes(time)}`}
  </Typography>
);

/**
 * Renders a customized tooltip when hovering over the chart. Bar chart version.
 *
 * @param props props, such as chart values, passed from the parent (chart)
 * @returns JSX element as a tooltip
 */
export const renderCustomizedTooltipBarChart = (props: TooltipProps<ValueType, NameType>) => {
  const { active, payload } = props;

  if (!active || !payload || !payload.length || !payload[0].payload) {
    return null;
  }

  const { billableProject, nonBillableProject, internal, expected, name } = payload[0].payload;

  return (
    <Box
      style={{
        padding: theme.spacing(1),
        backgroundColor: "#fff",
        border: "1px solid rgba(0, 0, 0, 0.4)"
      }}
    >
      <Typography
        variant="h6"
        style={{
          padding: theme.spacing(1)
        }}
      >
        {name}
      </Typography>
      {billableProject &&
        renderCustomizedTooltipRow(
          strings.timebank.billableProject,
          billableProject as number,
          theme.palette.success.main
        )}
      {nonBillableProject &&
        renderCustomizedTooltipRow(
          strings.timebank.nonBillableProject,
          nonBillableProject as number,
          theme.palette.success.main
        )}
      {internal &&
        renderCustomizedTooltipRow(
          strings.timebank.internal,
          internal as number,
          theme.palette.warning.main
        )}
      {expected &&
        renderCustomizedTooltipRow(
          strings.timebank.expected,
          expected as number,
          theme.palette.info.main
        )}
    </Box>
  );
};
