'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema para el modelo de Usuario
const UsuarioSchema = new Schema({
    cedula: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    telefono: { type: String, required: true },
    rol_user: { type: Schema.Types.ObjectId, ref: 'rol_user', required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    foto: { type: String },
    estado: { type: String, default: 'On' },
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de Rol_user
const RolUserSchema = new Schema({
    nombre: { type: String },
    orden: { type: Number,unique: true},
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de Ficha_sectorial
//categoria: { type: Schema.Types.ObjectId, ref: 'categoria', required: true },
const FichaSectorialSchema = new Schema({
    descripcion: { type: String, required: true },
    encargado: { type: Schema.Types.ObjectId, ref: 'usuario', required: true },
    direccion_geo: { type: String,require:true },
    estado: { type: Schema.Types.ObjectId, ref: 'estado_actividad_proyecto' },
    actividad: { type: Schema.Types.ObjectId, ref: 'actividad_proyecto' },
    fecha_evento: { type: Date },
    observacion: { type: String },
    foto: [{ type: String }],
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de Incidentes_denuncia
const IncidentesDenunciaSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'categoria', required: true },
    subcategoria: { type: Schema.Types.ObjectId, ref: 'subcategoria' , required: true},
    direccion_geo: {
        nombre: { type: String, required: true },
        latitud: { type: Number, required: true },
        longitud: { type: Number, required: true }
    },
    ciudadano: { type: Schema.Types.ObjectId, ref: 'usuario' , required: true },
    estado: { type: Schema.Types.ObjectId, ref: 'estado_incidente' },
    foto: [{ type: String }],
    descripcion: { type: String, required: true },
    encargado: { type: Schema.Types.ObjectId, ref: 'usuario' },
    respuesta: { type: String },
    evidencia:[{ type: String }],
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de Categoria
const CategoriaSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true }
});


// Definición del esquema para el modelo de Subcategoria
const SubcategoriaSchema = new Schema({
    categoria: { type: Schema.Types.ObjectId, ref: 'categoria',require:true },
    nombre: { type: String ,require:true},
    descripcion: { type: String ,require:true}
});

// Definición del esquema para el modelo de Encargado_categoria
const EncargadoCategoriaSchema = new Schema({
    encargado: [{ type: Schema.Types.ObjectId, ref: 'usuario' }],
    categoria: { type: Schema.Types.ObjectId, ref: 'categoria' },
    createdAt: {type:Date, default: Date.now, require: true}
});


// Definición del esquema para el modelo de Estado_incidente
const EstadoIncidenteSchema = new Schema({
    nombre: { type: String, unique:true},
    orden:{type:Number,required:true}
});

// Definición del esquema para el modelo de Estado_actividad_proyecto
const EstadoActividadProyectoSchema = new Schema({
    nombre: { type: String, unique:true },
    orden:{type:Number,required:false}
});

// Definición del esquema para el modelo de Actividad_proyecto
const ActividadProyectoSchema = new Schema({
    nombre: { type: String },
    createdAt: {type:Date, default: Date.now, require: true}
});

// Definición del esquema para el modelo de Direccion_geo
const DireccionGeoSchema = new Schema({
    nombre: { type: String },
    latitud: { type: Number },
    longitud: { type: Number },
});

const permisosSchema = new Schema({
    nombreComponente: {
        type: String,
        required: true
    },
    rolesPermitidos: [{
        type: Schema.Types.ObjectId,
        ref: 'rol_user',
        required: true
    }],
});

// Exportar los esquemas
module.exports = {
    Permiso: mongoose.model('Permisos', permisosSchema),
    Usuario: mongoose.model('usuario', UsuarioSchema),
    Ficha_sectorial: mongoose.model('ficha_sectorial', FichaSectorialSchema),
    Incidentes_denuncia: mongoose.model('incidentes_denuncia', IncidentesDenunciaSchema),
    Categoria: mongoose.model('categoria', CategoriaSchema),
    Subcategoria: mongoose.model('subcategoria', SubcategoriaSchema),
    Encargado_categoria: mongoose.model('encargado_categoria', EncargadoCategoriaSchema),
    Rol_user: mongoose.model('rol_user', RolUserSchema),
    Estado_incidente: mongoose.model('estado_incidente', EstadoIncidenteSchema),
    Estado_actividad_proyecto: mongoose.model('estado_actividad_proyecto', EstadoActividadProyectoSchema),
    Actividad_proyecto: mongoose.model('actividad_proyecto', ActividadProyectoSchema),
    Direccion_geo: mongoose.model('direccion_geo', DireccionGeoSchema)
};
