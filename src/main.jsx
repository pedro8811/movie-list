import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './pages/Home'
import Movie from './pages/Movie'
import Search from './pages/Search'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/movie/:id",
    element: <Movie />
  },
  {
    path: "/search",
    element: <Search />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>
)
