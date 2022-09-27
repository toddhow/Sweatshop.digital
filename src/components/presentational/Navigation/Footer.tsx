import React, { FC, memo } from 'react';
import {
    Container,
    Text,
    Grid,
    Link,
    StyledDivider,
    Card,
} from '@nextui-org/react';
import { Github, Discord } from '@assets';

const Footer: FC = () => {
    return (
        <Container
            responsive
            css={{ position: 'fixed', bottom: 0, padding: 12 }}
        >
            <Grid.Container justify="center" gap={1}>
                <Grid>
                    <Card css={{ mw: '150px' }}>
                        <Card.Body>
                            <Grid.Container justify="space-evenly" gap={1}>
                                <Grid>
                                    <Link href="https://github.com/toddhow">
                                        <Github
                                            width={40}
                                            height={40}
                                            fill="currentColor"
                                        />
                                    </Link>
                                </Grid>
                                <Grid>
                                    <Link href="#">
                                        <Discord
                                            width={40}
                                            height={40}
                                            fill="currentColor"
                                        />
                                    </Link>
                                </Grid>
                            </Grid.Container>
                        </Card.Body>
                    </Card>
                </Grid>
                <StyledDivider />
                <Grid>
                    <Text>
                        © {new Date().getFullYear()} Sweatshop Digital All
                        Rights Reserved
                    </Text>
                </Grid>
            </Grid.Container>
        </Container>
    );
};

export default memo(Footer);
