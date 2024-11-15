namespace ecommerce_freshydeli.Utilities
{
    public  class EmailInfo
    {
        public static string GetEmailSubject(int companyId, string branchName)
        {
          

            switch (companyId)
            {
                case 12:
                    return $"Cambio en Correo de validación / Asunto: Plataforma de Pedidos FRESHI - Registro de nuevo usuario {branchName}";
                case 38:
                    return $"Cambio en Correo de validación / Asunto: Plataforma de Pedidos RESCO - Registro de nuevo usuario {branchName}";
                default:
                    return "empresa no existe";
            }

        }

        public static string GetEmailContent(int companyId, string name,string username)
        {
            switch (companyId)
            {
                case 12:
                    return $"el <b>Sistema de Pedidos Electrónicos de FRESHI</b> requiere que valide su dirección de correo electrónico para habilitar su acceso. Se le ha asignado el usuario <b>{username}</b> y la contraseña temporal <b>{username}</b>. Ingrese a la plataforma en este link para completar  proceso de registro. Si tiene cualquier duda o requiere asistencia  se puede comunicar via WhatsApp al tel <b>8836-8789</b>.";
                case 38:
                    return $"el <b>Sistema de Pedidos Electrónicos de RESCO</b> requiere que valide su dirección de correo electrónico para habilitar su acceso. Se le ha asignado el usuario <b>{username}</b> y la contraseña temporal <b>{username}</b>";
                default:
                    return "empresa no existe";
            }

        }
    }
}
