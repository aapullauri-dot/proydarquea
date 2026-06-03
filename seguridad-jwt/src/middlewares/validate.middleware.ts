// Ariel Ullauri
// Middleware de validación usando Zod

/**
 * Request → datos que llegan al servidor.
 * Response → respuesta que envía el servidor.
 * NextFunction → permite continuar al siguiente proceso.
 */
import type{ Request, Response, NextFunction } from 'express';

/**
 * AnyZodObject → permite usar esquemas de validación.
 * ZodError → detecta errores generados por Zod.
 */
import { AnyZodObject, ZodError } from 'zod';

/**
 * Función validateTask
 * Recibe un esquema de validación como parámetro.
 */
export const validateTask = (schema: AnyZodObject) => {

    /**
     * Middleware asíncrono
     * Se ejecuta antes de llegar al controlador.
     */
    return async (req: Request,res: Response,next: NextFunction): Promise<void> => {

        try {

            // Valida los datos enviados en el body
            schema.parse(req.body);

            // Si la validación es correcta, continúa
            next();

        } catch (error) {

            // Verifica si el error proviene de Zod
            if (error instanceof ZodError) {

                // Retorna un error 400 con mensajes personalizados
                res.status(400).json({

                    // Estado personalizado del error
                    status: "error_validacion",

                    // Recorre todos los errores encontrados
                    errors: error.errors.map(err => ({

                        // Campo donde ocurrió el error
                        campo: err.path[0],

                        // Mensaje descriptivo del error
                        mensaje: err.message
                    }))
                });

                // Finaliza la ejecución
                return;
            }

            // Si ocurre otro tipo de error, continúa
            next(error);
        }
    };
};