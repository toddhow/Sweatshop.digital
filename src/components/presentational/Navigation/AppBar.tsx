import React, { FC, Key, memo, useState } from 'react';
import { Navbar, Text, Button, Avatar, Dropdown } from '@nextui-org/react';
import { request } from '@utils/util';
import LoginModal from '@components/Authentication/LoginModalWithReactHookForm';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import type { AxiosResponse } from 'axios';

const AppBar: FC = () => {
    const dispatch = useStoreDispatch();
    const user = useStoreSelector((state) => state.user);

    const [visible, setVisible] = useState<boolean>(false);

    const openHandler = () => {
        setVisible(true);
    };

    const closeHandler = () => {
        setVisible(false);
    };

    const dropdownHandler = async (actionKey: Key) => {
        if (actionKey === 'signout') {
            await onSubmit();
        }
    };

    const onSubmit = async () => {
        await request.post('/auth/signout').then((response: AxiosResponse) => {
            dispatch(updateUser(null));
        });
    };

    return (
        <Navbar aria-label="Navigation Bar" isBordered variant="floating">
            <Navbar.Brand>
                <Text h2 b color="inherit" hideIn="xs">
                    Sweatshop Digital
                </Text>
            </Navbar.Brand>
            <Navbar.Content>
                <Text>About Us</Text>
            </Navbar.Content>
            <Navbar.Content>
                <LoginModal visible={visible} onClose={closeHandler} />
                {user ? (
                    <Dropdown placement="bottom-right">
                        <Navbar.Item>
                            <Dropdown.Trigger>
                                <Avatar
                                    aria-label="User Avatar"
                                    src={
                                        user.avatar ||
                                        `https://avatars.dicebear.com/api/identicon/${user.name}.svg`
                                    }
                                />
                            </Dropdown.Trigger>
                        </Navbar.Item>
                        <Dropdown.Menu
                            aria-label="User menu actions"
                            color="secondary"
                            onAction={dropdownHandler}
                        >
                            <Dropdown.Item key="profile">
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    Signed in as
                                </Text>
                                <Text b color="inherit" css={{ d: 'flex' }}>
                                    {user.name}
                                </Text>
                            </Dropdown.Item>
                            <Dropdown.Item
                                key="signout"
                                withDivider
                                color="error"
                            >
                                Sign Out
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : (
                    <Button
                        aria-label="Login Button"
                        shadow
                        color="secondary"
                        onPress={openHandler}
                    >
                        Login
                    </Button>
                )}
            </Navbar.Content>
        </Navbar>
    );
};

export default memo(AppBar);
