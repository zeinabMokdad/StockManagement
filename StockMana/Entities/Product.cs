namespace StockMana.Entities
{
    public abstract class BaseProduct
    {
        public string Name { get; set; }
        public string Barcode { get; set; }
        public decimal Price { get; set; }
        public int CurrencyID { get; set; }
        public int Quantity { get; set; }
    }

    public class Product : BaseProduct
    {
        public long ID { get; set; }
    }

    public class ProductInfo
    {
        public long ID { get; set; }
        public string Name { get; set; }
    }

    public class ProductToAdd : BaseProduct
    {

    }

    public class ProductDetail
    {
        public long ID { get; set; }
        public string Name { get; set; }
        public string Barcode { get; set; }
        public decimal Price { get; set; }
        public int CurrencyID { get; set; }
        public string CurrencyDescription { get; set; }
        public int Quantity { get; set; }
    }

    public class ProductFilter
    {
        public string Barcode { get; set; }
        public string Name { get; set; }
    }

    public class ProductInvoice
    {
        public long? ID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal? UnitPrice { get; set; }
        public int CurrencyID { get; set; }
    }
}