import { ReactNode, type FC } from 'react';
import { Container, Progress } from '@nextui-org/react';
import AppBar from '@components/Navigation/AppBar';
import Footer from '@components/Navigation/Footer';

interface GeneralPageProps {
    loading?: boolean;
    children?: ReactNode;
}

const GeneralPage: FC<GeneralPageProps> = ({ children, loading = false }) => {
    return (
        <>
            <Container responsive>
                <AppBar />
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
        </>
    );
};

export default GeneralPage;
