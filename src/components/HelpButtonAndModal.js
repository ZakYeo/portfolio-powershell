import React, { useState, useEffect } from "react";
import { FloatButton, Modal, Button } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons';

const HelpButtonAndModal = () => {
    const [helpModal, setHelpModalOpen] = useState(false);

    return (
        <>
            <Modal
                title="Help"
                open={helpModal}
                onOk={() => setHelpModalOpen(false)}
                footer={[
                    <Button key="submit" type="primary" onClick={() => setHelpModalOpen(false)}>
                        OK
                    </Button>,
                ]}
            />
            <FloatButton icon={<QuestionCircleOutlined />} onClick={() => setHelpModalOpen(true)} />
        </>
    );
};


export default HelpButtonAndModal;
