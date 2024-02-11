import React from "react";

const PowershellTitle = () => {
  return (
    <>
      <div style={styles.titleText}>
        <div>Portfolio PowerShell</div>
        <div>Copyright (C) Zak Yeomanson. All rights reserved.</div>
      </div>
      <div>Type 'help' to get started.</div>
    </>
  );
};

const styles = {
  titleText: {
    paddingBottom: "1rem",
  },
};

export default PowershellTitle;
