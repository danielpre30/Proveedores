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

 