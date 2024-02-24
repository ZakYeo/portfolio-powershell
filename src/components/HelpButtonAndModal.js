import React, { useState } from "react";
import { FloatButton, Modal, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';
import '../styles/HelpButtonAndModal.css';

const HelpButtonAndModal = ({ setExecuteHelpCommand }) => {
    const [helpModal, setHelpModalOpen] = useState(false);

    const handleExecuteCommand = () => {
        setHelpModalOpen(false);
        setExecuteHelpCommand(true);
    };

    return (
        <>
            <Modal
                title="What Is This And Where Am I?"
                open={helpModal}
                onOk={() => setHelpModalOpen(false)}
                onCancel={() => setHelpModalOpen(false)}
                wrapClassName="custom-modal"
                centered
                footer={[
                    <Button key="execute-command" type="primary" onClick={() => handleExecuteCommand()}>
                        Execute 'help' command
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => setHelpModalOpen(false)}>
                        OK
                    </Button>,
                ]}
            >
                <p>Welcome to my website!</p>
                <p>Here, you will find that this is not your traditional website. <br /> To navigate this website, you must type a command into the input, and press enter.</p>
                <p>Don't worry, it's easy! Start by trying the command 'help', or press the 'Execute 'help' command' button!</p>
                <p>Once you get comfortable, you can find information about myself & fun & interesting features I've implemented into this site.</p>
                <p>Enjoy!</p>
            </Modal>
            <FloatButton icon={<QuestionCircleOutlined />} onClick={() => setHelpModalOpen(true)} />
        </>
    );
};


export default HelpButtonAndModal;
