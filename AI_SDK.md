# AI SDK — Notas de referencia

## ¿Qué es?

El AI SDK es un kit de herramientas de código abierto (open source) creado por **Vercel** (la misma empresa de Next.js), diseñado para construir aplicaciones y agentes de IA con React, Next.js, Vue, Svelte, Node.js, entre otros frameworks.

La idea central, tal como la menciona el profe, es que **facilita la interacción con los modelos de IA**: en vez de que cada proveedor (OpenAI, Anthropic, Google, etc.) tenga su propio SDK con su propia sintaxis, el AI SDK ofrece una capa común para hablar con cualquiera de ellos.

> 💡 Analogía: es como un "Prisma para modelos de IA". Así como Prisma te abstrae de escribir SQL directo contra distintas bases de datos, el AI SDK te abstrae de escribir llamadas distintas para cada proveedor de IA.

## ¿Qué problema resuelve?

Sin el SDK, conectar tu app a un modelo de IA implica:

- Manejar streaming manualmente (parsear chunks, eventos, etc.)
- Reescribir tu código si cambias de proveedor (OpenAI → Anthropic → Google)
- Construir desde cero el manejo de "tool calling" (cuando el modelo necesita ejecutar funciones)
- Construir desde cero el estado del chat en el frontend (mensajes, loading, errores)

El AI SDK estandariza todo esto, permitiendo enfocarse en construir la aplicación en lugar de perder tiempo resolviendo detalles técnicos repetitivos.

## Las dos partes: Core y UI

### 🔧 AI SDK Core — "el cerebro / backend"

Es la capa que habla directamente con el modelo de IA y maneja toda la lógica técnica. Vive normalmente en una API route o Server Action de Next.js.

Ofrece funciones estandarizadas para generación de texto, generación de datos estructurados y uso de herramientas (tools):

| Función               | Para qué sirve                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `generateText`        | Genera texto y tool calls. Ideal para tareas no interactivas (redactar un email, resumir contenido) y para agentes que usan herramientas |
| `streamText`          | Igual que `generateText` pero en streaming. Se usa en casos interactivos como chatbots                                                   |
| `generateObject`      | Genera datos **estructurados** (JSON validado con un schema, ej. con Zod) en vez de texto libre                                          |
| `embed` / `embedMany` | Genera embeddings (vectores) — útil para búsqueda semántica, RAG                                                                         |
| Tool Calling          | El modelo puede "llamar funciones" propias del desarrollador (ej. consultar una base de datos) durante la conversación                   |

**Resumen práctico:** Core = lógica de servidor. Aquí se decide qué modelo usar, qué prompt mandar, si se necesita streaming, y si el modelo puede usar herramientas.

### 🎨 AI SDK UI — "la cara / frontend"

Es la capa que muestra y gestiona la experiencia del usuario en aplicaciones con chat o asistentes de IA. Es agnóstica de framework: soporta React, Svelte, Vue.js, Angular y SolidJS.

Sus piezas principales son **hooks**:

| Hook            | Para qué sirve                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `useChat`       | Hook para interactuar con modelos en una interfaz de chat. Maneja mensajes, estado de carga, streaming en vivo y errores automáticamente |
| `useCompletion` | Hook para interfaces de completado de texto simple (sin historial de chat)                                                               |
| `useObject`     | Hook para consumir objetos JSON transmitidos en streaming                                                                                |

**Resumen práctico:** UI = lógica de cliente (React). Solo se conecta un componente de input/mensajes a `useChat`, y el hook se encarga de mandar la petición a la API route, recibir el streaming, y actualizar el estado en pantalla — sin programar el `fetch` ni el parseo del stream manualmente.

## Cómo se conectan en una app de Next.js

```
[Componente React: useChat] ⇄ [API Route /api/chat: streamText] ⇄ [Modelo de IA]
        ↑ AI SDK UI                    ↑ AI SDK Core
```

1. El usuario escribe en el chat (componente con `useChat`).
2. `useChat` manda el mensaje a la ruta API (ej. `/api/chat`).
3. Ahí, con `streamText` (Core), se llama al modelo (OpenAI, Anthropic, etc.) y se devuelve la respuesta como stream.
4. `useChat` (UI) recibe ese stream y va actualizando la UI en tiempo real, sin programar el streaming manualmente.

## Ventajas clave

- **Multi-proveedor:** se puede cambiar de OpenAI a Anthropic (o viceversa) cambiando básicamente una línea de código.
- **Streaming que funciona out-of-the-box:** sin parseo manual de chunks.
- **Fallbacks integrados:** comportamiento confiable en producción.
- **Amplio soporte de modelos:** más de 100 modelos disponibles a través del AI Gateway de Vercel.

## Tabla resumen rápida

|                | AI SDK Core                                    | AI SDK UI                               |
| -------------- | ---------------------------------------------- | --------------------------------------- |
| Capa           | Backend / servidor                             | Frontend / cliente                      |
| Función        | Habla con el modelo de IA                      | Muestra y gestiona la UI del chat       |
| Dónde vive     | API routes, Server Actions                     | Componentes React/Vue/Svelte            |
| Ejemplos clave | `generateText`, `streamText`, `generateObject` | `useChat`, `useCompletion`, `useObject` |

---

_Notas generadas a partir de la presentación del curso de Next.js + documentación oficial de ai-sdk.dev_
