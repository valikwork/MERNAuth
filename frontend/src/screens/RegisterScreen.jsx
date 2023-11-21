import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { GAMES_PAGE_ROUTE, LOGIN_ROUTE } from '../constants/routes'
import PrimaryButton from '../components/ui/PrimaryButton';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-toastify'

const schema = yup.object().shape({
  name: yup.string().max(255),
  email: yup.string().email().required("Email is a required field"),
  password: yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const LoginScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [signUp, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (userInfo) {
      navigate(GAMES_PAGE_ROUTE);
    }
  }, [navigate, userInfo]);

  const onSubmit = async ({name, email, password}) => {
    try {
      const res = await signUp({ name ,email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(GAMES_PAGE_ROUTE);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <section className="h-screen bg-miraplayMainBg">
      <div className="h-full">
        <div className="w-full flex h-full flex-wrap items-center justify-center flex-col">
          <h1 className='mb-8 mt-0 text-5xl font-medium leading-tight text-miraplayMainText'>Register</h1>
          <div className="mb-12 md:mb-0 w-5/12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-6">
                <input
                  className="placeholder-miraplayMainBg peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200"
                  placeholder="Name"
                  {...register("name")}
                  />
                  {errors.name && <p className='text-miraplayError mt-2'>{errors.name.message}</p>}
              </div>
              <div className="relative mb-6">
                <input
                  className="placeholder-miraplayMainBg peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200"
                  placeholder="Email address"
                  {...register("email")}
                  />
                  {errors.email && <p className='text-miraplayError mt-2'>{errors.email.message}</p>}
              </div>
              <div className="relative mb-6">
                <input
                  className="placeholder-miraplayMainBg peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200"
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                  />
                  {errors.password && <p className='text-miraplayError mt-2'>{errors.password.message}</p>}
              </div>

              <div className="text-center lg:text-left">
                <PrimaryButton type="submit" text={isLoading ? "Signing Up..." : "Register"} className="w-full" />

                <p className="mb-0 mt-4 pt-1 text-center text-sm font-semibold text-miraplayMainText">
                  <span>Already have an account?</span>
                  <br/>
                  <Link
                    to={LOGIN_ROUTE}
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
  </section>
  )
}

export default LoginScreen