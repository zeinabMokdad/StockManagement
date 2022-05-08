using MyWebProject.DataAccess;
using MyWebProject.Entities;
using System;
using System.Collections.Generic;

namespace MyWebProject.Business
{
    public class CustomerInvoiceManager
    {
        CustomerInvoiceDataManager dataManager;
        ProductManager productManager;

        public CustomerInvoiceManager()
        {
            dataManager = new CustomerInvoiceDataManager();
            productManager = new ProductManager();
        }

        public void AddInvoice(CustomerInvoiceToAdd customerInvoice)
        {
            dataManager.AddInvoice(customerInvoice);
            foreach (var product in customerInvoice.ProductInvoices)
            {
                if (!product.ID.HasValue)
                    continue;

                productManager.AdjustProductQuantity(product.ID.Value, -1 * product.Quantity);
            }
        }
    }
}