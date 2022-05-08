using MyWebProject.DataAccess;
using MyWebProject.Entities;
using System;
using System.Collections.Generic;

namespace MyWebProject.Business
{
    public class CurrencyManager
    {
        CurrencyDataManager dataManager;

        public CurrencyManager()
        {
            dataManager = new CurrencyDataManager();
        }

        public Currency GetCurrency(int currencyId, bool throwExceptionIfNull)
        {
            Currency currency = dataManager.GetCurrency(currencyId);
            if (throwExceptionIfNull && currency == null)
                throw new Exception($"Invalid Currency ID: {currencyId}");

            return currency;
        }

        internal List<CurrencyInfo> GetCurrencyInfos()
        {
            List<Currency> currencys = dataManager.GetFilteredCurrencies(null);
            if (currencys == null)
                return null;

            List<CurrencyInfo> currencyInfos = new List<CurrencyInfo>();
            foreach (Currency currency in currencys)
            {
                currencyInfos.Add(CurrencyInfoMapper(currency));
            }
            return currencyInfos;
        }

        public List<Currency> GetFilteredCurrencies(CurrencyFilter filter)
        {
            return dataManager.GetFilteredCurrencies(filter);
        }

        public bool EditCurrency(Currency currency)
        {
            return dataManager.EditCurrency(currency);
        }

        public long AddCurrency(CurrencyToAdd currencyToAdd)
        {
            return dataManager.AddCurrency(currencyToAdd);
        }

        private CurrencyInfo CurrencyInfoMapper(Currency currency)
        {
            return new CurrencyInfo()
            {
                ID = currency.ID,
                Symbol = currency.Symbol
            };
        }
    }
}