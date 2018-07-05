using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LibSass.Compiler.Options;
using LibSass.Compiler;
using System.Collections;
using System.IO;
using Newtonsoft.Json;
using System.Text;
using System.IO.Compression;
using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;

namespace ThemeStudio.Controllers
{
    public class HomeController : Controller
    {
        public class GZipOrDeflateAttribute : ActionFilterAttribute
        {
            public override void OnActionExecuting
                 (ActionExecutingContext filterContext)
            {
                string acceptencoding = filterContext.HttpContext.Request.Headers["Accept-Encoding"];
                if (!string.IsNullOrEmpty(acceptencoding))
                {
                    acceptencoding = acceptencoding.ToLower();
                    var response = filterContext.HttpContext.Response;
                    if (acceptencoding.Contains("gzip"))
                    {
                        response.AppendHeader("Content-Encoding", "gzip");
                        response.Filter = new GZipStream(response.Filter,
                                              CompressionMode.Compress);
                    }
                    else if (acceptencoding.Contains("deflate"))
                    {
                        response.AppendHeader("Content-Encoding", "deflate");
                        response.Filter = new DeflateStream(response.Filter,
                                          CompressionMode.Compress);
                    }
                }
            }
        }
        public class ThemeProperties
        {
            public string theme { get; set; }
            public IDictionary<string, string> properties { get; set; }

            public string[] dependency { get; set; }

            public string[]   components { get; set; }

            public string file { get; set; }
            public string compatiblity { get; set; }
        }
        public static String GetTimestamp(DateTime value)
        {
            return value.ToString("yyyyMMddHHmmssffff");
        }
        [GZipOrDeflate]
        public string ThemeChange(ThemeProperties color)
        {
            var sourcepath = "";
            string changes = "";
            var propertieskey = (color.properties.Keys);
            string timeStamp = "";
            timeStamp = GetTimestamp(DateTime.Now);
            string[] keys = (propertieskey as IEnumerable).Cast<object>().Select(x => x.ToString()).ToArray();
            for (var i = 0; i < keys.Length; i++)
            {
                string value = color.properties[keys[i]];
                changes = changes + (keys[i] + ":" + value) + ";\n";
            }

            string theme = (color.GetType().GetProperty("theme").GetValue(color, null)) as string;
            string basePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString();
            var path = basePath + "ej2-resource/styles/";
            var templatepath = basePath + "template/";
            string templatefile = System.IO.File.ReadAllText(templatepath + theme + ".txt");
            templatefile = templatefile.Replace("{{:common}}", changes as string);
            string filecontent = "";
            filecontent = filecontent + templatefile;
            filecontent = filecontent + System.IO.File.ReadAllText(path + "/all" + theme + ".scss");
            var outputdir = basePath + "resource/styles/";
            string ScssFilePath = outputdir + timeStamp;
            System.IO.Directory.CreateDirectory(ScssFilePath);
            sourcepath = ScssFilePath + "/" + theme + ".scss";
            
            System.IO.File.WriteAllText(sourcepath,  filecontent);
            
            string result = sasscompiler(sourcepath);

            //delete all existing files and directories.
            sourcepath = ScssFilePath + "/" + theme + ".css";
            System.IO.File.WriteAllText(sourcepath, result);
            if (Directory.Exists(outputdir))
            {
                Directory.Delete(outputdir, true);
            }

            return result;


        }
       
        public string export(ThemeProperties exporting)
        {
            String timeStamp = "";
            var sourcepath = "";
            var bytes = new byte[4];
            var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
            rng.GetBytes(bytes);
            uint random = BitConverter.ToUInt32(bytes, 0) % 100000000;
            string str= String.Format("{0:D8}", random);
            var propertieskey = (exporting.properties.Keys);
            string changes = "";
            string theme = (exporting.GetType().GetProperty("theme").GetValue(exporting, null)) as string;
            string[] keys = (propertieskey as IEnumerable).Cast<object>().Select(x => x.ToString()).ToArray();
            for (var i = 0; i < keys.Length; i++)
            {
                string value = exporting.properties[keys[i]];
                changes = changes + (keys[i] + ":" + value) + ";\n";
            }
            string filecontents = "";
            string basePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString();
            var path = basePath + "ej2-resource/styles/";
            var templatepath = basePath + "template/";
            string templatefile = System.IO.File.ReadAllText(templatepath + theme + ".txt");
            templatefile = templatefile.Replace("{{:common}}", changes as string);
            var  components = (exporting.GetType().GetProperty("components").GetValue(exporting, null));
            string[] componentsarray = (components as IEnumerable).Cast<object>().Select(x => x.ToString()).ToArray();



            /* json file content*/
            dynamic settings = new JObject();
            settings.theme = theme;
            settings["properties"] = JsonConvert.SerializeObject(exporting.properties);
            settings["components"] = JsonConvert.SerializeObject(componentsarray);
            
            /* json file end */
            var foldername = (exporting.GetType().GetProperty("file").GetValue(exporting, null)) as string; // user declare download floder name
            filecontents = filecontents + templatefile;
            var depen = (exporting.GetType().GetProperty("dependency").GetValue(exporting, null));
            string[] deps = (depen as IEnumerable).Cast<object>().Select(x => x.ToString()).ToArray();
            /* read a sass file */
            for (int i = 0; i < deps.Length; i++)
            {
                if (deps[i] == "base")
                {
                    path = path + deps[i] + "/" + theme + ".scss";
                    filecontents = filecontents + System.IO.File.ReadAllText(path);
                    
                }
                else
                {
                    String searchfilename = theme + ".scss";
                    String sourcedirectories = basePath + "ej2-resource/styles/" + deps[i] + "/";
                    String[] files = Directory.GetFiles(sourcedirectories, searchfilename, SearchOption.AllDirectories);
                    foreach (String file in files)
                    {
                        filecontents = filecontents + System.IO.File.ReadAllText(file);
                    }
                }
            }
           
            timeStamp = GetTimestamp(DateTime.Now); // timestamp creation 
            //timeStamp = "checking";
            string compatiblity = (exporting.GetType().GetProperty("compatiblity").GetValue(exporting, null)) as string;
            string outputdir = basePath + "outputs/" + foldername + '-' + timeStamp +'-'+str+ "/";
            System.IO.Directory.CreateDirectory(outputdir);
            System.IO.File.WriteAllText(outputdir + theme + ".scss", filecontents);
            sourcepath = outputdir + theme + ".scss";
            string result = sasscompiler(sourcepath);
            /* compatibility css */
            if (compatiblity == "True")
            {
                string compataibilitydir = basePath + "outputs/" + foldername + '-' + timeStamp + '-'+ str + "/compatibility/";
                System.IO.Directory.CreateDirectory(compataibilitydir);
                filecontents = filecontents.Replace("#{&}", ".e-control");
                System.IO.File.WriteAllText(compataibilitydir + theme + ".scss", "$css: '.e-css' !default;\n$imported-modules: () !default;\n" + filecontents+ "\n .e-control .e-js [class^='e-'], .e-control .e-js [class*=' e-'] {\n  box-sizing: content-box;\n }");
                sourcepath = compataibilitydir + theme + ".scss";
                string comptibilityresult = sasscompiler(sourcepath);
                System.IO.File.WriteAllText(compataibilitydir + theme + ".css", comptibilityresult);
            }

            /* creation zip file */
            string zipPath = basePath + "outputzip";
            string zipTarget = zipPath + "/" + foldername + '-' + timeStamp + '-' + str+ ".zip";
            string outputzip = "outputzip/" + foldername + '-' + timeStamp + '-' + str+ ".zip";
            System.IO.File.WriteAllText(outputdir + theme + ".css", result);
            System.IO.File.WriteAllText(outputdir + theme + ".scss", filecontents);
            string settingsJson = JsonConvert.SerializeObject(settings);
            System.IO.File.WriteAllText(outputdir + "settings.json", settingsJson);
            System.IO.Directory.CreateDirectory(zipPath);
            ZipFile.CreateFromDirectory(outputdir, zipTarget);
            if (Directory.Exists(outputdir))
            {
                Directory.Delete(outputdir, true);
            }

            return outputzip;

        }
        /* sass to css covert */
        public string sasscompiler(string sourcepath)
        {
            var options = new SassOptions
            {
                InputPath = sourcepath
            };
            var sass = new SassCompiler(options);
            var result = sass.Compile();
            return result.Output;
        }
        [GZipOrDeflate]
        public string loadtheme(ThemeProperties themes)

        {
            string theme = (themes.GetType().GetProperty("theme").GetValue(themes, null)) as string;
            string basePath = System.AppDomain.CurrentDomain.BaseDirectory.ToString();
            var path = basePath + "Content/ej2/" + theme + ".css";
            return System.IO.File.ReadAllText(path);
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}