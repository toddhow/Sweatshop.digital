import { useState } from 'react';
import GeneralPage from '@components/layout/General';
import SignupCard from '@components/Authentication/SignupCard';
import { Container } from '@nextui-org/react';
import type { NextPage } from 'next';

const Signup: NextPage = () => {
    const [loading, setLoading] = useState(false);

    return (
        <GeneralPage loading={loading} includeNavBar={false}>
            <Container xs css={{ mt: '13%' }}>
                <SignupCard />
            </Container>
        </GeneralPage>
    );
};

export default Signup;
