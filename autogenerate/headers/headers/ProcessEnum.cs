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
    class ProcessEnum
    {
        public void convertHeader(string path, string file)
        {
            generateCS(file, Path.Combine(path, "source", file + ".h"), Path.Combine(path, file + ".cs"));
            generateJS(file, Path.GetFullPath(Path.Combine(path, @"..\..\..\lib\flags")));
        }

        void generateCS(string file, string sourceH, string destinationCS)
        {
            using (StreamWriter sw = new StreamWriter(destinationCS))
            {
                string sourcestring = File.ReadAllText(sourceH);

                Regex re = new Regex(@"(typedef\senum\s(.*?)\{(.*?)\})", RegexOptions.Singleline);
                MatchCollection mc = re.Matches(sourcestring);

                sw.WriteLine("namespace " + file + "\n{");
                foreach (Match m in mc)
                {
                    string name = m.Groups[2].Value.Trim();

                    if (name == "OMX_BOOL") continue;

                    string items = m.Groups[3].Value;
                    Console.WriteLine(name); // Struct name
                    Console.WriteLine(items); // items

                    items = items.Replace("(OMX_S32)", "");
                    items = items.Replace(" = OMX_IMAGE_CodingKhronosExtensions", " = 0x6F000000");
                    items = items.Replace(" = OMX_EventKhronosExtensions", " = 0x6F000000");
                    items = items.Replace(" = OMX_IndexKhronosExtensions", " = 0x6F000000");
                    items = items.Replace("(OMX_ErrorKhronosExtensions", "(0x8F000000");
                    items = items.Replace(" = OMX_VIDEO_CodingKhronosExtensions", " = 0x6F000000");

                    items = Regex.Replace(items, "#define.*?\n", "");
                    items = Regex.Replace(items, "#ifdef.*?\n", "");
                    items = Regex.Replace(items, "#ifndef.*?\n", "");
                    items = Regex.Replace(items, "#endif.*?\n", "");

                    sw.WriteLine();
                    sw.WriteLine("  enum " + name + " : long");
                    sw.WriteLine("  {");
                    sw.WriteLine(items);
                    sw.WriteLine("  };");
                }
                sw.WriteLine("\n}");
            }
        }
        void generateJS(string file, string destinationFolder)
        {
            var allClasses = GetClasses(file);
            if (allClasses.Count == 0) return;

            using (StreamWriter sw = new StreamWriter(Path.Combine(destinationFolder, file.Replace("OMX_", "") + ".ts")))
            {
                foreach (Type clazz in allClasses)
                {
                    MemberInfo[] memberInfos = clazz.GetMembers(BindingFlags.Public | BindingFlags.Static);
                    Array enumValues = Enum.GetValues(clazz);

                    sw.WriteLine("export enum " + clazz.Name + " {");
                    for (int i = 0; i < memberInfos.Length; i++)
                    {
                        sw.Write("  {0} = 0x{1:X}", memberInfos[i].Name, (long)enumValues.GetValue(i));
                        if (i < memberInfos.Length - 1)
                        {
                            sw.WriteLine(",");
                        }
                    }
                    sw.WriteLine("\n}");
                }
            }
        }

        List<Type> GetClasses(string nameSpace)
        {
            Assembly asm = Assembly.GetExecutingAssembly();

            List<Type> namespacelist = new List<Type>();

            foreach (Type type in asm.GetTypes())
            {
                if (type.Namespace == nameSpace)
                {
                    namespacelist.Add(type);
                }
            }

            return namespacelist;
        }
    }
}
