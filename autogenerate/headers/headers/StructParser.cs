using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace headers
{
    public class CField
    {
        public string type;
        public string name;
        public string comment;

        public CField(string type, string name, string comment)
        {
            this.type = type;
            this.name = name;
            this.comment = Regex.Replace(comment.Replace("*", " "), @"\s+", @" ");
        }

        // override object.Equals
        public override bool Equals(object obj)
        {
            CField o = (CField)obj;
            return type == o.type && name == o.name && comment == o.comment;
        }

        public string reference
        {
            get
            {
                return comment.Replace("reference: ", "").Replace("reference : ", "").Replace("(read only)", "").Replace("(write only)", "").Trim();
            }
        }
    }
    public class CStruct
    {
        public string name;
        public List<CField> fields = new List<CField>();

        public CStruct(string name)
        {
            this.name = name;
        }
    }
    public class StructParser
    {
        static string Callback(Match match)
        {
            string str = "/*" + match.Groups[1].Value + "*/";
            return Regex.Replace(str, @"\n", "", RegexOptions.Singleline);
        }
        public static List<CStruct> parse(string sourcestring, string type)
        {
            List<CStruct> cslist = new List<CStruct>();

            Regex re = new Regex(@"(typedef\s" + type + @"\s([^;]*?)\{(.*?)\})", RegexOptions.Singleline);
            MatchCollection mc = re.Matches(sourcestring);

            foreach (Match m in mc)
            {
                string name = m.Groups[2].Value.Trim();

                CStruct cs = new CStruct(name);

                string itemsStr = m.Groups[3].Value;

                string itemsOneLine = Regex.Replace(itemsStr, @"\/\*(.*?)\*\/", Callback, RegexOptions.Singleline);

                string[] items = itemsOneLine.Split(new char[] { '\n' });

                foreach (string item in items)
                {
                    string itemTrimmed = item.Trim();
                    if (itemTrimmed.Length == 0) continue;

                    CField cf = parseLine(itemTrimmed);
                    if (cf != null)
                    {
                        cs.fields.Add(cf);
                    }
                    else
                    {
                        //Console.WriteLine("{0} is null", itemTrimmed);
                    }
                }

                cslist.Add(cs);
            }
            return cslist;
        }

        private static string trim(string inp)
        {
            return inp.Trim().TrimStart(new char[] { '*', '<' }).Trim();
        }
        public static CField parseLine(string line)
        {
            line = line.Trim();

            if (line.StartsWith("/*") && line.EndsWith("*/")) return null;

            {
                Regex re = new Regex(@"^(\w*?)(\s=.*?)?,(\s*\/\*(.*?)\*\/)*", RegexOptions.Singleline);
                MatchCollection mc = re.Matches(line);

                if (mc.Count > 0)
                {
                    foreach (Match m in mc)
                    {
                        string name = m.Groups[1].Value.Trim();
                        string comment = trim(m.Groups[4].Value);
                        return new CField("", name, comment);
                    }
                }
            }
            {
                Regex re = new Regex(@"^(.*?)\s(.*?);(\s*\/\*(.*?)\*\/)*", RegexOptions.Singleline);
                MatchCollection mc = re.Matches(line);

                if (mc.Count > 0)
                {
                    foreach (Match m in mc)
                    {
                        string type = m.Groups[1].Value.Trim();
                        string name = m.Groups[2].Value.Trim();
                        if (name == "OMX_STATETYPE* pState)")
                        {
                            Console.WriteLine(name);
                        }
                        string comment = trim(m.Groups[4].Value);
                        Console.WriteLine("CField");
                        return new CField(type, name, comment);
                    }
                }
            }
            {
                Regex re = new Regex(@"(.*?)=.*?", RegexOptions.Singleline);
                MatchCollection mc = re.Matches(line);

                if (mc.Count > 0)
                {
                    foreach (Match m in mc)
                    {
                        string name = m.Groups[1].Value.Trim();
                        return new CField("", name, "");
                    }
                }
            }
            return null;
        }
    }
}
