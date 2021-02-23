import Head from 'next/head'
import '../src/presentation/styles/globals.scss'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Dev It - Seja um DEV mais produtivo</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
