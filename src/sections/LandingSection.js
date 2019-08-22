import React, { Component } from 'react';
import Background from '../resources/fondoSinRegistro.jpg';
import '../styles/SinglePage.css';
import DescriptionContainer from '../containers/DescriptionContainer';
import agreement from '../resources/agreement.png'
import exam from '../resources/exam.png'
import feedback from '../resources/feedback.png'

class LandingSection extends Component {
    render() {
        return (
            <div className="landingSection__main">
                
                <div className="card-container">
                   <DescriptionContainer srcImage={agreement} title="Crea Alianzas estratégicas" description="Conoce nuevas empresas contratantes y proveedoras para satisfacer tus necesidades y als de ellos."/>
                   <DescriptionContainer srcImage={feedback} title="Califica" description="Califica el servicio de proveedores, así podrás compartir tu experiencia con todos los que estén interesados en el mismo proveedor."/>
                   <DescriptionContainer srcImage={exam} title="Conoce tus servicios" description="A través de las calificaciones que te dejan puedes mejorar tus puntos débiles y reforzar los más fuertes."/>
                </div>
                <div className="DivPayment">
                    <div>
                        <h1>¡Cómpralo ahora!</h1>
                        <h1 className="price">USD$5.oo</h1>/Mes
                    </div>                    
                    <button className="calcular__button" type="submit">Comprar</button>
                    <div >

                    </div>
                </div>

            </div>
        );
    }
}

export default LandingSection;