import React, { Component } from 'react';
import '../styles/LandingPage.css';
import LandingSection from '../sections/LandingSection';
import NavBar from '../components/NavBar';
import ProvidersSection from '../sections/ProvidersSection'
function LandingPage() {

    return (
        <>
            <NavBar logIn="true" />
            <LandingSection  logIn="true"/>
            <ProvidersSection/>
        </>

    );

}

export default LandingPage;