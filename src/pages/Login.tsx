import { Link, useNavigate } from 'react-router-dom';
import { setToken, setUser } from "../store/slices/user.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useForm } from 'react-hook-form';
import MainLayout from "../layouts/MainLayout";
import axios from "axios";
type LoginValues = {
    email: string;
    password: string;
};

const Login = () => {
    const history = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginValues>();
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        axios.post('htpps://apistepinstyle.com/api/auth/login', data).then((response) => {
            console.log(response)
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user))
            history('/');
        })
        // http.post("auth/login", data).then((response) => {
        //     console.log(response)
        //     dispatch(setToken(response.data.token))
        //     dispatch(setUser(response.data.user))
        //     history('/');
        // }).catch((error) => {
        //     console.log(error)
        // }) 
    });
    return (
            <MainLayout>
                <div className="container mx-auto flex justify-center items-center my-auto">
                {
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 w-[320px]" onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Емейл</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register("email", {
                                    required: "Введіть емейл",
                                    pattern:{
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Невірний формат емейлу"
                                    }
                                })}
                                placeholder="example@gmail.com" />
                            {errors?.email && <p className="text-red-600">{errors.email.message}</p>}
                        </div>

                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Пароль</label>
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
                        <div className="flex items-center justify-between">
                           <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                               Увійти
                           </button>
                           <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                 Забули пароль?
                             </a>
                       </div>
                       <div className="flex items-center justify-between mt-3">
                            <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" to="/register">Зареєструватись</Link>
                        </div>
                    </form>
                }
                </div>
            </MainLayout>
    )
}
export default Login;


