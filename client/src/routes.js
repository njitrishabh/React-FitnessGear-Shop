import { useRoutes } from "react-router-dom";
import Home from './pages/home/Home';
import NoMatch from './components/NoMatch';
import ProductDetail from './pages/productDetail/ProductDetail';
import InsertProduct from './pages/insertProduct/InsertProduct';

export default function Router() {
    let element = useRoutes([
        { path: '/', element: <Home /> },
        { path: '*', element: <NoMatch /> },
        { path: '/product/*', element: <ProductDetail /> },
        { path: '/insert', element: <InsertProduct /> }
    ]);
    return element;
}