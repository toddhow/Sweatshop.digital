import React, { FC, memo, useState } from 'react';
import {
    Modal,
    Button,
    Text,
    Input,
    Link,
    Row,
    Spacer,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { useForm, Controller } from 'react-hook-form';
import type { User } from '@types';
import type { AxiosResponse } from 'axios';

export interface SigninModalProps {
    visible: boolean;
    onClose: () => void;
}

interface IFormInput {
    email: string;
    password: string;
}

const SigninModal: FC<SigninModalProps> = ({ visible = false, onClose }) => {
    const dispatch = useStoreDispatch();
    const userState = useStoreSelector((s) => s.user);

    const [user, setUser] = useState<User>(userState);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IFormInput>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
        },
    });

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
                <form id="signin" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={() => (
                            <Input
                                {...register('email')}
                                id="emailInput"
                                aria-label="Email Input"
                                clearable
                                bordered
                                fullWidth
                                size="lg"
                                placeholder="Email"
                                color={
                                    errors.password?.message
                                        ? 'error'
                                        : 'default'
                                }
                                contentLeft={<Mail fill="currentColor" />}
                            />
                        )}
                    />
                    <Spacer y={0.5} />
                    <Controller
                        name="password"
                        control={control}
                        render={() => (
                            <Input
                                {...register('password')}
                                id="passwordInput"
                                aria-label="Password Input"
                                clearable
                                bordered
                                fullWidth
                                label={errors.password?.message}
                                size="lg"
                                placeholder="Password"
                                color={
                                    errors.password?.message
                                        ? 'error'
                                        : 'default'
                                }
                                contentLeft={<Key fill="currentColor" />}
                            />
                        )}
                    />
                </form>
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
                <Button
                    aria-label="Cancel sign in button"
                    auto
                    flat
                    color="error"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    aria-label="Sign in button"
                    type="submit"
                    form="signin"
                    auto
                >
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(SigninModal);
