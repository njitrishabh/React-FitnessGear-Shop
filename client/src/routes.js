import { useRoutes } from "react-router-dom";
import Home from './pages/home/Home';
import NoMatch from './components/NoMatch';

export default function Router() {
    let element = useRoutes([
        { path: '/', element: <Home /> },
        { path: '*', element: <NoMatch /> }
    ]);
    return element;
}