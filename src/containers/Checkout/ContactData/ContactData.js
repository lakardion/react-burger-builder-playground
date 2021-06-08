import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
class ContactData extends Component {
  //TODO: my goodnes remove this, either do formik or some form validation library
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZipCode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "Cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
  };
  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) {
      isValid = isValid && value.trim() !== "";
    }
    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }
    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }
    return isValid;
  }
  orderHandler = (event) => {
    event.preventDefault();

    const order = {};
    for (let key in this.state.orderForm) {
      order[key] = this.state.orderForm[key].value;
    }
    order.ingredients = this.props.ingredients;
    order.price = this.props.price;
    console.log(order);
    this.setState({ loading: true });
    Axios.post("/orders", order)
      .then((r) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };
  inputChangeHandler = (event, inputIdentifier) => {
    //deep copy
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      console.log(
        inputIdentifier,
        " is validating as ",
        updatedOrderForm[inputIdentifier].valid
      );
      formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const orderFormArray = [];
    for (let key in this.state.orderForm) {
      orderFormArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {orderFormArray.map((el) => (
          <Input
            key={el.id}
            inputtype={el.config.elementType}
            elementConfig={el.config.elementConfig}
            value={el.config.value}
            changed={(event) => this.inputChangeHandler(event, el.id)}
            invalid={el.config.touched && !el.config.valid}
          />
        ))}
        <Button
          variant="success"
          onClick={this.orderHandler}
          disabled={!this.state.formIsValid}
        >
          ORDER
        </Button>
        <Button variant="danger"> Cancel </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
