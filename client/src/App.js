import NavBar from './components/NavBar';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <>
            <NavBar />
            <BrowserRouter>
                <Router />
            </BrowserRouter>

        </>
    );
};

export default App;