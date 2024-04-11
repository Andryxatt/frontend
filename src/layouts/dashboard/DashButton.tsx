import { FC, ButtonHTMLAttributes } from 'react';

type PropsDashButton =  ButtonHTMLAttributes<HTMLButtonElement>


const DashButton: FC<PropsDashButton> = ({ children, ...props }) => {
    return <button className='' {...props}>{children}</button>;
}

export default DashButton;