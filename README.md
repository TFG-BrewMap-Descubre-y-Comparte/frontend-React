# Proyecto Frontend: Rutas Turísticas con React

Este documento describe el propósito y la organización del frontend de la aplicación de rutas turísticas, desarrollado con React.

## Propósito del Frontend

El objetivo del frontend es proporcionar una interfaz intuitiva y atractiva para los usuarios que deseen interactuar con el sistema de rutas turísticas. Esto incluye:

- **Gestíon de Usuarios:**

  - Registro y login de usuarios para personalizar la experiencia.
  - Permitir la autenticación segura.

- **Exploración de Rutas:**

  - Visualización de rutas turísticas creadas.
  - Asociación de checkpoints a las rutas.

- **Audioguías:**

  - Integrar audioguías relacionadas con cada checkpoint para enriquecer la experiencia del usuario.

- **Comentarios:**
  - Permitir que los usuarios dejen comentarios en las rutas para compartir opiniones o información relevante.

## Tecnologías Utilizadas

- **React:** Biblioteca principal para la construcción de componentes y la gestión de estados.

## Integración con Microservicios

1. **Usuario:**

   - Autenticación y registro.
   - Gestiona tokens para proteger rutas privadas.

2. **Audioguías:**

   - Muestra las audioguías asociadas a cada checkpoint en una ruta.

3. **Route/Checkpoint:**

   - Listado y detalles de rutas.
   - Visualización de checkpoints asociados a una ruta.

4. **Comentarios:**
   - Enviar y recibir comentarios sobre las rutas.
