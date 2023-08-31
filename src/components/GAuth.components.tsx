import React, { } from 'react';
import { Button, Form, Input, Modal, Space } from 'antd';
import { FC } from 'react';
import { auth, GAuthProvider } from '../configs/firebase.configs';
import { UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import DropDownMenu from './DropDown.components';

interface GAuthProps { };

interface GAuthStateProps {
    email: string;
    password: string;
    isModalOpen: boolean;
    errorState: any;
    isSignInOrSignUp: string;
}


const GAuth: FC<GAuthProps> = () => {

    const [GAuthState, setGAuthState] = React.useState<GAuthStateProps>({
        email: '',
        password: '',
        isModalOpen: false,
        errorState: null,
        isSignInOrSignUp: ''
    });

    const { isModalOpen, errorState, isSignInOrSignUp } = GAuthState;

    const [form] = Form.useForm();

    const callbacks = React.useCallback((value: string) => setGAuthState((prevState: GAuthStateProps) => {
        return {
            ...prevState,
            isSignInOrSignUp: value
        }
    }), [isSignInOrSignUp]);


    const handleGoogleAuth = async () => {
        try {
            const result = await signInWithPopup(auth, GAuthProvider);
            const user = result.user;
            console.log('Google user:', user);
            console.log('Google user:', result);
        } catch (error) {
            console.error('Google authentication error:', error);
        }
    };


    const showModal = () => {
        // setIsModalOpen(true);
        setGAuthState((prevState: GAuthStateProps) => {
            return {
                ...prevState,
                isModalOpen: true
            }
        })
    };

    const handleOk = () => {

        // setIsModalOpen(false);
        // setErrorState(null);

        setGAuthState((prevState: GAuthStateProps) => {
            return {
                ...prevState,
                isModalOpen: false,
                errorState: null,
            }
        })
        console.info("Modal OK");
    };

    const handleCancel = () => {

        setGAuthState((prevState: GAuthStateProps) => {
            return {
                ...prevState,
                isModalOpen: false,
                errorState: null,
            }
        })
        // setIsModalOpen(false);
        // setErrorState(null);
        console.info("Modal Cancel");
    };


    const handleEmailAndPasswordAuth = async (type?: string) => {
        try {
            const { email, password } = form.getFieldsValue(['email', 'password']);



            console.log(email, password);

            if (type === 'create' && email !== '' && password !== '') {
                const confirmation = await createUserWithEmailAndPassword(auth, email, password);
                setGAuthState((prevState) => ({
                    ...prevState,
                    errorState: null,
                }));
                console.log("create - user", confirmation.user);
                return;
            }

            if (!type && email !== '' && password !== '') {
                const confirmation = await signInWithEmailAndPassword(auth, email, password);
                setGAuthState((prevState) => ({
                    ...prevState,
                    errorState: null,
                }));
                console.log("User sign in - user", confirmation.user);
                return;
            }
        } catch (error) {
            setGAuthState((prevState) => ({
                ...prevState,
                errorState: error,
            }));
            showModal();
        }
    };

    const onFinish = (values: any) => {
        const { email, password } = values;
        setGAuthState((prevState) => ({
            ...prevState,
            errorState: null,
            email: email,
            password: password,
        }));
    };


    return (
        <>
            <div style={{ width: '300px', margin: '0 auto', paddingTop: '100px' }}>
                {
                    isModalOpen && (<Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>{errorState?.message}</p>
                    </Modal>)
                }
                <Form onFinish={onFinish} form={form}>

                    <Form.Item>
                        <DropDownMenu isSignInOrSignUp={isSignInOrSignUp} setIsSignInOrSignUp={callbacks} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { type: 'email', message: 'Please enter valid input' },
                            { required: true, message: 'Please input your email!' }
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%' }}
                            onClick={() => {
                                form.submit();
                                handleEmailAndPasswordAuth(isSignInOrSignUp)
                            }}
                        >
                            Log In
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="default"
                            onClick={() => handleGoogleAuth()}
                            style={{ width: '100%' }}
                        >
                            Log In with Google
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            {
                                errorState?.code
                            }
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default GAuth;