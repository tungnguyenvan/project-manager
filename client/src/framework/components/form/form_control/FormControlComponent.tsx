import React from "react";
import Style from './form__control__component.module.scss';

const FormControlComponent: React.FC = (props) => <div className={Style.form__control__component}>{props.children}</div>

export default FormControlComponent;