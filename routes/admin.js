'use strict'

const express = require('express');
const AdminController = require('../controllers/AdminController');

const api = express.Router();
const auth = require('../middlewares/authenticate');
const multiparty = require('connect-multiparty');
const path = multiparty({uploadDir: './uploads/instituciones'});

/**
 * @swagger
 * /api/helper/obtener_portada/{img}:
 *   get:
 *     summary: Obtiene la portada del incidente.
 *     parameters:
 *       - in: path
 *         name: img
 *         required: true
 *         description: Nombre de la imagen del incidente.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portada del incidente obtenida correctamente.
 */
api.get('/obtener_portada/:img', AdminController.obtener_portada);
/**
 * @swagger
 * /api/helper/obtener_portada_avatar/{img}:
 *   get:
 *     summary: Obtiene la portada del avatar.
 *     parameters:
 *       - in: path
 *         name: img
 *         required: true
 *         description: Nombre de la imagen del avatar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portada del avatar obtenida correctamente.
 */
api.get('/obtener_portada_avatar/:img', AdminController.obtener_portada_avatar);
/**
 * @swagger
 * /api/helper/obtener_portada_ficha/{img}:
 *   get:
 *     summary: Obtiene la portada de la ficha.
 *     parameters:
 *       - in: path
 *         name: img
 *         required: true
 *         description: Nombre de la imagen de la ficha.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portada de la ficha obtenida correctamente.
 */
api.get('/obtener_portada_ficha/:img', AdminController.obtener_portada_ficha);
/**
 * @swagger
 * /api/helper/obtener_portada_barrio/{img}:
 *   get:
 *     summary: Obtiene la portada del barrio.
 *     parameters:
 *       - in: path
 *         name: img
 *         required: true
 *         description: Nombre de la imagen del barrio.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Portada del barrio obtenida correctamente.
 */
api.get('/obtener_portada_barrio/:img', AdminController.obtener_portada_barrio);
/**
 * @swagger
 * /api/helper/newpassword:
 *   post:
 *     summary: Crea una nueva contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nueva contraseña.
 *     responses:
 *       '200':
 *         description: Nueva contraseña creada correctamente.
 *       '400':
 *         description: Error al crear la nueva contraseña.
 */
api.post('/newpassword', auth.auth, AdminController.newpassword);
/**
 * @swagger
 * /api/helper/forgotpassword:
 *   post:
 *     summary: Recupera la contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *     responses:
 *       '200':
 *         description: Se ha enviado la información para recuperar la contraseña correctamente.
 *       '400':
 *         description: Error al enviar la información para recuperar la contraseña.
 */
api.post('/forgotpassword', AdminController.forgotpassword);
/**
 * @swagger
 * /api/helper/login_admin:
 *   post:
 *     summary: Inicio de sesión
 *     description: Inicia sesión dentro del sistema.
 *     tags: [USUARIOS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '201':
 *         description: Registro exitoso.
 *       '400':
 *         description: Error en la solicitud debido a validaciones fallidas.
 *       '409':
 *         description: El correo y/o la cédula ya existe en la base de datos.
 *       '500':
 *         description: Error interno en el servidor.
 * components:
 *    schemas:
 *      Login:
 *        type: object
 *        properties:
 *          correo:
 *            type: string
 *            format: email
 *            description: Correo electrónico del usuario.
 *            example: saamare99@gmail.com
 *          password:
 *            type: string
 *            description: Contraseña del usuario.
 *            example: 123456789
 */
api.post('/login_admin', AdminController.login);
/**
 * @swagger
 * /api/helper/listar_registro:
 *   get:
 *     summary: Listar recursos.
 *     description: Lista los recursos disponibles.
 *     tags:
 *       - Recursos
 *     parameters:
 *       - in: header
 *         name: authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token de autorización en formato Bearer.
 *     responses:
 *       '200':
 *         description: Operación exitosa.
 *       '401':
 *         description: No autorizado.
 *       '403':
 *         description: Prohibido.
 *       '500':
 *         description: Error interno del servidor.
 */
api.get('/listar_registro', auth.auth, AdminController.listar_registro);
/**
 * @swagger
 * /api/helper/verificar_token:
 *   get:
 *     summary: Verificar token
 *     description: Verifica la validez del token de autorización
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido
 */
api.get('/verificar_token', auth.auth, AdminController.verificar_token);
/**
 * @swagger
 * /api/helper/verificarcorreo/{id}:
 *   get:
 *     summary: Verifica el correo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del correo a verificar.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Correo verificado correctamente.
 */
api.get('/verificarcorreo/:id', AdminController.verificarCorreo);


module.exports = api;