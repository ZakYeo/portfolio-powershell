import { ABOUT_CMD_OUTPUT } from "../variables";

const About = () => {

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
            {ABOUT_CMD_OUTPUT.map((text, index) => (
                <div key={index} style={{ fontSize: index === 0 ? '1.5rem' : '1rem' }}>{text}</div>
            ))}
        </div>
    );
};

export default About;
