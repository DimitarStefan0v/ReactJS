import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Search } from './components/Search';
import './App.css';

function App() {
    return (
        <>
            <Header />

            <main className="main">
                <Search />
            </main>

            <Footer />
        </>
    );
}

export default App;
