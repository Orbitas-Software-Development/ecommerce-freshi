using ecommerce_freshydeli.DTOs;
using ecommerce_freshydeli.Entities;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Reflection.Metadata;
using System.Text.RegularExpressions;

namespace ecommerce_freshydeli.Services
{
    public class EmailServices
    {
        public static void SendUserRegistered(dynamic parameters)
        {


            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("soporte@orbitacr.net");
            mailMessage.To.Add(new MailAddress(parameters.email));

            // mailMessage.CC.Add(new MailAddress("soporte@orbitacr.net"));

            mailMessage.Subject = "FRESHI - Registro de usuario";

            mailMessage.IsBodyHtml = true;
            if (parameters.Action == "update")
            {

                mailMessage.Body = GetHtml("USER_UPDATED", parameters);
            }
            else
            {
                mailMessage.Body = GetHtml("USER_CREATED", parameters);

            }

            // mailMessage.Attachments.Add(archivoAdjunto);
            SendHtmlEmail(mailMessage);

        }

        public static void SendOrder(dynamic parameters, string pdfReport,List<EmailReport> emails,Report report)
        {
            try
            {

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("soporte@orbitacr.net");
                mailMessage.To.Add(new MailAddress(parameters.UserEmail));
                mailMessage.CC.Add(new MailAddress(parameters.ClientEmail));


                foreach (EmailReport email in emails)
                {
                    mailMessage.CC.Add(new MailAddress(email.Email));
                }

                //subject
                mailMessage.Subject = $"{report.Subject}_{parameters.OrderId}";

                mailMessage.IsBodyHtml = true;
                mailMessage.Body = GetHtml("ORDER_FRESHI", parameters);
         
                var bytes = Convert.FromBase64String(pdfReport);
                MemoryStream strm = new MemoryStream(bytes);
                //document  name
                var fileName = $"{parameters.ClientName} - {report.DocumentName} - {parameters.OrderId}.pdf";
                Attachment attachment = new Attachment(strm, fileName);
                ContentDisposition contentDisposition = attachment.ContentDisposition;
                attachment.ContentId = fileName;
                contentDisposition.Inline = true;
                mailMessage.Attachments.Add(attachment);

                SendHtmlEmail(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }

        private static void SendHtmlEmail(MailMessage mailMessage)
        {
            CancellationTokenSource source = new CancellationTokenSource();
            using (SmtpClient client = new SmtpClient("smtp.gmail.com", 587))
            {
                client.Credentials = new System.Net.NetworkCredential("soporte@orbitacr.net", "5tqim3kTzAtkQSEkDnqQ858d");
                client.EnableSsl = true;
                client.Send(mailMessage);
            }
        }

        private static string GetHtml(string document, object parameters)
        {
            var url = $"http://hailor-001-site40.atempurl.com/sos-ecommerce/";
            var filePath = $"{document}.html";
            using WebClient client = new WebClient();
            var htmlCode = client.DownloadString(Path.Combine(url, filePath));
            var matches = Regex.Matches(htmlCode, "{{(\\w+)}}");

            foreach (Match match in matches)
            {
                string _change = parameters.GetType().GetProperty(match.Value.Replace("{{", "").Replace("}}", "")).GetValue(parameters, null).ToString();
                htmlCode = htmlCode.Replace(match.Value, _change);
            }
            return htmlCode;
        }

    }
}
