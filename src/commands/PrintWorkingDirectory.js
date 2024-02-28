import React, { useEffect } from "react";

const PrintWorkingDirectory = () => {
    return (
        <div style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
            {window.location.href}
        </div>)
        ;
};

export default PrintWorkingDirectory;
