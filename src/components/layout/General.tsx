import { ReactNode, type FC } from 'react';
import { Container, Progress } from '@nextui-org/react';
import AppBar from '@components/Navigation/AppBar';
import Footer from '@components/Navigation/Footer';
import { updateUser } from '@redux/reducers';
import { useStoreDispatch, useStoreSelector } from '@redux';
import { User } from '@types';

interface GeneralPageProps {
    children?: ReactNode;
    loading?: boolean;
    includeNavBar?: boolean;
}

/*
export function getServerSideProps() {
    const dispatch = useStoreDispatch();
    const user = useStoreSelector((s) => s.user);
}
*/

const GeneralPage: FC<GeneralPageProps> = ({
    children,
    loading = false,
    includeNavBar = true,
}) => {
    return (
        <Container>
            {includeNavBar && <AppBar />}
            {loading ? (
                <Progress
                    indeterminated
                    value={50}
                    color="secondary"
                    status="secondary"
                />
            ) : (
                <>{children}</>
            )}
            <Footer />
        </Container>
    );
};

export default GeneralPage;
