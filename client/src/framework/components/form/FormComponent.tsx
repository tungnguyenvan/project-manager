import React from 'react'
import Style from "./form__component.module.scss";

interface IFormComponentProps {

}

const FormComponent: React.FC<IFormComponentProps> = (props) => <form className={Style.form__component}>{props.children}</form>

export default FormComponent;