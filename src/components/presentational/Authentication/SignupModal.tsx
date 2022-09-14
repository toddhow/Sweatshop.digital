import React, { FC, memo, useState } from 'react';
import { Modal, Button, Text, Input, Row, useInput } from '@nextui-org/react';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { updateUser } from '@redux/reducers';
import type { AxiosError, AxiosResponse } from 'axios';

export interface SignupModalProps {
    visible: boolean;
    onClose: () => void;
}

interface error {
    text?: string;
}

interface helperType {
    text: string;
    color:
        | 'default'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'error';
}

const SignupModal: FC<SignupModalProps> = ({ visible = false, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<error>({});

    const { value, reset, bindings } = useInput('');

    const validateEmail = (value: string) => {
        return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
    };

    const helper: helperType = React.useMemo(() => {
        if (!value)
            return {
                text: '',
                color: 'default',
            };
        const isValid = validateEmail(value);
        return {
            text: isValid ? 'Valid Email' : 'Enter a valid email',
            color: isValid ? 'success' : 'error',
        };
    }, [value]);

    const onSubmit = async () => {
        await request
            .post('/auth/signin', {
                user: {
                    email,
                    password,
                },
            })
            .then((response: AxiosResponse) => {
                onClose();
            })
            .catch((error: AxiosError) => {
                setErrors({ text: 'Invalid email or password' });
            });
    };

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={onClose}
        >
            <Modal.Header>
                <Text b size={18}>
                    Sweatshop Digital
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Input
                    {...bindings}
                    clearable
                    shadow={false}
                    onClearClick={reset}
                    status={helper.color}
                    color={helper.color}
                    helperColor={helper.color}
                    helperText={helper.text}
                    type="email"
                    label="Email"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="emailInput"
                    clearable
                    bordered
                    fullWidth
                    color="primary"
                    size="lg"
                    placeholder="Email"
                    contentLeft={<Mail fill="currentColor" />}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    id="passwordInput"
                    clearable
                    bordered
                    fullWidth
                    helperText={errors.text}
                    color="primary"
                    size="lg"
                    placeholder="Password"
                    contentLeft={<Key fill="currentColor" />}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Row justify="space-between"></Row>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onClick={onClose}>
                    Close
                </Button>
                <Button auto onClick={onSubmit}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(SignupModal);
