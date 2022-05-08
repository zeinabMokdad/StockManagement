using System;

namespace StockMana.Entities
{
    public abstract class BaseCustomer
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class Customer : BaseCustomer
    {
        public long ID { get; set; }
    }

    public class CustomerToAdd : BaseCustomer
    {
    }

    public class CustomerFilter
    {
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class CustomerInfo
    {
        public long ID { get; set; }
        public string FullName { get; set; }
    }
}