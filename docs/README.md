# Hacer un inicio de sesión con React

## JSON Web Token JWS

JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define una forma compacta y autónoma para transmitir información de forma segura entre las partes como un objeto JSON. Esta información se puede verificar y confiar porque está firmada digitalmente. Los JWT se pueden firmar usando un secreto (con el algoritmo HMAC) o un par de claves pública / privada usando RSA o ECDSA.

Aunque los JWT se pueden cifrar para proporcionar también secreto entre las partes, nos centraremos en los tokens firmados. Los tokens firmados pueden verificar la integridad de los reclamos que contiene, mientras que los tokens cifrados ocultan esos reclamos de otras partes. Cuando los tokens se firman utilizando pares de claves públicas / privadas, la firma también certifica que solo la parte que posee la clave privada es la que la firmó.

### ¿Cuándo deberías usar JSON Web Tokens?

Estos son algunos escenarios en los que los JSON web tokens son útiles:

- **Autorización**: este es el escenario más común para usar JWT. Una vez que el usuario haya iniciado sesión, cada solicitud posterior incluirá el JWT, lo que le permitirá acceder a rutas, servicios y recursos que están permitidos con ese token. El inicio de sesión único es una característica que utiliza ampliamente JWT hoy en día, debido a su pequeña sobrecarga y su capacidad de usarse fácilmente en diferentes dominios.

- **Intercambio de información**: los JSON web tokens son una buena forma de transmitir información de manera segura entre las partes. Debido a que los JWT pueden firmarse, por ejemplo, utilizando pares de claves públicas / privadas, puede estar seguro de que los remitentes son quienes dicen ser. Además, como la firma se calcula utilizando el header y el payload, también puede verificar que el contenido no haya sido alterado.

### ¿Cuál es la estructura JSON Web Token?

En su forma compacta, JSON Web Tokens consta de tres partes separadas por puntos ( .), que son:

- Header
- Payload
- Signature

Por lo tanto, un JWT generalmente se parece a lo siguiente.

`xxxxx.yyyyy.zzzzz`

Analicemos las diferentes partes.

#### Header

El header generalmente consta de dos partes: el tipo de token, que es JWT, y el algoritmo de firma que se utiliza, como **HMAC** **SHA256** o **RSA**.

Por ejemplo:

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Entonces, este JSON está codificado en **Base64Url** para formar la primera parte del JWT.

#### Payload

La segunda parte del token es el payload, que contiene las peticiones. Las peticiones son declaraciones sobre una entidad (típicamente, el usuario) y datos adicionales. Hay tres tipos de peticiones: peticiones *registradas*, *públicas* y *privadas* .

- **Peticiones registradas**: se trata de un conjunto de peticiones predefinidas que no son obligatorias pero se recomiendan para proporcionar un conjunto de peticiones útiles e interoperables. Algunos de ellos son: **iss** (emisor), **exp** (tiempo de vencimiento), **sub** (tema), **aud** (audiencia) y otros .

    Tenga en cuenta que los nombres de los reclamos tienen solo tres caracteres, ya que JWT debe ser compacto.

- **Peticiones públicas**: los que usan JWT pueden definirlos a voluntad. Pero para evitar colisiones, deben definirse en el Registro de tokens web IANA JSON o definirse como un URI que contenga un espacio de nombres resistente a colisiones.

- **Peticiones privadas**: son las peticiones personalizadas creadas para compartir información entre las partes que acuerdan usarlas y no son peticiones registradas ni públicas .

Un ejemplo de carga podría ser:

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

El payload se codifica luego en **Base64Url** para formar la segunda parte del JSON Web Token.

> Tenga en cuenta que para los tokens firmados, esta información, aunque protegida contra la manipulación, es legible por cualquier persona. No coloque información secreta en los elementos de carga o encabezado de un JWT a menos que esté encriptado.

#### Firma

Para crear la parte de firma, debe tomar el header codificado, el payload codificado, un secreto, el algoritmo especificado en el encabezado, y firmarlo.

Por ejemplo, si desea utilizar el algoritmo HMAC SHA256, la firma se creará de la siguiente manera:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
  ```

La firma se usa para verificar que el mensaje no se cambió en el camino y, en el caso de los tokens firmados con una clave privada, también puede verificar que el remitente del JWT es quien dice ser.

#### Poniendo todo junto

El resultado son tres cadenas de URL Base64 separadas por puntos que se pueden pasar fácilmente en entornos HTML y HTTP, a la vez que son más compactas en comparación con los estándares basados en XML como SAML.

A continuación se muestra un JWT que tiene el encabezado anterior y la carga útil codificada, y está firmado con un secreto. JWT codificado

![JWT Example](https://cdn.auth0.com/content/jwt/encoded-jwt3.png)

Si quieres jugar con JWT y poner en práctica estos conceptos, puedes usar jwt.io Debugger para decodificar, verificar y generar JWT.

### ¿Cómo funcionan los tokens web JSON?

En la autenticación, cuando el usuario inicia sesión con éxito utilizando sus credenciales, se devolverá un token web JSON. Dado que los tokens son credenciales, se debe tener mucho cuidado para evitar problemas de seguridad. En general, no debes mantener los tokens más tiempo del requerido.

Tampoco debe almacenar datos confidenciales de sesión en el almacenamiento del navegador debido a la falta de seguridad.

Siempre que el usuario desee acceder a una ruta o recurso protegido, el agente de usuario debe enviar el JWT, generalmente en el encabezado de Autorización utilizando el esquema de Portador (Bearer). El contenido del encabezado debe ser similar al siguiente:

```
Authorization: Bearer <token>
```

Esto puede ser, en ciertos casos, un mecanismo de autorización sin estado. Las rutas protegidas del servidor verifican si hay un JWT válido en el encabezado de Autorización y, si está presente, el usuario podrá acceder a los recursos protegidos. Si el JWT contiene los datos necesarios, la necesidad de consultar la base de datos para ciertas operaciones puede reducirse, aunque esto no siempre es el caso.

Si el token se envía en el encabezado de Autorización, *Cross-Origin Resource Sharing (CORS)* no será un problema, ya que no utiliza cookies.

El siguiente diagrama muestra cómo se obtiene un JWT y cómo se utiliza para acceder a API o recursos:

![JWT Process](https://cdn2.auth0.com/docs/media/articles/api-auth/client-credentials-grant.png)

1. La aplicación o el cliente solicita autorización al servidor de autorización. Esto se realiza a través de uno de los diferentes flujos de autorización. Por ejemplo, una aplicación web típica compatible con OpenID Connect pasará por ``/oauth/authorize`` endpoint usando el flujo del código de autorización.
2. Cuando se otorga la autorización, el servidor de autorización devuelve un token de acceso a la aplicación.
3. La aplicación usa el token de acceso para acceder a un recurso protegido (como una API).

Tenga en cuenta que con los tokens firmados, toda la información contenida en el token está expuesta a los usuarios u otras partes, a pesar de que no pueden cambiarlo. Esto significa que no debe poner información secreta dentro del token.

### ¿Por qué debemos usar JSON Web Tokens?

Hablemos de los beneficios de **JSON Web Tokens (JWT)** en comparación con **Simple Web Tokens (SWT)** y **Security Assertion Markup Language Tokens (SAML)**.

- Como JSON es menos detallado que XML, cuando está codificado, su tamaño también es más pequeño, lo que hace que JWT sea más compacto que SAML. Esto hace que JWT sea una buena opción para pasar en entornos HTML y HTTP.

- En cuanto a la seguridad, SWT solo puede ser firmado simétricamente por un secreto compartido utilizando el algoritmo HMAC. Sin embargo, los tokens JWT y SAML pueden usar un par de claves pública / privada en forma de un certificado X.509 para la firma. Firmar XML con firma digital XML sin introducir agujeros de seguridad oscuros es muy difícil en comparación con la simplicidad de firmar JSON.

- Los analizadores JSON son comunes en la mayoría de los lenguajes de programación porque se asignan directamente a objetos. Por el contrario, XML no tiene un mapeo natural de documento a objeto. Esto facilita trabajar con JWT que las aserciones SAML.

- En cuanto al uso, JWT se usa a escala de Internet. Esto resalta la facilidad del procesamiento del lado del cliente del token web JSON en múltiples plataformas, especialmente en dispositivos móviles.

## Auth0

### Login

- Crear una aplicación
- Crear API
- Instalar Auth0

```
npm install --save @auth0/auth0-spa-js
```
- Referenciarlo usando un import

```
import createAuth0Client from '@auth0/auth0-spa-js';
```
- **Instalar el contenedor Auth0 React**: Cree un nuevo archivo en el directorio src llamado react-auth0-wrapper.js y complételo con el siguiente contenido:

```javascript
// src/react-auth0-wrapper.js
import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();

      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p)
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
```

- Ejemplo de NavBar

```javascript
// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-wrapper";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <button
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
    </div>
  );
};

export default NavBar;
```
  Observe el uso de useAuth0, proporcionado por el contenedor que creó en la sección anterior, que proporciona las funciones necesarias para iniciar sesión, cerrar sesión y determinar si el usuario ha iniciado sesión a través de la propiedad isAuthenticated.

- **Integrar el SDK**:  
Para que el sistema de autenticación funcione correctamente, los componentes de la aplicación deben incluirse en el componente Auth0Provider que proporciona el contenedor SDK creado anteriormente en el tutorial. Esto significa que cualquier componente dentro de este contenedor podrá acceder al cliente Auth0 SDK.  
Abra el archivo src / index.js y reemplace su contenido con lo siguiente:

```javascript
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./react-auth0-wrapper";
import config from "./auth_config.json";

// A function that routes the user to the right place
// after login
const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    client_id={config.clientId}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
>
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
```

Observe que el componente `App` ahora está envuelto en el componente `Auth0Provider`, donde se especifican los detalles sobre el dominio Auth0 y la identificación del cliente. El prop `redirect_uri` también se especifica aquí. Hacer esto aquí significa que no necesita pasar este URI a cada llamada a `loginWithRedirect`, y mantiene la configuración en un solo lugar. 

Observe también la función `onRedirectCallback`, que intenta enrutar al usuario al lugar correcto una vez que ha iniciado sesión. Por ejemplo, si el usuario intenta acceder a una página que requiere que se autentiquen, se les pedirá que inicien sesión. Cuando regresen a la aplicación, serán reenviados a la página a la que intentaban acceder originalmente gracias a esta función.

A continuación, cree un nuevo archivo auth_config.json en la carpeta src y complételo con lo siguiente:

```json
{
  "domain": "domain",
  "clientId": "clientId"
}
```

Los valores `domain` y `clientId` deben reemplazarse por los de su propia aplicación Auth0.


### API

Ver:
- [React: Calling an API](https://auth0.com/docs/quickstart/spa/react/02-calling-an-api)

### Usar Base de Datos propia

Ver:
- [Database Connections](https://auth0.com/docs/connections/database#using-your-own-user-store)
- [Custom Database Action Script Templates](https://auth0.com/docs/connections/database/custom-db/templates)