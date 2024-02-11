import { HELP_CMD_OUTPUT } from "../variables";

const Help = () => {
  return (
    <div
      style={{
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      {HELP_CMD_OUTPUT.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
};

export default Help;
