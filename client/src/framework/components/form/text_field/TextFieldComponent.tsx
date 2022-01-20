import classNames from "classnames";
import React from "react"
import IInputForm from "../IInputForm"
import Style from "./text__field__component.module.scss";

interface ITextFieldComponentProps {
}

interface ITextFieldComponentState {
    isFocus: boolean,
}

class TextFieldComponent extends React.Component<ITextFieldComponentProps, ITextFieldComponentState> implements IInputForm {

    constructor(props: ITextFieldComponentProps) {
        super(props);

        this.state = {
            isFocus: false,
        }

        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onFocus() {
        this.setState({
            isFocus: true,
        })
    }

    onBlur() {
        this.setState({
            isFocus: false
        })
    }

    get value(): string {
        throw new Error("Method not implemented.")
    }

    set value(value: string) {
        throw new Error("Method not implemented.")
    }

    clear(): void {
        throw new Error("Method not implemented.")
    }

    render(): React.ReactNode {
        const textFieldClassNames = classNames(Style.text__field, {
            [Style.focus]: this.state.isFocus
        })

        return <div className={textFieldClassNames}>
            <input onFocus={this.onFocus} onBlur={this.onBlur} />
            <label className={Style.placeholder}>label</label>
        </div>
    }
}

export default TextFieldComponent