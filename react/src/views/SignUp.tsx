// import {BeakerIcon, UserIcon} from "@heroicons/react/24/solid";

import {Link} from "react-router-dom";
import {useState} from "react";
import axiosClient from "../axios.js";
import {useStateContext} from "../contexts/ContextProvider.tsx";

export default function SignUp() {
    const {setCurrentUser, setUserToken} =  useStateContext();
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setpasswordConfirmation] = useState('');
    const [error, setError] = useState({__html: ''});

    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({__html: ''})
        axiosClient.post('/signup', {
            name: fullName,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,

        })
            .then(({data}) => {
                setCurrentUser(data.user)
                setUserToken(data.token)
            })
            .catch((error) => {
                if (error.response) {
                    const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
                    setError({__html: finalErrors.join('<br>')})
                }
            })
    }


    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign Up For Free
                <div className="text-sm">or</div>
                <div className="text-sm">
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Login with your
                        account</Link>
                </div>
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                {/*errors*/}
                {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}></div>)}


                <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Full name
                        </label>
                        <div className="mt-2">
                            <input
                                id="full-name"
                                name="name"
                                type="text"
                                value={fullName}
                                onChange={(ev)=> setFullname(ev.target.value)}
                                required
                                placeholder="Full name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            E-mail
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(ev)=> setEmail(ev.target.value)}
                                required
                                placeholder="E-mail"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={(ev)=> setPassword(ev.target.value)}
                                type="password"
                                required
                                placeholder="Password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password-confirmation"
                                   className="block text-sm font-medium leading-6 text-gray-900">
                                Password Confirmation
                            </label>

                        </div>
                        <div className="mt-2">
                            <input
                                id="password-confirmation"
                                name="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(ev)=> setpasswordConfirmation(ev.target.value)}
                                required
                                placeholder="Password confirmation"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Signup
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

