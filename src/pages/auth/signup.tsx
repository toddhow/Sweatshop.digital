import { useState } from 'react';
import GeneralPage from '@components/layout/General';
import type { NextPage } from 'next';

const Signup: NextPage = () => {
    const [loading, setLoading] = useState(false);

    return <GeneralPage loading={loading} includeNavBar={false}></GeneralPage>;
};

export default Signup;
