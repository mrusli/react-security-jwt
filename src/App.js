import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Users from "./components/Users";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Login />}></Route>
          <Route path="/users" element={ <Users />}></Route>          
      </Routes>
    </BrowserRouter> 
  );
}

export default App;
