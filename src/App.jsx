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


// import { ArrowRight } from 'react-bootstrap-icons';
// <ArrowRight color="royalblue" size={96} />

/* <Button type="empty">Hello</Button>
<Button type="fill">H</Button>
<Loader style={{margin: "80px auto"}}/> */
