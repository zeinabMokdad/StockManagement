using StockMana.Business;
using StockMana.Entities;
using System.Web.Http;

namespace StockMana.Controllers
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