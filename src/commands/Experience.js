import { EXPERIENCE_CMD_OUTPUT } from "../variables";

const Experience = () => {
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
            {EXPERIENCE_CMD_OUTPUT.map((item, index) => (
                <div key={index}>
                    <div style={{ display: "flex", alignItems: "center", gap: '1rem' }}>
                        <h3>{item.title} at {item.company}</h3>
                        <div style={{ fontSize: "0.8rem", fontStyle: "italic" }}>{item.date}</div>
                    </div>
                    <p>{item.description}</p>
                    <div style={{ gap: '0.2rem', display: "flex", flexDirection: "column", fontStyle: "italic", fontSize: "0.8rem" }}>
                        <div>Languages: {item.languages}</div>
                        {item.frameworks && <div>Frameworks: {item.frameworks}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Experience;
