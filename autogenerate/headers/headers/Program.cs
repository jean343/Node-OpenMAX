using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace headers
{
    class Program
    {
        static void Main(string[] args)
        {
            ProcessEnum processEnum = new ProcessEnum();
            // Assume we are in the Debug folder
            string appFolder = Path.GetFullPath(AppDomain.CurrentDomain.BaseDirectory + @"..\..\");

            string[] files = Directory.GetFiles(Path.Combine(appFolder, "source"), "*.h");
            foreach (string file in files)
            {
                processEnum.convertHeader(appFolder, Path.GetFileNameWithoutExtension(file));
            }

            Console.ReadKey();
        }
    }
}
