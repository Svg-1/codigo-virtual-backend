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

# si no declaramos el metodo a acceder, este sera GET predeterminadamente.
@app.route("/")
def ruta_inicial():
    return 'Servidor funcionando exitosamente'


@app.route("/supermercados", methods=['GET', 'POST'])
def manejo_supermercados():
    print(request.method)
    if request.method == "GET":
        return {
            "success": True,
            "content": supermercados,
            "message": None
        }
    elif request.method == "POST":
        # el metodo get_json() convierte lo que llega del front (body) a un diccionario para poder utilizar sin problemas
        print(request.get_json())
        supermercados.append(request.get_json())
        return {
            "success": True,
            "content": request.get_json(),
            "message": "Supermercado creado exitosamente"
        }, 201
    else:
        return 'nunca deberia ingresar aqui'

# 127.0.0.1:5000/supermercado/1 <- id del supermercado


@app.route("/supermercados/<int:id_super>", methods=['GET', 'PUT', 'DELETE', 'PATCH'])
def manejo_supermercado(id_super):
    print(id_super)
    return 'ok'


# 127.0.0.1:5000/supermercado?nombre=supera&capacidad=1000
app.run(debug=True)