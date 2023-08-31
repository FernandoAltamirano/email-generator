import { Content } from "../interfaces/Content"

export const renderBody = (params: { header: string, footer: string, content: Content[], lang: string }) => {
  const { header, footer, content, lang = "es" } = params
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title>Nuevo mensaje</title> <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!--[if mso]><noscript> <xml> <o:OfficeDocumentSettings> <o:AllowPNG></o:AllowPNG> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> </noscript><![endif]-->
  <!--[if lte mso 11]><style type="text/css"> .mj-outlook-group-fix { width:100% !important; margin: 0 auto;} </style><![endif]-->
  <!--[if !mso]><!-->
  <style>
    @import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,400&display=swap);
  </style> <!--<![endif]-->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"> <!--[if !mso]><!-- -->
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i" rel="stylesheet"> <!--<![endif]-->
  <style type="text/css">
    * {
      font-family: 'Roboto', sans-serif;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }

    .contentImg img {
      width: 100% !important;
      height: 157px !important;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    @media only screen and (max-width:600px) {

      p,
      ul li,
      ol li,
      a {
        line-height: 150% !important
      }

      h1,
      h2,
      h3,
      h1 a,
      h2 a,
      h3 a {
        line-height: 120% !important
      }

      h1 {
        font-size: 30px !important;
        text-align: center
      }

      h2 {
        font-size: 26px !important;
        text-align: center
      }
    }
  </style>
</head>

<body
  style="width:100%;font-family:roboto, 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0;word-spacing:normal">
    ${header}
    <!-- Banexcoin body -->
    
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#ffffff"><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background:#ffffff;background-color:#ffffff;width:100%;max-width:600px">
        <tr>
          <td style="padding:0px 10px 0;Margin:0;direction:ltr;font-size:0px;text-align:center">
            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:580px;"><![endif]-->
            <div style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;vertical-align:top"
                width="100%">
                <tr>
                  <td align="left" style="padding:30px 25px 0;Margin:0;font-size:0px;word-break:break-word">
                    <div style="font-size:16px;font-weight:400;line-height:1;text-align:left;color:#000000">
                      ${lang === "es" ? "Hola" : "Hello"} {{.Subscriber.Name}}, </div>
                  </td
                </tr>
                ${content.map((el) => `<tr>
                  <td align="left" style="padding:20px 25px 0px;margin:0;font-size:0px;word-break:break-word">
                    <div style="font-size:16px;font-weight:400;line-height:1.5;text-align:left;color:#000000">
                      <p style="margin:0;" id="${el.name}">${el.value}</p>
                    </div>
                  </td>
                </tr>`)
    }
              </table>
            </div> <!--[if mso | IE]></td></tr></table><![endif]-->
          </td>
        </tr>
      </table>
    ${footer}
</body>

</html>`
}