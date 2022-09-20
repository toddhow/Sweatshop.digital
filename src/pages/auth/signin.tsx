import { useState } from 'react';
import GeneralPage from '@components/layout/General';
import SigninCard from '@components/Authentication/SigninCard';
import { Container } from '@nextui-org/react';
import type { NextPage } from 'next';

const Signin: NextPage = () => {
    const [loading, setLoading] = useState(false);

    return (
        <GeneralPage loading={loading} includeNavBar={false}>
            <Container xs css={{ mt: '13%' }}>
                <SigninCard />
            </Container>
        </GeneralPage>
    );
};

export default Signin;
