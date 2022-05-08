using StockMana.Business;
using StockMana.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace StockMana.Controllers
{
    public class CustomerController : ApiController
    {
        CustomerManager manager = new CustomerManager();

        [HttpGet]
        public Customer GetCustomer(long customerId)
        {
            return manager.GetCustomer(customerId, true);
        }

        [HttpGet]
        public Customer GetCustomerByPhoneNumber(string phoneNumber)
        {
            return manager.GetCustomerByPhoneNumber(phoneNumber);
        }

        [HttpGet]
        public List<CustomerInfo> GetCustomerInfos()
        {
            return manager.GetCustomerInfos();
        }

        [HttpGet]
        public List<Customer> GetFilteredCustomers(string serializedInput)
        {
            CustomerFilter filter = JsonConvert.DeserializeObject<CustomerFilter>(serializedInput);
            return manager.GetFilteredCustomers(filter);
        }

        [HttpPost]
        public long AddCustomer(CustomerToAdd customerToAdd)
        {
            return manager.AddCustomer(customerToAdd);
        }

        [HttpPost]
        public bool EditCustomer(Customer customer)
        {
            return manager.EditCustomer(customer);
        }
    }
}