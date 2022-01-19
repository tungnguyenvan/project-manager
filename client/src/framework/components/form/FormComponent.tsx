import React from 'react'

interface IFormComponentProps {

}

const FormComponent: React.FC<IFormComponentProps> = (props) => <form>{props.children}</form>

export default FormComponent;