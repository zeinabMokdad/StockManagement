using StockMana.DataAccess;
using StockMana.Entities;
using System;
using System.Collections.Generic;

namespace StockMana.Business
{
    public class CustomerManager
    {
        CustomerDataManager dataManager;

        public CustomerManager()
        {
            dataManager = new CustomerDataManager();
        }

        public Customer GetCustomer(long customerId, bool throwExceptionIfNull)
        {
            Customer customer = dataManager.GetCustomer(customerId);
            if (throwExceptionIfNull && customer == null)
                throw new Exception($"Invalid Customer ID: {customerId}");

            return customer;
        }

        public Customer GetCustomerByPhoneNumber(string phoneNumber)
        {
            return dataManager.GetCustomerByPhoneNumber(phoneNumber);
        }

        public List<CustomerInfo> GetCustomerInfos()
        {
            List<Customer> customers = dataManager.GetFilteredCustomers(null);
            if (customers == null)
                return null;

            List<CustomerInfo> customerInfos = new List<CustomerInfo>();
            foreach (Customer customer in customers)
            {
                customerInfos.Add(CustomerInfoMapper(customer));
            }
            return customerInfos;
        }

        public List<Customer> GetFilteredCustomers(CustomerFilter filter)
        {
            return dataManager.GetFilteredCustomers(filter);
        }

        public bool EditCustomer(Customer customer)
        {
            return dataManager.EditCustomer(customer);
        }

        public long AddCustomer(CustomerToAdd customerToAdd)
        {
            return dataManager.AddCustomer(customerToAdd);
        }

        private CustomerInfo CustomerInfoMapper(Customer customer)
        {
            return new CustomerInfo()
            {
                ID = customer.ID,
                FullName = string.Concat(customer.FirstName, " ", customer.LastName)
            };
        }
    }
}