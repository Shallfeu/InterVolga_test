import { ChakraProvider, Container, Flex, extendTheme } from '@chakra-ui/react';
import AutoForm from './component/AutoForm';

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: 'gray',
            },
        }),
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <Container maxW="container.lg">
                <Flex m="50px" align="center" justify="center">
                    <AutoForm />
                </Flex>
            </Container>
        </ChakraProvider>
    );
}

export default App;
