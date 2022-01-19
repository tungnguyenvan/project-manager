import React from "react";
import Style from "./base__page.module.scss";

interface IBaseFormProps {

}

const BasePage: React.FC<IBaseFormProps> = (props) => <div className={Style.base__page}>{props.children}</div>;

export default BasePage;