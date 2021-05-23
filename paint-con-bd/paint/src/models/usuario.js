import { Schema, model} from Mongoose;

const coordenadasSchema = new Schema({
    x: {
        type: Schema.Types.Decimal128,
        required: true,
    },
    y: {
        type: Schema.Types.Decimal128,
        required: true,
    },
},
{ _id: false, timestamps: false}
);
const usuarioSchema = new Schema({
    nombre: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    //agregando color que tendrá cada usuario.
    color: {
        type: Schema.Types.String,
        required: true,
    },
    coordenadas: [coordenadasSchema],
},
{ timestamps: false }
);

export const Usuario = model("usuario", usuarioSchema);