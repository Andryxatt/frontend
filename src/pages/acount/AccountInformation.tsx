import Layout from "../../layouts/MainLayout";
import { useAppSelector } from "../../store/hooks";

const AccountInformation = () => {
    const user = useAppSelector((state) => state.userSlice.user);
    console.log(user);
    return (
        <Layout>
            <h1>AccountInformation</h1>
            <div>
                <p>Ім'я: {user?.username}</p>
                <p>Електронна пошта: {user?.email}</p>
                <p>Права користувача: {user?.roles.map((role)=>{
                    return role
                })}</p>
            </div>
        </Layout>
    );
}
export default AccountInformation;