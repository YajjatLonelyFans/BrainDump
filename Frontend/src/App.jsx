import { Route , Routes } from "react-router"
import Homepage from "../Pages/Homepage"
import NoteDetail from "../Pages/NoteDetail"
import CreatePage from "../Pages/CreatePage"
import toast from "react-hot-toast"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
        <Route path="/note/:id" element={<NoteDetail/>}/>
      </Routes>
    </div>
  )
}

export default App
