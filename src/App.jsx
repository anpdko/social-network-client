import './App.scss';
import './assets/scss/Content.scss'
import Navbar from './components/Navbar/Navbar';
import useRoutes from './hooks/useRoutes'
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state)=> state.auth.isLoggedIn)
  const routes = useRoutes(isLoggedIn)
  return (
    <div className = "container">
        <Navbar/>
        {routes}
    </div>
  );
}

export default App;
