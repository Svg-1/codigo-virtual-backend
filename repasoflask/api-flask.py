from flask impor Flask, request
app = Flask(__name__)
supermercados = [super]

#Solicitar información (traeme todos los supermercados): GET
#crear nuevo supermercado: POST
#Actualizar un item en su tpotalidad : PUT
#Eliminar x completo : Delete
#Actualizacion parcial (solo quiero actualizar el nombre, direccion): PATH
#{
 #   "nombre" : "plaza b",
  #  "direccion" : "av. del sol123",
  #  "capacidad" : 2000
#}

#Si no declaramps el metodo a acceder automaticamente se trabaja con GET
@app.route("/")
def ruta_inicial():
    return 'Servidor funcionando exitosamente'

@app.route("/supermercados", methods=['GET', 'POST'])
def manejo_supermercados():
    return 'entro al manejo de supermercados'








elif request.method == "POST":
    #el método get_json() convierte lo que llega del front (body) a un diccionario para poder utilizar sin problemas.
    print(request.get_json())
    supermercados.


app.run(debug=True)

