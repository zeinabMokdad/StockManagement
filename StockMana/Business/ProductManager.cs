using StockMana.DataAccess;
using StockMana.Entities;
using System;
using System.Collections.Generic;

namespace StockMana.Business
{
    public class ProductManager
    {
        ProductDataManager dataManager;
        CurrencyManager currencyManager;

        public ProductManager()
        {
            dataManager = new ProductDataManager();
            currencyManager = new CurrencyManager();
        }

        public Product GetProduct(long productId, bool throwExceptionIfNull)
        {
            Product product = dataManager.GetProduct(productId);
            if (throwExceptionIfNull && product == null)
                throw new Exception($"Invalid Product ID: {productId}");

            return product;
        }

        public ProductDetail GetProductToSell(string productToSell)
        {
            if (string.IsNullOrEmpty(productToSell))
                return null;

            string[] splittedInput = productToSell.Split('*');
            string barcode;
            int quantity = 1;
            switch (splittedInput.Length)
            {
                case 1:
                    barcode = splittedInput[0];
                    break;

                case 2:
                    if (!int.TryParse(splittedInput[0], out quantity))
                        return null;
                    barcode = splittedInput[1];
                    break;

                default:
                    return null;
            }

            Product product = dataManager.GetProduct(barcode);
            if (product == null)
                return null;

            ProductDetail productDetail = ProductDetailMapper(product);
            productDetail.Quantity = quantity;

            return productDetail;
        }

        public List<ProductInfo> GetProductInfos()
        {
            List<Product> products = dataManager.GetFilteredProducts(null);
            if (products == null)
                return null;

            List<ProductInfo> productInfos = new List<ProductInfo>();
            foreach (Product product in products)
            {
                productInfos.Add(ProductInfoMapper(product));
            }
            return productInfos;
        }

        public List<ProductDetail> GetFilteredProducts(ProductFilter filter)
        {
            List<Product> products = dataManager.GetFilteredProducts(filter);
            if (products == null)
                return null;

            List<ProductDetail> filteredProducts = new List<ProductDetail>();
            foreach (Product product in products)
            {
                filteredProducts.Add(ProductDetailMapper(product));
            }
            return filteredProducts;
        }

        public bool EditProduct(Product product)
        {
            return dataManager.EditProduct(product);
        }

        public long AddProduct(ProductToAdd productToAdd)
        {
            return dataManager.AddProduct(productToAdd);
        }

        public void AdjustProductQuantity(long productId, int quantity)
        {
            dataManager.AdjustProductQuantity(productId, quantity);
        }

        private ProductDetail ProductDetailMapper(Product product)
        {
            Currency currency = currencyManager.GetCurrency(product.CurrencyID, true);

            return new ProductDetail()
            {
                Barcode = product.Barcode,
                ID = product.ID,
                Name = product.Name,
                Price = product.Price,
                CurrencyID = product.CurrencyID,
                CurrencyDescription = currency.Symbol,
                Quantity = product.Quantity
            };
        }

        private ProductInfo ProductInfoMapper(Product product)
        {
            return new ProductInfo()
            {
                ID = product.ID,
                Name = product.Name
            };
        }
    }
}