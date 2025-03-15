Actua como experto en frontend de react @frontend

Utiliza la misma arquitectura y patrones que se están utilizando actualmente en @components @services
Optimiza el rendimiento siempre que puedas.

Sobre mis componentes actuales: @components , necesito crear una nueva pagina, positions.
Diseño: Imagen

Requisitos:
Se debe mostrar el título de la posición en la parte superior, para dar contexto
Añadir una flecha a la izquierda del título que permita volver al listado de posiciones
Deben mostrarse tantas columnas como fases haya en el proceso
La tarjeta de cada candidato/a debe situarse en la fase correspondiente, y debe mostrar su nombre completo y su puntuación media
Si es posible, debe mostrarse adecuadamente en móvil (las fases en vertical ocupando todo el ancho)

Observaciones:
Asume que la página de posiciones la encuentras
Asume que existe la estructura global de la página, la cual incluye los elementos comunes como menú superior y footer. Lo que estás creando es el contenido interno de la página.

Para desarrollar esta nueva pagina tenemos que hacer uso del proyecto @backend, y en especial de (ya existe toda la funcionalidad):

GET /positions/:id/interviewFlow > @positionController.ts @positionRoutes.ts getInterviewFlowByPosition

La respuesta:
{
"positionName": "Senior backend engineer",
"interviewFlow": {

              "id": 1,
              "description": "Standard development interview process",
              "interviewSteps": [
                  {
                      "id": 1,
                      "interviewFlowId": 1,
                      "interviewTypeId": 1,
                      "name": "Initial Screening",
                      "orderIndex": 1
                  },
                  {
                      "id": 2,
                      "interviewFlowId": 1,
                      "interviewTypeId": 2,
                      "name": "Technical Interview",
                      "orderIndex": 2
                  },
                  {
                      "id": 3,
                      "interviewFlowId": 1,
                      "interviewTypeId": 3,
                      "name": "Manager Interview",
                      "orderIndex": 2
                  }
              ]
          }

}

GET /positions/:id/candidates > @positionRoutes.ts getCandidatesByPosition
[
{
"fullName": "Jane Smith",
"currentInterviewStep": "Technical Interview",
"averageScore": 4
},
{
"fullName": "Carlos García",
"currentInterviewStep": "Initial Screening",
"averageScore": 0
 },
 {
"fullName": "John Doe",
"currentInterviewStep": "Manager Interview",
"averageScore": 5
 }
 ]

PUT /candidates/:id/stage @candidateRoutes.ts updateCandidateStageController

{
"applicationId": "1",
"currentInterviewStep": "3"
}

Sin comentarios en el codigo
Todo en ingles
Antes de empezar hazme todas las preguntas que necesites. No escribas código
