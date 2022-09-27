import React, { FC, memo } from 'react';
import { Card, Button, Text, Input, Grid, Link } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Mail, Key } from '@assets';
import { request } from '@utils/util';
import { useForm, Controller } from 'react-hook-form';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { User } from '@types';
import { AxiosResponse } from 'axios';

interface IFormInput {
    email: string;
    password: string;
}

const SigninCard: FC = () => {
    const router = useRouter();

    const dispatch = useStoreDispatch();
    const user = useStoreSelector((s) => s.user);

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
                await router.push('/');
            })
            .catch(() => {
                setError('password', {
                    type: 'custom',
                    message: 'Invalid email and or password',
                });
            });
    };

    return (
        <Card aria-labelledby="signup-card">
            <Card.Header>
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
            </Card.Header>
            <Card.Body>
                <form id="signup" onSubmit={handleSubmit(onSubmit)}>
                    <Grid.Container gap={1} direction="column">
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
                                        color="primary"
                                        size="lg"
                                        placeholder="Email"
                                        contentLeft={
                                            <Mail fill="currentColor" />
                                        }
                                    />
                                )}
                            />
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
                            {errors.password && (
                                <Text
                                    small
                                    css={{
                                        margin: '$1 0 0 $5',
                                        transition: 'opacity 0.25s ease',
                                    }}
                                >
                                    {errors.password?.message}
                                </Text>
                            )}
                        </Grid>
                    </Grid.Container>
                </form>
            </Card.Body>
            <Card.Footer>
                <Button auto form="signup" type="submit" shadow>
                    Sign in
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default memo(SigninCard);
