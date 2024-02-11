import React, { useEffect } from "react";

const ChangeDirectory = ({ args }) => {
  useEffect(() => {
    const newPath = args.join("/");

    window.location.href += `${newPath}/`;
  }, [args]);

  return <></>;
};

export default ChangeDirectory;
