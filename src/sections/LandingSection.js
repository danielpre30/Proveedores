import React, { Component } from "react";
import "../styles/LandingSection.css";
import DescriptionContainer from "../components/Description";
import agreement from "../resources/agreement.png";
import exam from "../resources/exam.png";
import feedback from "../resources/feedback.png";
import bienvenidos from "../resources/BienvenidosUpCluster.png";
import { Auth0Context } from "../Auth/react-auth0-wrapper";

class LandingSection extends Component {
  static contextType = Auth0Context;

  render() {
    var description;
    if (this.context.isAuthenticated) {
      description = (
        <>
          {" "}
          <img
            className="homeSection__bienvenidos-img"
            alt="Imagen de fondo"
            src={bienvenidos}
          />
        </>
      );
    } else {
      description = (
        <>
          <DescriptionContainer
            srcImage={agreement}
            title="Crea Alianzas estratégicas"
            description="Conoce nuevas empresas contratantes y proveedoras para satisfacer tus necesidades y als de ellos."
          />
          <DescriptionContainer
            srcImage={feedback}
            title="Califica"
            description="Califica el servicio de proveedores, así podrás compartir tu experiencia con todos los que estén interesados en el mismo proveedor."
          />
          <DescriptionContainer
            srcImage={exam}
            title="Conoce tus servicios"
            description="A través de las calificaciones que te dejan puedes mejorar tus puntos débiles y reforzar los más fuertes."
          />
        </>
      );
    }
    return (
      <Auth0Context.Consumer>
        {({ isAuthenticated }) => {
          return (
            <div className={`landing-section-${isAuthenticated}`}>
              <div className="card-container">{description}</div>
            </div>
          );
        }}
      </Auth0Context.Consumer>
    );
  }
}

export default LandingSection;
