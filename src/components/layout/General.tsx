import { ReactNode, type FC } from 'react';
import { Container, Progress } from '@nextui-org/react';
import AppBar from '@components/Navigation/AppBar';
import Footer from '@components/Navigation/Footer';

interface GeneralPageProps {
    children?: ReactNode;
    loading?: boolean;
    includeNavBar?: boolean;
}

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
