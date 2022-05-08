using Newtonsoft.Json;
using System.Web.Http;

namespace StockMana.App_Start
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var json = config.Formatters.JsonFormatter;
            json.SerializerSettings.TypeNameHandling = Newtonsoft.Json.TypeNameHandling.Objects;
            json.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Unspecified;

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}