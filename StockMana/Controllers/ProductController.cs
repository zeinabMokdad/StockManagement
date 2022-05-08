using MyWebProject.Business;
using MyWebProject.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Web.Http;

namespace MyWebProject.Controllers
{
    public class ProductController : ApiController
    {
        ProductManager manager = new ProductManager();

        [HttpGet]
        public Product GetProduct(long productId)
        {
            return manager.GetProduct(productId, true);
        }

        [HttpGet]
        public ProductDetail GetProductToSell(string productToSell)
        {
            return manager.GetProductToSell(productToSell);
        }

        [HttpGet]
        public List<ProductInfo> GetProductInfos()
        {
            return manager.GetProductInfos();
        }

        [HttpGet]
        public List<ProductDetail> GetFilteredProducts(string serializedInput)
        {
            ProductFilter filter = JsonConvert.DeserializeObject<ProductFilter>(serializedInput);
            return manager.GetFilteredProducts(filter);
        }

        [HttpPost]
        public long AddProduct(ProductToAdd productToAdd)
        {
            return manager.AddProduct(productToAdd);
        }

        [HttpPost]
        public bool EditProduct(Product product)
        {
            return manager.EditProduct(product);
        }
    }
}