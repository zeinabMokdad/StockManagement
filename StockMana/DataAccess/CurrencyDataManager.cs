using MyWebProject.Entities;
using System.Collections.Generic;
using System.Data;

namespace MyWebProject.DataAccess
{
    public class CurrencyDataManager : BaseDataManager
    {
        public long AddCurrency(CurrencyToAdd currency)
        {
            return ExecuteNonQuerySP("sp_Currency_Add", currency.Name, currency.Symbol);
        }

        public bool EditCurrency(Currency currency)
        {
            return ExecuteNonQuerySP("sp_Currency_Update", currency.ID, currency.Name, currency.Symbol) > 0;
        }

        public Currency GetCurrency(long currencyId)
        {
            return ExecuteReaderItemSP("sp_Currency_GetById", CurrencyMapper, currencyId);
        }

        public List<Currency> GetFilteredCurrencies(CurrencyFilter filter)
        {
            string nameFilter = null;
            if (filter != null)
            {
                nameFilter = filter.Name;
            }

            return ExecuteReaderListSP("sp_Currency_GetAll", CurrencyMapper, nameFilter);
        }

        Currency CurrencyMapper(IDataReader reader)
        {
            return new Currency()
            {
                ID = (int)reader["Id"],
                Symbol = reader["Symbol"] as string,
                Name = reader["Name"] as string
            };
        }
    }
}