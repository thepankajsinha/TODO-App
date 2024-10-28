import TodoApp from "./Components/TodoApp.jsx"
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
     <TodoApp/>
     <Toaster position="top-right" />
    </>
  )
}

export default App
