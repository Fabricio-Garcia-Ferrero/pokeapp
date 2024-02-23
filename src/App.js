import './App.css';
import Datasheet from './components/Datasheet';
import Home from './components/Home';
import Pokedex from './components/Pokedex';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Favoritos from './components/Favoritos';

const router = createBrowserRouter([
  {
    path:'/',
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/pokedex',
        element: <Pokedex/>
      },
      {
        path: '/pokemon/:id',
        element: <Datasheet/>
      },
      {
        path: '/favoritos',
        element: <Favoritos/>
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;