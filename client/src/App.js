import NavBar from './components/NavBar';
import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <>
            <h1>Hello world! I am using React</h1>
            <NavBar />
            <BrowserRouter>
                <Router />
            </BrowserRouter>

        </>
    );
};

export default App;