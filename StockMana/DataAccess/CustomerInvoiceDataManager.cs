using MyWebProject.Entities;
using Newtonsoft.Json;

namespace MyWebProject.DataAccess
{
    public class CustomerInvoiceDataManager : BaseDataManager
    {
        public long AddInvoice(CustomerInvoiceToAdd customerInvoice)
        {
            return ExecuteNonQuerySP("sp_CustomerInvoice_Add", customerInvoice.CustomerID, JsonConvert.SerializeObject(customerInvoice.ProductInvoices));
        }
    }
}