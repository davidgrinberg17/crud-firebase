import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Show } from './Components/Show.jsx';
import { Create } from './Components/Create';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Show/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/edit/:id" element="Edit"/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;