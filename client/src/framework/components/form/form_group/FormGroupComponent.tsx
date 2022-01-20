import React from 'react'
import Style from "./form__group__component.module.scss";

interface IFormGroupComponentProps {

}

const FormGroupComponent: React.FC<IFormGroupComponentProps> = (props) => <div className={Style.form__group__component}>{props.children}</div>

export default FormGroupComponent;