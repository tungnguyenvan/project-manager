import React from "react";
import FormComponent from "../framework/components/form/FormComponent";
import FormControlComponent from "../framework/components/form/form_control/FormControlComponent";
import FormGroupComponent from "../framework/components/form/form_group/FormGroupComponent";
import TextFieldComponent from "../framework/components/form/text_field/TextFieldComponent";
import BasePage from "../framework/components/page/BasePage";

class TestPage extends React.Component {
    public render() {
        return (
            <BasePage>
                <FormComponent>
                    <h1>hello world</h1>
                    <FormGroupComponent>
                        <FormControlComponent>
                            <TextFieldComponent />
                        </FormControlComponent>
                        {/* <FormControlComponent>
                            <TextFieldComponent />
                        </FormControlComponent> */}
                    </FormGroupComponent>
                </FormComponent>
            </BasePage>
        );
    }
}

export default TestPage;