import React, { FC, memo, useState } from 'react';
import { Card, Button, Text, Input, Grid, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { Mail, Key, Person } from '@assets';
import { request } from '@utils/util';
import { useForm, Controller } from 'react-hook-form';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useRouter } from 'next/router';
import type { User } from '@types';
import type { AxiosResponse } from 'axios';

const schema = object({
    username: string().required(),
    email: string().email().required(),
    password: string().required(),
});

interface IFormInput {
    username: string;
    email: string;
    password: string;
}

const SignupCard: FC = () => {
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
            username: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: IFormInput) => {
        await request
            .post('/auth/signup', {
                user: {
                    name: data.username,
                    email: data.email,
                    password: data.password,
                },
            })
            .then(async () => {
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
                        await router.push('/');
                    });
            })
            .catch(() => {
                setError('email', {
                    type: 'custom',
                });
            });
    };

    const handleErrors = () => {
        if (errors.email?.type === 'custom') {
            return 'A user with that email already exists';
        }
        return 'The email you provided is invalid';
    };

    return (
        <Card aria-labelledby="signin-card">
            <Card.Header>
                <Grid.Container css={{ pl: '$6' }}>
                    <Grid justify="center" xs={12}>
                        <Text h4 css={{ lineHeight: '$xs' }}>
                            Welcome to Sweatshop Digital
                        </Text>
                    </Grid>
                    <Grid justify="center" xs={12}>
                        <Text>
                            <NextLink href="/auth/signin">
                                <Link>Already have an account? Sign in!</Link>
                            </NextLink>
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body>
                <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                    <Grid.Container gap={1} direction="column">
                        <Grid>
                            <Controller
                                name="username"
                                control={control}
                                render={() => (
                                    <Input
                                        {...register('username')}
                                        clearable
                                        bordered
                                        fullWidth
                                        color="primary"
                                        size="lg"
                                        placeholder="Username"
                                        contentLeft={
                                            <Person fill="currentColor" />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid>
                            <Controller
                                name="email"
                                control={control}
                                render={() => (
                                    <Input
                                        {...register('email')}
                                        clearable
                                        bordered
                                        fullWidth
                                        status={
                                            errors.email ? 'error' : 'default'
                                        }
                                        color="primary"
                                        size="lg"
                                        placeholder="Email"
                                        contentLeft={
                                            <Mail fill="currentColor" />
                                        }
                                    />
                                )}
                            />
                            {errors.email && (
                                <Text
                                    small
                                    css={{
                                        margin: '$1 0 0 $5',
                                        transition: 'opacity 0.25s ease',
                                    }}
                                >
                                    {handleErrors()}
                                </Text>
                            )}
                        </Grid>
                        <Grid>
                            <Controller
                                name="password"
                                control={control}
                                render={() => (
                                    <Input
                                        {...register('password')}
                                        clearable
                                        bordered
                                        fullWidth
                                        color="primary"
                                        size="lg"
                                        placeholder="Password"
                                        contentLeft={
                                            <Key fill="currentColor" />
                                        }
                                    />
                                )}
                            />
                        </Grid>
                    </Grid.Container>
                </form>
            </Card.Body>
            <Card.Footer>
                <Button auto form="signup" type="submit" color="success" shadow>
                    Sign up
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default memo(SignupCard);
