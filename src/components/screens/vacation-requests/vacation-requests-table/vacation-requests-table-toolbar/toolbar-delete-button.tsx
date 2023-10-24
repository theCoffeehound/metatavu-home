import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import strings from "../../../../../localization/strings";

/**
 * Component properties
 */
interface Props {
  setConfirmationHandlerOpen: (confirmation: boolean) => void;
}
/**
 * Delete Button component
 *
 * @param props component properties
 */
const ToolbarDeleteButton = ({ setConfirmationHandlerOpen }: Props) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: "100%"
      }}
      onClick={() => {
        setConfirmationHandlerOpen(true);
      }}
    >
      <Delete />
      <Typography variant="h6">&nbsp;{strings.tableToolbar.delete}</Typography>
    </Button>
  );
};

export default ToolbarDeleteButton;
