import { ApiProperty } from '@nestjs/swagger';
/**
 *
 * Es la estructura manejada para las respuestas cuando ocurre error en el servidor
 *
 * @export BadRequestSwagger Se exporta
 * @class BadRequestSwagger Nombre de la clase
 */
export class BadRequestSwagger {
  /**
   *
   * Estado de la solicitud
   *
   * @type {number}
   * @memberof BadRequestSwagger
   */
  @ApiProperty()
  statusCode: number;
  /**
   *
   * Mensaje del error
   *
   * @type {string[]}
   * @memberof BadRequestSwagger
   */
  @ApiProperty()
  message: string;
  /**
   *
   * Error
   *
   * @type {string}
   * @memberof BadRequestSwagger
   */
  @ApiProperty()
  details: {};
}
