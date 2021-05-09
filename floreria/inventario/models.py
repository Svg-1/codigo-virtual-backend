from django.db import models

# Creando un modelo:
#herencia de la clase:
class AlmacenModel(models.Model):
#aca irán las columnas en forma de atributos de la clase
    almacenId = models.AutoField(     #le indicamos que el atributo id será un campo entero y autoincrementable. Solo puede haber un autoincrementable por modelo.(dentro del parentesis pasamos los parametros)
    unique=True,    # para que sea único
    primary_key=True,  # para que sea pk
    null=False,       # para que no admita valores nulos
    db_column="id",    # para que el nombre de su columna en  la BD sea diferente al del atributo.
    verbose_name="id del almacen")
    almacenNombre = models.CharField(
        max_length=30,  # parámetro obligatorio para cuando sea un charfield (varchar)
        db_column="nombre",
        verbose_name="Nombre del almacen",
        help_text="Nombrecito del almacen", # es un campo de ayuda que nos brinda una mejor información en el paen administrativo.
    )
    almacenDireccion = models.CharField(
        db_column="direccion",  #NOTA: Solamente usar verbose_name, help_tex para cuando vayamos a utilizar el panel administrativo, caso contrario su uso en nulo.
        max_length=100,
        verbose_name="Direccion del almacen",
        help_text="Direccion expresada en texto indicando Calle, Numero, Distrito, Provincia"    
    ) 
    almacenEstado = models.BooleanField(
        default=True, #Para indicar un valor por defecto en caso el cliente (frontend) no me lo diese, y asi evitar que esa columna cree un valor vacío.
        null=False,
        db_column="estado",
        verbose_name="Estado del almacen",
        help_text="Estado de disponibilidad del almacen",
    ) 
    class Meta: #La clase meta es una clase propia de las clases en python y sirve para pasar metadatos(configuraciobnes adicionales al a clase en la cual se está haciedno la Herencia (en este caso estamos heredando de la clase Model)).
        #para cambiar el nombre de la tabla en la BD:
        db_table = "almacenes"
        ordering = ["almacenNombre", ] 
        #unique sirve para hacer que dos o más columnas no puedan repetir su misma información.
        unique_together = [["almacenNombre", "almacenDireccion"], ["almacenDireccion", "almacenEstado"]] # nombre de almacen si se puede repetir pero no la direccion, o misma direccion si pero no se repite nombre de almacen.
        # !NOTA: los sgtes. campos son para el panel administrativo:
        #esto se verá en el listado de los modelos en el panel administrativo.
        verbose_name = "almacen"
        verbose_name_plural = "almacenes" 

class ProductoModel(models.Model):
    productoId = models.AutoField(
        primary_key=True,
        null=False,
        unique=True,
        db_column="id"
    )
    #Nombre tiene que ser hasta 50 char y descripcion hasta 100, ambos no pueden ser nulos, el NOmbre tiene que ser unico, y la descripcion su valor x defecto tiene que ser : "por el momento no hay descripcion del prodcuto", en el esatdo su valor por defecrro tiene que ser trueno puede ser nulo.
    productoNombre = models.CharField(
        max_length=50,  
        db_column="Nombre",
        unique=True,
        null=False,
         
    )

    productoDescripcion = models.CharField(
        max_length=100,  
        null=False,
        db_column="Descripcion del producto",        
        default ="Por el momento no hay descripcion del producto",
    )        

    productoPrecio = models.DecimalField(
        max_digits=5,  #para indicar cuantos numero en total serán permitidos almacenar.
        null=False,
        db_column="precio",
        decimal_places=2,  #el total de decimales.      
    ) 

    productoEstado = models.BooleanField(
        default=True, 
        null=False,
        db_column="estado",        
    ) 
    # RELACIONES:
    almacenId = models.ForeignKey(
        to=AlmacenModel,
        #on_delete, sirve para indicar que sucederá cuando un registro que hace referencia a una FK sea elimiado y sus opciones son:
        #cascade, si la pk es eliminada todas sus referencias también serán aliminadas.
        # protect, no permitirá la eliminación de la PK siempre y cuando tenga referencias.
        # set_null, si la PK, es eliminada, sus referencias pasarán a un valor de null.
        # do_nothing, si la PK es eliminada, mantendrá el mismo valor sus referencias lo que ocasionará una mala integridad de los datos.
        # restrict, No permite la eliminacion de la PK y lanzará un error tipo Restrictederror
        #https://docs.djangoproject
        
        on_delete=models.PROTECT,
        db_column="almacenes_id",
        #related_name : para ingresar a su relación, es decir, cuando queramos saber todos los prodcutos que tienen un almacén en específico, si no se otorga yn nombre, django le pondrá uno aleatoriousando un formato establecido: usará el nombre del modelo con el sufijo: _set Ejem: almacen-set.
        related_name="almacenProductos"
    )

    class Meta:
        db_table = "productos"
        verbose_name = "producto"
        verbose_name_plural = "productos"



