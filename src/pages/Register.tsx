import http from "../utils/axios.config";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import MainLayout from "../layouts/MainLayout";
type RegisterValues = {
    email: string;
    password: string;
    passwordConfirm: string;
    username: string;
}
const Register = () => {
    const history = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterValues>();
    const onsubmit = handleSubmit((data) => {
        http.post("auth/register", data).then((response) => {
            console.log(response.status, "response")
            history('/login');
        }).catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data.message);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
        })
    })
    return (
            <MainLayout> 
                <div className="container mx-auto flex justify-center items-center my-auto">
                {
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4 w-[320px]" onSubmit={onsubmit}>
                        <div className="flex items-center justify-between">
                            <h1>Зареєструватися</h1>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Емейл
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("email", {
                                    required: "Введіть емейл",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Невірний формат емейлу"
                                    }
                                })}
                                placeholder="example@gmail.com" />
                            {errors?.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Ім'я
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("username", {
                                    required: "Введіть ім'я користувача",
                                })}
                                placeholder="username" />
                            {errors?.username && <p className="text-red-600">{errors.username.message}</p>}
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobilePhone">
                                Телефон
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("mobilePhone", {
                                    required: "Введіть номер телефону",
                                   
                                })}
                                placeholder="380-000-000-0000" />
                            {errors?.mobilePhone && <p className="text-red-600">{errors.mobilePhone.message}</p>}
                        </div> */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Пароль
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("password", {
                                    required: "Введіть пароль",
                                    minLength:{
                                        value: 8,
                                        message: "Пароль повинен бути не менше 8 символів"
                                    }
                                })} 
                                type="password" 
                                placeholder="**********" />
                            {errors?.password && <p className="text-red-600">{errors.password.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold" htmlFor="passwordConfirm">
                                Підтвердження паролю
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("passwordConfirm", {
                                    required: "Підтвердіть пароль",
                                    minLength:{
                                        value: 8,
                                        message: "Пароль повинен бути не менше 8 символів"
                                    },
                                    validate: (value) => {
                                        const { password } = getValues();
                                        return password === value || "Паролі не співпадають";
                                      }
                                })} 
                                type="password" 
                                placeholder="**********" />
                            {errors?.passwordConfirm && <p className="text-red-600">{errors.passwordConfirm.message}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                Зареєструватися
                            </button>
                        </div>
                        <div className="mt-3">
                            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to="/login">Увійти</Link>
                        </div>
                    </form>
                }
                </div>
            </MainLayout>
    )
}
export default Register;