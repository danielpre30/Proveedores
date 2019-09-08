import React, { Component } from 'react';
import '../styles/LandingSection.css';
import '../styles/PaymentSection.css';
import paymentMethods from '../resources/paymentMethods.png'

class PaymentSection extends Component {
    render() {
        return (
            <div className="landing-section">
                <div className="landing__payment-info">
                    <h1>¡Suscríbite Ahora!</h1>
                   <p className="payInfo__text"><b>Descripción:</b> Membresia Upcluster</p> 
                   <p className="payInfo__text"><b>Total de la compra:</b> USD$ 5.00 </p> 
                   <p className="payInfo__text">Ingresa tu correo electronico:</p>
                    <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                    <input className="payment__input" name="merchantId"    type="hidden"  value="508029" />
                    <input className="payment__input" name="accountId"     type="hidden"  value="512321" />
                    <input className="payment__input" name="description"   type="hidden"  value="Membresia Upcluster" /> 
                    <input className="payment__input" name="referenceCode" type="hidden"  value="TestPayUp"/>
                    <input className="payment__input" name="amount"        type="hidden"  value="5.00"  />
                    <input className="payment__input" name="tax"           type="hidden"  value="0" />
                    <input className="payment__input" name="taxReturnBase" type="hidden"  value="0"/>
                    <input className="payment__input" name="currency"      type="hidden"  value="USD"/>
                    <input className="payment__input" name="signature"     type="hidden"  value="f6324d230ed8ec22f5d5dc1add19ee3d" />
                    <input className="payment__input"name="test"          type="hidden"  value="1" />
                    <input className="payment__input" name="buyerEmail"  placeholder="Ingrese su correo" />
                    <input className="payment__input" name="responseUrl"    type="hidden"  value="http://localhost:3000/#/payment"/>
                    <input className="payment__input" name="confirmationUrl"    type="hidden"  value="http://www.test.com/confirmation"/><br/>
                    <input className="button-pagar" name="Submit"  type="submit"  value="Realizar Pago" />
                    </form>
                    <img className="payuMethods" src={paymentMethods} alt="Profile" />
                </div>

            </div>
        );
    }
}

export default PaymentSection;