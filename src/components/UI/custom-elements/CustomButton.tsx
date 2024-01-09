import styles from './CustomButton.module.sass';
type CustomButtonProps = {
    className: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | undefined;
    children: React.ReactNode;
} 
const CustomButton = (props: CustomButtonProps) => {
    return (
        <button
            className={styles[props.className]}
            onClick={props.onClick}
            disabled={props.disabled}
            type={props.type}
        >
            {props.children}
        </button>
    )

};
export default CustomButton;