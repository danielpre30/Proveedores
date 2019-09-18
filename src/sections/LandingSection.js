import React, { Component } from "react";
import "../styles/LandingSection.css";
import DescriptionContainer from "../containers/DescriptionContainer";
import agreement from "../resources/agreement.png";
import exam from "../resources/exam.png";
import feedback from "../resources/feedback.png";
import bienvenidos from "../resources/BienvenidosUpCluster.png";

class LandingSection extends Component {
  render() {
    var description;
    if (this.props.logIn) {
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
      <div className={`landing-section-${this.props.logIn}`}>
        <div className="card-container">{description}</div>
      </div>
    );
  }
}

export default LandingSection;
