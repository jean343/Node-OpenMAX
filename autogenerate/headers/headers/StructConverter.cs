using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace headers
{
    class StructConverter
    {
        private string[] blackList = new string[] {
                "OMX_COMPONENTTYPE",
                "OMX_COMPONENTREGISTERTYPE",
                "OMX_CALLBACKTYPE",
                "OMX_BRCMBUFFERSTATSTYPE",
                "OMX_PARAM_SOURCESEEDTYPE",
                "OMX_FACEREGIONTYPE",
                "OMX_PARAM_BRCMRECURSIONUNSAFETYPE",
                "OMX_CONFIG_LENSCALIBRATIONVALUETYPE"
            };

        internal CStruct convert(CStruct cStruct)
        {
            foreach (CField f in cStruct.fields)
            {
                f.comment = cleanClassName(f.comment);
                //f.originalName = cleanClassName(f.originalName);
            }
            return cStruct;
        }

        private string[] blackListType = new string[] {
                "OMX_STRING" ,
                "OMX_PTR",
                "OMX_STATICBOX" ,
                "OMX_BRCM_POOL_T" ,
                "struct" ,
                "OMX_BRCM_PERFSTATS" ,
                "OMX_CONFIG_LENSCALIBRATIONVALUETYPE",
                "OMX_FOCUSREGIONXY"
            };

        internal List<Struct> convert(List<CStruct> list, string file)
        {
            List<Struct> structs = new List<Struct>();

            foreach (CStruct cstruct in list)
            {
                if (blackList.Contains(cstruct.name)) continue;
                if (cstruct.name.Length == 0)
                {
                    continue;
                }

                var s = new Struct();

                s.originalName = cstruct.name;
                s.name = cleanClassName(cstruct.name);

                s.fields = new List<CField>();
                s.hasPort = cstruct.fields.Any(a => a.originalName == "nPortIndex");
                foreach (CField f in cstruct.fields)
                {
                    if (f.originalName == "nSize" || f.originalName == "nVersion" || f.originalName == "nPortIndex") continue;
                    if (blackListType.Contains(f.type)) continue;

                    // Remove the array info
                    if (Regex.IsMatch(f.omxName, @"\[\w*?\]"))
                    {
                        f.canBeSet = false;
                    }

                    if (file != "OMX_Broadcom" && !Char.IsDigit(f.name[1]) && !(s.name == "IMAGE_PARAM_HUFFMANTTABLETYPE"))
                    {
                        //f.name = Char.ToLowerInvariant(f.name[1]) + f.name.Substring(2);
                    }
                    
                    switch (f.type)
                    {
                        case "OMX_U64":
                            f.castTo = "(double)";
                            break;
                        case "OMX_BOOL":
                            f.castTo = "!!";
                            break;
                    }

                    f.canBeNull = f.type == "OMX_STRING";
                    f.originalType = f.type;
                    f.type = cleanClassName(f.type);
                    f.typeTS = typeToTypescript(f.type);

                    s.fields.Add(f);
                }

                structs.Add(s);
            }

            return structs;
        }

        public static string cleanClassName(string input)
        {
            return input.Replace("OMX_", "");
        }

        private string typeToTypescript(string cType)
        {
            cType = cType.TrimEnd(new char[] { '*' });
            switch (cType)
            {
                case "U8":
                case "U16":
                case "U32":
                case "S8":
                case "S16":
                case "S32":
                    return "number";
                case "BOOL":
                    return "boolean";
                case "NATIVE_DEVICETYPE":
                case "BUFFERADDRESSHANDLETYPE":
                case "HANDLETYPE":
                case "NATIVE_WINDOWTYPE":
                case "BRCMBUFFERSTATSTYPE":
                case "FACEREGIONTYPE":
                case "CAMERARXUNPACKYPE":
                    return null;
                default:
                    return "omx." + cType;
            }
        }
    }

    internal class Struct
    {
        public string name;
        public List<CField> fields = new List<CField>();
        internal bool hasPort;
        internal string originalName;
    }
}