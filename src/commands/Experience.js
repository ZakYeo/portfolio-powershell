

const EXPERIENCE_CMD_OUTPUT = [
    {
        "title": "Software Engineer",
        "company": "Zally",
        "description": "Working on the frontend & backend of an OAuth-compatible continuous authentication solution. By monitoring behavioural patterns & feeding this data into an AI model, Zally can identify and authenticate users behind the device continuously. Here at Zally, I've worked on many different aspects, including becoming an OAuth compatible authentication provider, developing a Mobile app, developing a web SDK, handling AWS resources, managing resources in terraform, and more.",
        "languages": "Python, JavaScript, Bash, CSS, HTML, ReactJS, React Native, Swift, Java",
        "frameworks": "ReactJS, React Native, Terraform, AWS, Expo-Go",
        "date": "Jul 2023 - Present (Current)"
    },
    {
        "title": "Code Sensei",
        "company": "Code Ninja",
        "description": "Taught fundamental coding skills to children aged 5 to 16. Curriculum modelled on the martial arts belt system that introduced students to drag & drop code blocks at the white belt level, progressing into JavaScript & eventually Unity and C# at the black belt level.",
        "languages": "JavaScript, lua, C#",
        "date": "Jan 2023 - Jul 2023 (7 months)"
    },
    {
        "title": "Research & Development (R&D)",
        "company": "Macro 4",
        "description": "Placement year during University. Engaged in team projects, developing both hard & soft skills. Two key contributions throughout the year included the Task Plan Editor, a digital orchestration tool and the InSync Web Application, which modernised an existing mainframe product for web usage.",
        "languages": "Java, HTML, CSS, Assembler, JavaScript",
        "frameworks": "BackboneJS, In-house JS libraries, Log4j2, Apache",
        "date": "Jun 2021 - Jul 2022 (1 year 2 months)"
    },

];

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
                    <div style={{ gap: '0.2rem', display: "flex", flexDirection: "column", fontStyle: "italic" }}>
                        <div>Languages: {item.languages}</div>
                        {item.frameworks && <div>Frameworks: {item.frameworks}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Experience;
