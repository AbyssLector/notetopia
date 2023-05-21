import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'
export const metadata = {
    title: "Notetopia",
    description: "Discover & Share Your Notes"
}
const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <head>
                <link rel="icon" href="/assets/images/logo.png" />
            </head>
            <body>
                <Provider >
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout