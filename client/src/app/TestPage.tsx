import React from "react";
import FormComponent from "../framework/components/form/FormComponent";
import BasePage from "../framework/components/page/BasePage";

class TestPage extends React.Component {
    public render() {
      return (
          <BasePage>
            <FormComponent>
                <h1>hello world</h1>
            </FormComponent> 
          </BasePage>
      );
    }
}

export default TestPage;