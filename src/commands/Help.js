import { HELP_CMD_OUTPUT } from "../variables";

const Help = () => {
  return (
    <>
      <div>{HELP_CMD_OUTPUT[0]}</div>
      <div>{HELP_CMD_OUTPUT[1]}</div>
      <div>{HELP_CMD_OUTPUT[2]}</div>
    </>
  );
};

export default Help;
