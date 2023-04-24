import { ApiProperty } from '@nestjs/swagger';
/**
 *
 * Modelo usado cuando no se encuentra la informacion
 *
 * @export NotFoundSwagger Se exporta la clase
 * @class NotFoundSwagger Nombre de la clase
 */
export class NotFoundSwagger {
  /**
   *
   * Estado de solicitud
   *
   * @type {number}
   * @memberof NotFoundSwagger
   */
  @ApiProperty()
  statusCode: number;
  /**
   *
   * Mensaje del error
   *
   * @type {string[]}
   * @memberof NotFoundSwagger
   */
  @ApiProperty()
  message: string;
  /**
   *
   * Error
   *
   * @type {string}
   * @memberof NotFoundSwagger
   */
  @ApiProperty()
  datails: {};
}
