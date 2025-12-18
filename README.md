# Programación 1

## Integrantes
- Franco Vaccarezza  
- Manuel Diez de Oñate  
- Nicolas Bartolomeo  
- Josias Vilches 

# ¿ De qué se trata nuestro proyecto ?
Nuestro proyecto está inspirado en una rotisería de Palermo (ahora panchería), llamada Rotisería Cacho. Se buscó hacer una aplicación para los clientes y los trabajadores de la misma.

Haciendo un backend usando Flask, JWT (para la seguridad de la misma), Flask-Mail (para que cada cliente nuevo tenga un mail de bienvenida a la hora de registrarse), Flask-Migrate (conexión con la BD).

Nuestro Frontend está compuesto por Tailwind (para un diseño de la página más libre), Angular (para poder tener una página MVC pero mejorado), entre otros.

Vamos a lo importante y a las posibles preguntas que pueden surgir:

## ¿Cómo levantar el backend?

Es importante configurar el archivo ".env" ya que con este funciona nuestro servicio de mail, jwt y la configuración de la BD

Para poder levantar el backend de nuestro proyecto antes es necesario ejecutar el siguiente comando:
```bash
./install.sh
```

Para levantar el backend:
```bash
./boot.sh
```

## ¿Cómo levantar el frontend?
```bash
npm run start
```

## LINK FIGMA FRONTEND
## https://www.figma.com/design/heIXrLLnV2QpFiQ2W2NnvB/Rotiser%C3%ADa-4F?node-id=22-4&m=dev&t=6I9JDC4gTRgkMqTg-1
