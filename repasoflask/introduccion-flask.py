from flask import Flask

#La variable app será la instancia de la clase Flask
#El primer parámetro para el constructor de la clase Flask tiene que ser el hilo principal en el cual se está ejecutando la aplicacion (en el archivo principal de nuestro proyecto)
app = Flask(__name__) #__name__ sirve para definir que nuetras aplicacion de flask se va a ejecutar en el archivo principal del proyecto.

#esto es un controlador que se va a ejecutar cuando se llame a la ruta 127.0.0.1
@app.route('/')
def ruta_inicial():
    return 'El servidor se ha levantado exitosamente'














