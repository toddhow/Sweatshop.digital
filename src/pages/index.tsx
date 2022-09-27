import { useState } from 'react';
import GeneralPage from '@components/layout/General';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <GeneralPage loading={loading}></GeneralPage>
        </>
    );
};

export default Home;
