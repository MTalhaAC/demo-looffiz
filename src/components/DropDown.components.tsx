import { Dropdown, MenuProps, Space } from "antd"
import React from "react";

interface DropDownMenuProps {
    setIsSignInOrSignUp: (value: string) => void;
    isSignInOrSignUp: string;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({
    setIsSignInOrSignUp,
    isSignInOrSignUp
}) => {

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p>
                    Signin
                </p>
            ),
            onClick: () => {
                setIsSignInOrSignUp('');
            }
        },
        {
            key: '2',
            label: (
                <p>
                    Signup
                </p>
            ),
            onClick: () => {
                setIsSignInOrSignUp('create');
            }
        },
    ];

    return (
        <>
            <Dropdown menu={{ items }} overlayStyle={{ cursor: "pointer" }}>
                <Space>
                    {
                        isSignInOrSignUp === '' ? <p>Signin</p> : <p>Signup</p>
                    }
                </Space>
            </Dropdown>
        </>
    )
}

export default DropDownMenu;