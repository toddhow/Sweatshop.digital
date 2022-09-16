import React, { FC, memo, useState } from 'react';
import { Modal, Button, Text, Input, Link, Row } from '@nextui-org/react';
import NextLink from 'next/link';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import type { User } from '@types';
import type { AxiosError, AxiosResponse } from 'axios';

export interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
}

interface error {
    text?: string;
}

const LoginModal: FC<LoginModalProps> = ({ visible = false, onClose }) => {
    const dispatch = useStoreDispatch();
    const userState = useStoreSelector((s) => s.user);

    const [user, setUser] = useState<User>(userState);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<error>({});

    const onSubmit = async () => {
        await request
            .post('/auth/signin', {
                user: {
                    email,
                    password,
                },
            })
            .then((response: AxiosResponse) => {
                dispatch(updateUser(response.data));
                setUser(response.data);
                onClose();
            })
            .catch((error: AxiosError) => {
                setErrors({ text: 'Invalid email or password' });
            });
    };

    return (
        <Modal
            closeButton
            blur
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
                <Row justify="center">
                    <NextLink href="/signup">
                        <Link>
                            <Text size={14}>
                                Don&apos;t have an account? Sign Up!
                            </Text>
                        </Link>
                    </NextLink>
                </Row>
            </Modal.Body>
            <Modal.Footer justify="center">
                <Button auto flat color="error" onClick={onClose}>
                    Cancel
                </Button>
                <Button auto onClick={onSubmit}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(LoginModal);
