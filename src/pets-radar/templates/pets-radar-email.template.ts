import { FoundPetsRadarCDto } from "src/core/interfaces/found-pets-radar.interface";
import { LostPetsRadarCDto } from "src/core/interfaces/lost-pets-radar.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generatePetRadarEmailTemplate = (lostPets: LostPetsRadarCDto, foundPets: FoundPetsRadarCDto): string => {
    const imageUrl = generateMapboxImage(lostPets.lon, lostPets.lat, foundPets.lon, foundPets.lat);
    const lostDate = new Date(lostPets.lost_date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const foundDate = new Date(foundPets.found_date).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Reporte de Mascota</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f1eb;font-family:'Georgia',serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0d9ce;">

              <!-- Header -->
              <tr>
                <td style="background:#1a1a1a;padding:28px 36px;text-align:center;">
                  <p style="margin:0;font-size:11px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Reporte de coincidencia</p>
                  <h1 style="margin:8px 0 4px;font-size:30px;color:#ffffff;font-weight:normal;letter-spacing:1px;">${lostPets.name}</h1>
                  <p style="margin:0;font-size:13px;color:#888;font-family:Arial,sans-serif;">Posible mascota encontrada</p>
                </td>
              </tr>

              <!-- Map image -->
              <tr>
                <td style="padding:0;position:relative;">
                  <img src="${imageUrl}" width="600" style="display:block;width:100%;height:auto;" alt="Mapa de ubicaciones" />
                  <!-- Legend over map -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1aee;padding:10px 20px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:0 16px;">
                              <span style="display:inline-block;width:12px;height:12px;background:#f74e4e;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
                              <span style="font-size:12px;color:#fff;font-family:Arial,sans-serif;vertical-align:middle;">Donde se perdió</span>
                            </td>
                            <td style="padding:0 16px;">
                              <span style="display:inline-block;width:12px;height:12px;background:#00c853;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
                              <span style="font-size:12px;color:#fff;font-family:Arial,sans-serif;vertical-align:middle;">Donde se encontró</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Section divider: PERDIDA -->
              <tr>
                <td style="background:#f74e4e;padding:10px 36px;text-align:center;">
                  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#fff;font-family:Arial,sans-serif;text-transform:uppercase;font-weight:bold;">&#9679; Información de la mascota perdida</p>
                </td>
              </tr>

              <!-- Lost pet details -->
              <tr>
                <td style="padding:28px 36px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Nombre</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.name}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Especie</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.species}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Raza</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.breed}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Color</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.color}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Tamaño</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.size}</p>
                      </td>
                      <td width="4%"></td>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Fecha de pérdida</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostDate}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Dueño</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.owner_name}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Correo</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.owner_email}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Teléfono</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.owner_phone}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Foto</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.photo_url ? `<a href="${lostPets.photo_url}" style="color:#f74e4e;">Ver foto</a>` : 'No disponible'}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Lost description -->
              <tr>
                <td style="padding:0 36px 28px;">
                  <div style="background:#f9f7f4;border-left:3px solid #f74e4e;padding:14px 18px;border-radius:0 6px 6px 0;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Descripción</p>
                    <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${lostPets.description}</p>
                  </div>
                </td>
              </tr>

              <!-- Lost address -->
              <tr>
                <td style="padding:0 36px 32px;">
                  <div style="background:#1a1a1a;border-radius:8px;padding:14px 18px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#f74e4e;font-family:Arial,sans-serif;text-transform:uppercase;">Última ubicación conocida</p>
                    <p style="margin:0;font-size:14px;color:#ffffff;">${lostPets.address}</p>
                    <p style="margin:4px 0 0;font-size:12px;color:#888;font-family:Arial,sans-serif;">Coordenadas: ${lostPets.lat}, ${lostPets.lon}</p>
                  </div>
                </td>
              </tr>

              <!-- Section divider: ENCONTRADA -->
              <tr>
                <td style="background:#00c853;padding:10px 36px;text-align:center;">
                  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#fff;font-family:Arial,sans-serif;text-transform:uppercase;font-weight:bold;">&#9679; Información de la mascota encontrada</p>
                </td>
              </tr>

              <!-- Found pet details -->
              <tr>
                <td style="padding:28px 36px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Especie</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.species}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Raza</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.breed ?? 'No identificada'}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Color</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.color}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Tamaño</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.size}</p>
                      </td>
                      <td width="4%"></td>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Fecha encontrada</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundDate}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Encontrado por</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.finder_name}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Correo</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.finder_email}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Teléfono</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.finder_phone}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Foto</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${foundPets.photo_url ? `<a href="${foundPets.photo_url}" style="color:#00c853;">Ver foto</a>` : 'No disponible'}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Found description -->
              <tr>
                <td style="padding:0 36px 28px;">
                  <div style="background:#f9f7f4;border-left:3px solid #00c853;padding:14px 18px;border-radius:0 6px 6px 0;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Descripción</p>
                    <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${foundPets.description}</p>
                  </div>
                </td>
              </tr>

              <!-- Found address -->
              <tr>
                <td style="padding:0 36px 32px;">
                  <div style="background:#1a1a1a;border-radius:8px;padding:14px 18px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#00c853;font-family:Arial,sans-serif;text-transform:uppercase;">Ubicación donde se encontró</p>
                    <p style="margin:0;font-size:14px;color:#ffffff;">${foundPets.address}</p>
                    <p style="margin:4px 0 0;font-size:12px;color:#888;font-family:Arial,sans-serif;">Coordenadas: ${foundPets.lat}, ${foundPets.lon}</p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f1eb;padding:20px 36px;text-align:center;border-top:1px solid #e0d9ce;">
                  <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;line-height:1.6;">
                    Este reporte fue generado automáticamente.<br/>
                    Por favor comunícate con el finder para verificar si es tu mascota.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>

    </body>
    </html>
    `;
};