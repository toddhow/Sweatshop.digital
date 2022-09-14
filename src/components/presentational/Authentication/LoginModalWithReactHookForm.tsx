import React, { FC, memo, useState, useEffect } from 'react';
import { Modal, Button, Text, Input, Link, Row } from '@nextui-org/react';
import NextLink from 'next/link';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { useForm, Controller } from 'react-hook-form';
import type { User } from '@types';
import type { AxiosResponse } from 'axios';

export interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
}

interface IFormInput {
    email: string;
    password: string;
}

const LoginModal: FC<LoginModalProps> = ({ visible = false, onClose }) => {
    const dispatch = useStoreDispatch();
    const userState = useStoreSelector((s) => s.user);

    const [user, setUser] = useState<User>(userState);

    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm<IFormInput>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { email, password } = watch();

    useEffect(() => {
        register('email');
        register('password');
    }, [register]);

    const handleChange = (e: { target: { value: any } }, name: any) => {
        setValue(name, e.target.value);
    };

    const onSubmit = async (data: IFormInput) => {
        await request
            .post('/auth/signin', {
                user: {
                    email: data.email,
                    password: data.password,
                },
            })
            .then((response: AxiosResponse) => {
                dispatch(updateUser(response.data));
                setUser(response.data);
                onClose();
                //  return true;
            })
            .catch(() => {
                setError('password', {
                    type: 'custom',
                    message: 'Invalid email and or password',
                });
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Input
                                id="emailInput"
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="lg"
                                placeholder="Email"
                                contentLeft={<Mail fill="currentColor" />}
                                onChange={(e) => handleChange(e, 'email')}
                                value={email}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <Input
                                name="password"
                                type="password"
                                id="passwordInput"
                                clearable
                                bordered
                                fullWidth
                                helperText={errors.password?.message}
                                color="primary"
                                size="lg"
                                placeholder="Password"
                                contentLeft={<Key fill="currentColor" />}
                                onChange={(e) => handleChange(e, 'password')}
                                value={password}
                            />
                        )}
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
                    <Button type="submit" auto>
                        Sign in
                    </Button>
                </Modal.Footer>
            </Modal>
        </form>
    );
};

export default memo(LoginModal);
