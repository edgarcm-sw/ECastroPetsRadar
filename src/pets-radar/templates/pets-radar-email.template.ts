import { LostPetsRadar } from "src/core/interfaces/lost-pets-radar.interface";
import { generateMapboxImage } from "src/core/utils/utils";

export const generatePetRadarEmailTemplate = (lostPets: LostPetsRadar): string => {
    const imageUrl = generateMapboxImage(lostPets.lon, lostPets.lat);
    const lostDate = new Date(lostPets.lost_date).toLocaleDateString('es-MX', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Mascota Perdida</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f1eb;font-family:'Georgia',serif;">

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 0;">
        <tr>
          <td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e0d9ce;">

              <!-- Header -->
              <tr>
                <td style="background:#1a1a1a;padding:28px 36px;text-align:center;">
                  <p style="margin:0;font-size:11px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Alerta de búsqueda</p>
                  <h1 style="margin:8px 0 0;font-size:32px;color:#ffffff;font-weight:normal;letter-spacing:1px;">${lostPets.name}</h1>
                </td>
              </tr>

              <!-- Urgency badge -->
              <tr>
                <td style="background:#c9a96e;padding:10px 36px;text-align:center;">
                  <p style="margin:0;font-size:11px;letter-spacing:3px;color:#1a1a1a;font-family:Arial,sans-serif;text-transform:uppercase;font-weight:bold;">&#9679; Mascota perdida — se necesita ayuda</p>
                </td>
              </tr>

              <!-- Map image -->
              <tr>
                <td style="padding:0;">
                  <img src="${imageUrl}" width="560" style="display:block;width:100%;height:auto;" alt="Ubicación donde se perdió ${lostPets.name}" />
                </td>
              </tr>

              <!-- Details -->
              <tr>
                <td style="padding:32px 36px 0;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Especie</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostPets.species}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Raza</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostPets.breed}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Color</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostPets.color}</p>
                      </td>
                      <td width="4%"></td>
                      <td width="48%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Tamaño</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostPets.size}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Fecha de pérdida</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostDate}</p>

                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Foto</p>
                        <p style="margin:0 0 20px;font-size:16px;color:#1a1a1a;">${lostPets.photo_url ? `<a href="${lostPets.photo_url}" style="color:#c9a96e;">Ver foto</a>` : 'No disponible'}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Description -->
              <tr>
                <td style="padding:0 36px 32px;">
                  <div style="background:#f9f7f4;border-left:3px solid #c9a96e;padding:16px 20px;border-radius:0 6px 6px 0;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Descripción</p>
                    <p style="margin:0;font-size:15px;color:#333;line-height:1.6;">${lostPets.description}</p>
                  </div>
                </td>
              </tr>

              <!-- Address -->
              <tr>
                <td style="padding:0 36px 32px;">
                  <div style="background:#1a1a1a;border-radius:8px;padding:16px 20px;display:flex;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;color:#c9a96e;font-family:Arial,sans-serif;text-transform:uppercase;">Última ubicación conocida</p>
                    <p style="margin:0;font-size:15px;color:#ffffff;">${lostPets.address}</p>
                    <p style="margin:6px 0 0;font-size:12px;color:#888;font-family:Arial,sans-serif;">
                      Coordenadas: ${lostPets.lat}, ${lostPets.lon}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f1eb;padding:20px 36px;text-align:center;border-top:1px solid #e0d9ce;">
                  <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;line-height:1.6;">
                    Si tienes información sobre esta mascota,<br/>por favor comunícate con su dueño lo antes posible.
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