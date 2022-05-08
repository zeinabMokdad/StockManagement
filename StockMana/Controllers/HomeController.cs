using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StockMana.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult IndexPage()
        {
            ViewBag.Title = "Index";

            return View("~/Views/Home/IndexPage.cshtml");
        }
    }
}