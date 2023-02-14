import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./pages/Home/Home"
import Old from "./pages/Old/Old"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/old" element={<Old />} />
      </Routes>
    </div>
  )
}
export default App
