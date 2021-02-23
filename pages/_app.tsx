import Head from 'next/head'
import '../src/presentation/styles/globals.scss'
import { AuthProvider } from '../src/usecases/contexts/auth'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <Head>
                    <title>Dev.It - Seja um DEV mais produtivo</title>
                </Head>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    )
}

export default MyApp
