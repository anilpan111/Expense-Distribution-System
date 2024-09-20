import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ReactDom from 'react-dom/client'

import store from './store/configStore.js'


//react router dom imports
import { createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'

//all pages import
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SignupPage from './pages/SignupPage.jsx'

import { Provider } from 'react-redux'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<HomePage/>}/>
      <Route path='about' element={<AboutPage/>}/>
      <Route path='contact' element={<ContactPage/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='signup' element={<SignupPage/>}/>
      <Route path='profile' element={<ProfilePage/>}/>
    </Route>
  )
)


ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
