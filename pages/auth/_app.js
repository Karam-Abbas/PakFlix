export default function App({ Component, pageProps }) {
  return (<div className="min-h-screen flex flex-col">
      <NavbarIn/>
      <main className="flex-grow">
        <Component {...pageProps}/>
      </main>
      <FooterIn/>
    </div>);
}