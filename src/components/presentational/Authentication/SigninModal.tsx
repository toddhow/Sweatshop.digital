import React, { FC, memo, useState } from 'react';
import {
    Modal,
    Button,
    Text,
    Input,
    Link,
    Grid,
    Spacer,
} from '@nextui-org/react';
import NextLink from 'next/link';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import type { User } from '@types';
import type { AxiosResponse } from 'axios';

interface SigninModalProps {
    visible: boolean;
    onClose: () => void;
    href?: string;
}

interface IFormInput {
    email: string;
    password: string;
}

const SigninModal: FC<SigninModalProps> = ({
    visible = false,
    onClose,
    href,
}) => {
    const router = useRouter();

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
            .then(async (response: AxiosResponse) => {
                dispatch(updateUser(response.data));
                setUser(response.data);
                onClose();
                href && (await router.push(href));
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
                <Grid.Container css={{ pl: '$6' }}>
                    <Grid justify="center" xs={12}>
                        <Text h4 css={{ lineHeight: '$xs' }}>
                            Welcome to Sweatshop Digital
                        </Text>
                    </Grid>
                    <Grid justify="center" xs={12}>
                        <Text>
                            <NextLink href="/auth/signup">
                                <Link>
                                    Don&apos;t have an account? Sign Up!
                                </Link>
                            </NextLink>
                        </Text>
                    </Grid>
                </Grid.Container>
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
                    auto
                    type="submit"
                    form="signin"
                    shadow
                >
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default memo(SigninModal);
