namespace StockMana.Entities
{
    public abstract class BaseCurrency
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
    }

    public class Currency: BaseCurrency
    {
        public int ID { get; set; }
    }

    public class CurrencyToAdd : BaseCurrency
    {
    }

    public class CurrencyInfo
    {
        public int ID { get; set; }
        public string Symbol { get; set; }
    }
    public class CurrencyFilter
    {
        public string Name { get; set; }
    }
}