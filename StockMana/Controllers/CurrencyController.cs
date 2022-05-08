using System;
using StockMana.Business;
using StockMana.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;

namespace StockMana.Controllers
{
    public class CurrencyController : ApiController
    {
        CurrencyManager manager = new CurrencyManager();

        [HttpGet]
        public Currency GetCurrency(int currencyId)
        {
            return manager.GetCurrency(currencyId, true);
        }

        [HttpGet]
        public List<CurrencyInfo> GetCurrencyInfos()
        {
            return manager.GetCurrencyInfos();
        }

        [HttpGet]
        public List<Currency> GetFilteredCurrencies(string serializedInput)
        {
            CurrencyFilter filter = JsonConvert.DeserializeObject<CurrencyFilter>(serializedInput);
            return manager.GetFilteredCurrencies(filter);
        }

        [HttpPost]
        public long AddCurrency(CurrencyToAdd currencyToAdd)
        {
            return manager.AddCurrency(currencyToAdd);
        }

        [HttpPost]
        public bool EditCurrency(Currency currency)
        {
            return manager.EditCurrency(currency);
        }
    }
}