import LoginHeader from "./headers/LoginHeader";

const LoginLayout = (props: any) => {
    return (
        <div>
            <LoginHeader />
            <div className="container mx-auto flex justify-center items-center my-auto">
                {props.children}
            </div>
        </div >
    );
}
export default LoginLayout;