using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entities;
using Repository;

namespace AngularJsMVCmongoDB.Controllers
{
    public class DefaultController : Controller
    {
        IRepository<SampleTestCollection> _repoSampleTC;

        public DefaultController() {
            _repoSampleTC = new MongoDbRepository<SampleTestCollection>();
        }

        // GET: Default
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getData()
        {
            List<SampleTestCollection> _dataList = new List<SampleTestCollection>();
            try
            {
                 _dataList = _repoSampleTC.GetAll().ToList();
            }
            catch (Exception ex)
            {
                return Json(new { status = 400, message = "Error : " + ex }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { data = _dataList, status = 200, message = "Valid" }, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult AddSample(SampleTestCollection _sample)
        {
            try
            {
                if (_sample != null)
                {
                    _repoSampleTC.Insert(_sample);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 400, message = "Error : "  + ex }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = 200, message = "Added Successfully" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateSample(SampleTestCollection _sample)
        {
            try
            {
                if(_sample != null) { 
                    _repoSampleTC.Update(_sample);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 400, message = "Error : " + ex }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = 200, message = "Updated Successfully" }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteSample(SampleTestCollection _sample)
        {
            try
            {
                if (_sample != null)
                {
                    _repoSampleTC.Delete(_sample);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 400, message = "Error : " + ex }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { status = 200, message = "Deleted Successfully" }, JsonRequestBehavior.AllowGet);
        }

    }
}