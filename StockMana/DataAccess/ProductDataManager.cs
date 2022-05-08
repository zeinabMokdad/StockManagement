using StockMana.Entities;
using System.Collections.Generic;
using System.Data;

namespace StockMana.DataAccess
{
    public class ProductDataManager : BaseDataManager
    {
        public long AddProduct(ProductToAdd product)
        {
            return ExecuteNonQuerySP("sp_Product_Add", product.Name, product.Barcode, product.Price, product.Quantity, product.CurrencyID);
        }

        public bool EditProduct(Product product)
        {
            return ExecuteNonQuerySP("sp_Product_Update", product.ID, product.Name, product.Barcode, product.Price, product.Quantity, product.CurrencyID) > 0;
        }

        public void AdjustProductQuantity(long productId, int quantity)
        {
            ExecuteNonQuerySP("sp_Product_AdjustQuantity", productId, quantity);
        }

        public Product GetProduct(long productId)
        {
            return ExecuteReaderItemSP("sp_Product_GetById", ProductMapper, productId);
        }

        public Product GetProduct(string barcode)
        {
            return ExecuteReaderItemSP("sp_Product_GetByBarcode", ProductMapper, barcode);
        }

        public List<Product> GetFilteredProducts(ProductFilter filter)
        {
            string nameFilter = null;
            string barcodeFilter = null;
            if (filter != null)
            {
                nameFilter = filter.Name;
                barcodeFilter = filter.Barcode;
            }

            return ExecuteReaderListSP("sp_Product_GetAll", ProductMapper, barcodeFilter, nameFilter);
        }

        private Product ProductMapper(IDataReader reader)
        {
            return new Product()
            {
                ID = (long)reader["Id"],
                Name = reader["Name"] as string,
                Barcode = reader["Barcode"] as string,
                Price = (decimal)reader["Price"],
                Quantity = (int)reader["Quantity"],
                CurrencyID = (int)reader["CurrencyId"]
            };
        }
    }
}