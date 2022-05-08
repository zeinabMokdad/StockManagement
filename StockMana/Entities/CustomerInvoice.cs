using System;
using System.Collections.Generic;

namespace StockMana.Entities
{
    public abstract class BaseCustomerInvoice
    {
        public List<ProductInvoice> ProductInvoices { get; set; }
        public long? CustomerID { get; set; }
    }

    public class CustomerInvoice : BaseCustomerInvoice
    {
        public long ID { get; set; }
        public DateTime InvoiceDate { get; set; }

        public Dictionary<int, decimal> InvoiceAmountByCurrencyID
        {
            get
            {
                Dictionary<int, decimal> invoiceAmountByCurrencyID = new Dictionary<int, decimal>();
                foreach (var product in ProductInvoices)
                {
                    if (invoiceAmountByCurrencyID.TryGetValue(product.CurrencyID, out decimal price))
                        invoiceAmountByCurrencyID[product.CurrencyID] = price + product.Price;
                    else
                        invoiceAmountByCurrencyID.Add(product.CurrencyID, product.Price);
                }
                return invoiceAmountByCurrencyID;
            }
        }
    }

    public class CustomerInvoiceToAdd : BaseCustomerInvoice
    {

    }
}