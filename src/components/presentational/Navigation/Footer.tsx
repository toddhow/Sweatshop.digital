import React, { FC, memo } from 'react';
import { Container, Text, Row } from '@nextui-org/react';

const Footer: FC = () => {
    return (
        <Container
            responsive
            css={{ position: 'fixed', bottom: 0, padding: 12 }}
        >
            <Row justify="center">
                <Text>© 2022 Sweatshop Digital. All rights reserved</Text>
            </Row>
        </Container>
    );
};

export default memo(Footer);
