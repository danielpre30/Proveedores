import React, { Component } from 'react';
import '../styles/LandingSection.css';
import '../styles/PaymentSection.css';
import paymentMethods from '../resources/paymentMethods.png'

class PaymentSection extends Component {
    render() {
        return (
            <div className="landing-section">
                <div className="payment-info">
                    <h1>¡Información para el pago!</h1>
                   <p className="payInfo">Descripción: Membresia Upcluster</p> 
                   <p className="payInfo">Total de la compra: 5.00 USD</p> 
                   <p className="payInfo">Ingresa tu correo electronico:</p>
                    <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/">
                    <input name="merchantId"    type="hidden"  value="508029" />
                    <input name="accountId"     type="hidden"  value="512321" />
                    <input name="description"   type="hidden"  value="Membresia Upcluster" /> 
                    <input name="referenceCode" type="hidden"  value="TestPayUp"/>
                    <input name="amount"        type="hidden"  value="5.00"  />
                    <input name="tax"           type="hidden"  value="0" />
                    <input name="taxReturnBase" type="hidden"  value="0"/>
                    <input name="currency"      type="hidden"  value="USD"/>
                    <input name="signature"     type="hidden"  value="f6324d230ed8ec22f5d5dc1add19ee3d" />
                    <input name="test"          type="hidden"  value="1" />
                    <input name="buyerEmail"  placeholder="Ingrese su correo" />
                    <input name="responseUrl"    type="hidden"  value="http://localhost:3000/#/payment"/>
                    <input name="confirmationUrl"    type="hidden"  value="http://www.test.com/confirmation"/><br/>
                    <input className="button-pagar" name="Submit"  type="submit"  value="Realizar Pago" />
                    </form>
                    <img className="payuMethods" src={paymentMethods} alt="Profile" />
                </div>

            </div>
        );
    }
}

export default PaymentSection;