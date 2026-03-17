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
                  <p style="margin:0;font-size:11px;letter-spacing:4px;color:#c9a96e;text-transform:uppercase;font-family:Arial,sans-serif;">Posible coincidencia encontrada</p>
                  <h1 style="margin:8px 0 4px;font-size:30px;color:#ffffff;font-weight:normal;letter-spacing:1px;">${lostPets.name}</h1>
                  <p style="margin:0;font-size:13px;color:#888;font-family:Arial,sans-serif;">${lostPets.species} · ${lostPets.breed} · ${lostPets.size}</p>
                </td>
              </tr>

              <!-- Map -->
              <tr>
                <td style="padding:0;">
                  <img src="${imageUrl}" width="600" style="display:block;width:100%;height:auto;" alt="Mapa de ubicaciones" />
                  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;padding:10px 20px;">
                    <tr>
                      <td align="center">
                        <table cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:0 16px;">
                              <span style="display:inline-block;width:10px;height:10px;background:#f74e4e;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
                              <span style="font-size:12px;color:#fff;font-family:Arial,sans-serif;vertical-align:middle;">Donde se perdió</span>
                            </td>
                            <td style="padding:0 16px;">
                              <span style="display:inline-block;width:10px;height:10px;background:#00c853;border-radius:50%;margin-right:6px;vertical-align:middle;"></span>
                              <span style="font-size:12px;color:#fff;font-family:Arial,sans-serif;vertical-align:middle;">Donde se encontró</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Datos de la mascota -->
              <tr>
                <td style="padding:28px 36px 0;">
                  <p style="margin:0 0 16px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;border-bottom:1px solid #e0d9ce;padding-bottom:8px;">Datos de la mascota</p>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="23%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:1px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Nombre</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.name}</p>
                      </td>
                      <td width="2%"></td>
                      <td width="23%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:1px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Especie</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.species}</p>
                      </td>
                      <td width="2%"></td>
                      <td width="23%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:1px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Raza</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.breed}</p>
                      </td>
                      <td width="2%"></td>
                      <td width="23%" style="vertical-align:top;">
                        <p style="margin:0 0 4px;font-size:10px;letter-spacing:1px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Color / Tamaño</p>
                        <p style="margin:0 0 16px;font-size:15px;color:#1a1a1a;">${lostPets.color} · ${lostPets.size}</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Descripción -->
                  <div style="background:#f9f7f4;border-left:3px solid #c9a96e;padding:14px 18px;border-radius:0 6px 6px 0;margin-bottom:28px;">
                    <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#999;font-family:Arial,sans-serif;text-transform:uppercase;">Descripción</p>
                    <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${lostPets.description}</p>
                  </div>
                </td>
              </tr>

              <!-- Ubicaciones lado a lado -->
              <tr>
                <td style="padding:0 36px 28px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>

                      <!-- Donde se perdió -->
                      <td width="48%" style="vertical-align:top;">
                        <div style="background:#1a1a1a;border-radius:8px;padding:16px 18px;border-top:3px solid #f74e4e;">
                          <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#f74e4e;font-family:Arial,sans-serif;text-transform:uppercase;">&#9679; Donde se perdió</p>
                          <p style="margin:0 0 4px;font-size:14px;color:#fff;">${lostPets.address}</p>
                          <p style="margin:4px 0 12px;font-size:11px;color:#888;font-family:Arial,sans-serif;">${lostDate}</p>
                          <p style="margin:8px 0 4px;font-size:10px;letter-spacing:1px;color:#888;font-family:Arial,sans-serif;text-transform:uppercase;">Contacto del dueño</p>
                          <p style="margin:0 0 2px;font-size:13px;color:#fff;">${lostPets.owner_name}</p>
                          <p style="margin:0 0 2px;font-size:13px;color:#c9a96e;">${lostPets.owner_email}</p>
                          <p style="margin:0;font-size:13px;color:#c9a96e;">${lostPets.owner_phone}</p>
                        </div>
                      </td>

                      <td width="4%"></td>

                      <!-- Donde se encontró -->
                      <td width="48%" style="vertical-align:top;">
                        <div style="background:#1a1a1a;border-radius:8px;padding:16px 18px;border-top:3px solid #00c853;">
                          <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;color:#00c853;font-family:Arial,sans-serif;text-transform:uppercase;">&#9679; Donde se encontró</p>
                          <p style="margin:0 0 4px;font-size:14px;color:#fff;">${foundPets.address}</p>
                          <p style="margin:4px 0 12px;font-size:11px;color:#888;font-family:Arial,sans-serif;">${foundDate}</p>
                          <p style="margin:8px 0 4px;font-size:10px;letter-spacing:1px;color:#888;font-family:Arial,sans-serif;text-transform:uppercase;">Contacto del finder</p>
                          <p style="margin:0 0 2px;font-size:13px;color:#fff;">${foundPets.finder_name}</p>
                          <p style="margin:0 0 2px;font-size:13px;color:#c9a96e;">${foundPets.finder_email}</p>
                          <p style="margin:0;font-size:13px;color:#c9a96e;">${foundPets.finder_phone}</p>
                        </div>
                      </td>

                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f4f1eb;padding:20px 36px;text-align:center;border-top:1px solid #e0d9ce;">
                  <p style="margin:0;font-size:12px;color:#999;font-family:Arial,sans-serif;line-height:1.6;">
                    Este reporte fue generado automáticamente.<br/>
                    Comunícate con el finder para verificar si es tu mascota.
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