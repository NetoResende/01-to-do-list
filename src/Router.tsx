import {Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { ErroPages } from './pages/ErroPages'
import { DefaultLayout } from './layout/DefaultLayout'


export function Router(){
  return(
    <Routes>
      <Route path='/' element={<DefaultLayout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/History' element={<History/>}/>
          <Route path='*' element={<ErroPages/>}/>
      </Route>
    </Routes>
  )
}