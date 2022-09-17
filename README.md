

# **Event** Master

## Description

Buscador de eventos a nivel global y guardar los eventos favoritos en una lista personal

## User Stories

- **error 400 ** - Como usuario, quiero ver una bonita página 404 cuando voy a una página que no existe para que sepa que fue mi culpa
- **error 500** - Como usuario, quiero ver una buena página de error cuando el súper equipo la arruina para que sepa que no es mi culpa
- **página de inicio** - Como usuario quiero poder acceder a la página de inicio tener una barra de búsqueda de eventos, un slider horizontal de eventos y una previsualización de 5 eventos
- **registrarse** - Como usuario, quiero registrarme en la página web para poder agregar eventos favoritos a mi lista.
- **iniciar sesión** - Como usuario quiero poder iniciar sesión en la página web para poder volver a mi cuenta.
- **cerrar sesión** - Como usuario quiero poder cerrar sesión desde la página web para asegurarme de que nadie acceda a mi cuenta
- **lista de favoritos** - Como usuario, quiero ver la lista de mis favoritos y eliminarlos.
- **página de eventos con buscador** - Mostramos una página de 12 eventos random con un buscador de eventos en concreto donde nos muestra información y un link para comprar entradas.
- **página de artistas con buscador** - Mostramos una página de 12 artistas random con un buscador de artistas en concreto donde nos muestra los enlaces a las redes sociales y un enlace para comprar la entrada.
- **resultados** - Una página de resultados para cada búsqueda.

## MVP

!![wireframe](/public/images/wireframe.png)

## Server Routes (Back-end)

| **Method** | **Route**                   | **Description**                                              | Request - Body      |
| ---------- | --------------------------- | ------------------------------------------------------------ | ------------------- |
| `GET`      | `/`                         | Índice                                                       |                     |
| `GET`      | `/auth/login`               | Iniciar sesión                                               |                     |
| `POST`     | `/auth/login`               | Envia información al servidor para verificar y entrar a la página de inicio | { email, password } |
| `GET`      | `/auth/signup`              | Regístro                                                     |                     |
| `POST`     | `/auth/signup`              | Envia información al servidor para registrar datos, verificarlos y renderizarnos a la página de inicio | { email, password } |
| `GET`      | `/event/event`              | Trae información sobre eventos y tiene un buscador           |                     |
| `POST`     | `/event/event`              | Busca la información del buscador y nos renderiza a resultados |                     |
| `GET`      | `/favoritos`                | Ruta privada que renderiza a favoritos                       |                     |
| `GET`      | `/event/attractions`        | Trae información sobre artistas y tiene un buscador          |                     |
| `POST`     | `/event/attractions`        | Busca la información del buscador y nos renderiza a resultados |                     |
| `GET`      | `/event/search-event`       | Página de resultados de la búsqueda de eventos               |                     |
| `GET`      | `/event/search-attractions` | Página de resultados de la búsqueda de artistas              |                     |
| `GET`      |                             | Cerrar sesión                                                |                     |

## API

[API Link](https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/)

## Models

User

```
{
  favoritos:[{type: Schema.Types.ObjectId, ref: 'Favorito'}],
  name: String,
  email: String,
  password: String,
}
```

Favorito

```
{
    name: String,
    url: String,
    images: String,
    localDate: String,
}
```

## Links

### Trello

[Link to your trello board](https://trello.com/b/zYVzZRBD/eventmaster) 

### Git

[Repository Link](https://github.com/Jorditm/EventMaster)

### Slides

[Slides Link](https://docs.google.com/presentation/d/11Ub6-EmOCntwMMepgcJw71aIf-Iduj9wgLGRWNK6QRo/edit?usp=sharing )

## Heroku

[Web EventMaster](https://eventmasterr.herokuapp.com/)

