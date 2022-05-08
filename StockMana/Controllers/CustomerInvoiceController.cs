using MyWebProject.Business;
using MyWebProject.Entities;
using System.Web.Http;

namespace MyWebProject.Controllers
{
    public class CustomerInvoiceController : ApiController
    {
        CustomerInvoiceManager manager = new CustomerInvoiceManager();

        [HttpPost]
        public void AddInvoice(CustomerInvoiceToAdd customerInvoice)
        {
            manager.AddInvoice(customerInvoice);
        }
    }
}