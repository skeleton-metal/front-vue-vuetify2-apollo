## Build Image
* Remplazar tagname por la version de la imagen (misma version que git)
`docker build -t sndregistry.sondeosglobal.com/scaffold/web-scaffold:tagname .`

## PUSH Image

`docker push sndregistry.sondeosglobal.com/scaffold/web-scaffold`

## Preparar container
1. Pararse en el servidor dockermanager del entorno que corresponda
2. Crear un directorio para el contenedor ej: /storage/scaffold/web-scaffold
2. Crear y Configurar archivo con variables de entorno (.env.production)
3. Copiar el docker-compose.yml incluido en este proyecto y realizar ajustes pertinentes (tagname, puertos)

## Iniciar container en stack

`docker stack deploy -c docker-compose.yml scaffold`
