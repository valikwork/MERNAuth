import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {LOGIN_ROUTE,REGISTER_ROUTE, GAMES_PAGE_ROUTE} from '../constants/routes'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { removeCredentials } from '../slices/authSlice';

export default function Header() {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeCredentials());
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <nav className="relative flex w-full items-center justify-between bg-miraplayHeaderBackground py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="grow basis-[100%] items-center flex basis-auto" >
            <ul className="mr-auto flex flex-row w-full" >
              {userInfo ? (
                <>
                  <li className="mb-0 pr-2">
                    <Link to={'/'} >
                      <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      >Home
                      </span>
                    </Link>
                  </li>
                  <li className="mb-0 pr-2">
                    <Link to={GAMES_PAGE_ROUTE} >
                      <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      >Games
                      </span>
                    </Link>
                  </li>
                  <li className="mb-0 pr-2 ml-auto">
                    <button onClick={logoutHandler} >
                      <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90">
                        Sign Out
                      </span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-0 pr-2">
                    <Link to={LOGIN_ROUTE} >
                    <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      >Sign In
                      </span>
                    </Link>
                  </li>
                  <li className="mb-0 pr-2">
                  <Link to={REGISTER_ROUTE} >
                    <span className="text-[#afafaf] block transition duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:hover:text-white dark:focus:text-white lg:p-2 [&.active]:text-black/90"
                      >Sign Up
                      </span>
                    </Link>
                  </li>
                </>
              )}
              
              
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
