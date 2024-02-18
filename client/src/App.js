import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
const Home = lazy(() => import('./pages/home/Home'));
const NoMatch = lazy(() => import('./components/NoMatch'));

const App = () => {
    return (
        <>
            <NavBar />
            <Suspense fallback={<div className="container">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </Suspense>
        </>
    );
};

export default App;