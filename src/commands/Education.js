import { EDUCATION_CMD_OUTPUT } from "../variables";

const Education = () => {
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
            {EDUCATION_CMD_OUTPUT.map(([university, degree], index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", gap: '0.5rem' }}>
                    <div>{university} {"->"} {degree}</div>
                </div>
            ))}
        </div>
    );
};

export default Education;
