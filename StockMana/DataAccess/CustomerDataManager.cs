using StockMana.Entities;
using System;
using System.Collections.Generic;
using System.Data;

namespace StockMana.DataAccess
{
    public class CustomerDataManager : BaseDataManager
    {
        public long AddCustomer(CustomerToAdd customer)
        {
            return ExecuteNonQuerySP("sp_Customer_Add", customer.FirstName, customer.LastName, customer.PhoneNumber);
        }

        public bool EditCustomer(Customer customer)
        {
            return ExecuteNonQuerySP("sp_Customer_Update", customer.ID, customer.FirstName, customer.LastName, customer.PhoneNumber) > 0;
        }

        public Customer GetCustomer(long customerId)
        {
            return ExecuteReaderItemSP("sp_Customer_GetById", CustomerMapper, customerId);
        }

        public List<Customer> GetFilteredCustomers(CustomerFilter filter)
        {
            string customerName = null;
            string phoneNumberFilter = null;
            if (filter != null)
            {
                customerName = filter.CustomerName;
                phoneNumberFilter = filter.PhoneNumber;
            }

            return ExecuteReaderListSP("sp_Customer_GetAll", CustomerMapper, customerName, phoneNumberFilter);
        }

        public Customer GetCustomerByPhoneNumber(string phoneNumber)
        {
            return ExecuteReaderItemSP("sp_Customer_GetByPhoneNumber", CustomerMapper, phoneNumber);
        }

        private Customer CustomerMapper(IDataReader reader)
        {
            return new Customer()
            {
                ID = (long)reader["Id"],
                FirstName = reader["FirstName"] as string,
                LastName = reader["LastName"] as string,
                PhoneNumber = reader["PhoneNumber"] as string,
            };
        }
    }
}