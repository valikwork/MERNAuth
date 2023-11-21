import { Link, useNavigate } from 'react-router-dom'
import {GAMES_PAGE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from '../constants/routes'
import PrimaryButton from '../components/ui/PrimaryButton'
import { useDispatch, useSelector } from 'react-redux';
import SecondaryButton from '../components/ui/SecondaryButton';

export default function HomeScreen() {

  const navigator = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section className="h-full bg-miraplayMainBg flex justify-center items-center">
      <div className=" py-24 px-6 text-center dark:bg-neutral-900">
        <h1 className="text-miraplayMainText mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
          Miraplay <br /><span className="text-miraplayGreen">Test</span>
        </h1>
        {userInfo ? (
          <PrimaryButton text="Browes through games" onClick={() => navigator(GAMES_PAGE_ROUTE)} />
        ) : (
          <>
            <SecondaryButton text="Login" onClick={() => navigator(LOGIN_ROUTE)} className="mr-8" />
            <PrimaryButton text="Register" onClick={() => navigator(REGISTER_ROUTE)} />
          </>
        )}
      </div>
    </section>
  )
}
