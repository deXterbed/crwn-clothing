import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSelector } from 'react-redux'

import { PaymentFormContainer, FormContainer, PaymentButton } from "./styles";
import { BUTTON_TYPE_CLASSES } from "../button";
import { selectCartTotal } from '../../store/selectors/cart'
import { selectCurrentUser } from "../../store/selectors/user";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartTotal = useSelector(selectCartTotal)
  const currentUser = useSelector(selectCurrentUser)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch(".netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const { paymentIntent: { client_secret } } = response;

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
          address: {
            line1: "123 Fake Street",
            line2: "Apt 1",
            city: "Somewhere",
            postal_code: "12345",
            country: "US",
            state: "CA"
          },
        }
      }
    });

    setIsProcessingPayment(false);

    if (result.error) {
      alert(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        alert("Payment succeeded!");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={handleSubmit}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton
          buttonType={BUTTON_TYPE_CLASSES.inverted}
          isLoading={isProcessingPayment}
        >
          Pay
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
}

export default PaymentForm;