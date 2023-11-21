import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom";
import App from './App';
import PrivateRoute from './components/PrivatRoute';
import { GAMES_PAGE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from './constants/routes';
import './index.css';
import GamesScreen from './screens/GamesScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import store from './store';

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path={LOGIN_ROUTE} element={<LoginScreen />} />
      <Route path={REGISTER_ROUTE} element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path={GAMES_PAGE_ROUTE} element={<GamesScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);

