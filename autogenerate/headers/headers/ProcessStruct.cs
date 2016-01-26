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
    enum WriteType { get, set }
    class ProcessStruct
    {
        public void convertStruct(string path, List<string> files)
        {
            // Parse the enum OMX_INDEXTYPE to get the references
            CStruct OMX_INDEXTYPE = StructParser.parse(File.ReadAllText(Path.Combine(path, "source", "OMX_Index.h")), "enum").First();

            List<CStruct> cstruct = new List<CStruct>();

            foreach (string file in files)
            {
                string sourcestring = File.ReadAllText(Path.Combine(path, "source", file + ".h"));
                cstruct.AddRange(StructParser.parse(sourcestring, "struct"));
            }

            using (StreamWriter sw = new StreamWriter(Path.GetFullPath(Path.Combine(path, @"..\..\..\src", "ParametersGet.cpp"))))
            {
                sw.WriteLine(@"#include ""Parameters.h""");
                sw.WriteLine();
                writeGetterSetter(sw, cstruct, WriteType.get);
                sw.WriteLine(@"v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {");
                sw.WriteLine(@"  Nan::EscapableHandleScope scope;");
                sw.WriteLine(@"  v8::Local<v8::Object> ret = Nan::New<v8::Object>();");
                sw.WriteLine(@"");
                writeAllCasesCpp(sw, OMX_INDEXTYPE, cstruct, WriteType.get);
                sw.WriteLine(@"  return scope.Escape(ret);");
                sw.WriteLine(@"}");
            }
            using (StreamWriter sw = new StreamWriter(Path.GetFullPath(Path.Combine(path, @"..\..\..\src", "ParametersSet.cpp"))))
            {
                sw.WriteLine(@"#include ""Parameters.h""");
                sw.WriteLine();
                writeGetterSetter(sw, cstruct, WriteType.set);
                sw.WriteLine(@"void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {");
                writeAllCasesCpp(sw, OMX_INDEXTYPE, cstruct, WriteType.set);
                sw.WriteLine(@"}");
            }
        }

        private void writeGetterSetter(StreamWriter sw, List<CStruct> cstructs, WriteType t)
        {
            /*string[] whiteList = new string[] {
                "OMX_PARAM_PORTDEFINITIONTYPE" ,
                "OMX_AUDIO_PORTDEFINITIONTYPE",
                "OMX_VIDEO_PORTDEFINITIONTYPE",
                "OMX_IMAGE_PORTDEFINITIONTYPE",
                "OMX_OTHER_PORTDEFINITIONTYPE",
                "OMX_VIDEO_PARAM_PORTFORMATTYPE"
            };*/
            string[] blackList = new string[] {
                "OMX_COMPONENTTYPE",
                "OMX_COMPONENTREGISTERTYPE",
                "OMX_CALLBACKTYPE",
                "OMX_BRCMBUFFERSTATSTYPE",
                "OMX_PARAM_SOURCESEEDTYPE",
                "OMX_FACEREGIONTYPE",
                "OMX_PARAM_BRCMRECURSIONUNSAFETYPE",
                "OMX_CONFIG_LENSCALIBRATIONVALUETYPE"
            };
            foreach (CStruct cstruct in cstructs)
            {
                //if (!whiteList.Contains(cstruct.name)) continue;
                if (blackList.Contains(cstruct.name)) continue;

                if (t == WriteType.get)
                {
                    writeFunctionGetter(sw, cstruct, false);
                }
                else
                {
                    writeFunctionSetter(sw, cstruct, false);
                }
            }

            sw.WriteLine();

            foreach (CStruct cstruct in cstructs)
            {
                //if (!whiteList.Contains(cstruct.name)) continue;
                if (blackList.Contains(cstruct.name)) continue;

                if (t == WriteType.get)
                {
                    writeFunctionGetter(sw, cstruct, true);
                    sw.WriteLine();
                }
                else
                {
                    writeFunctionSetter(sw, cstruct, true);
                    sw.WriteLine();
                }
            }
        }

        private Dictionary<string, CStruct> getAllStructs(CStruct OMX_INDEXTYPE, List<CStruct> cstructs)
        {
            Dictionary<string, CStruct> res = new Dictionary<string, CStruct>();
            foreach (CField field in OMX_INDEXTYPE.fields)
            {
                if (field.reference.Length == 0) continue;

                /*tmp*/
                //if (field.name != "OMX_IndexParamPortDefinition" && field.name != "OMX_IndexParamVideoPortFormat") continue;

                CStruct cstruct = cstructs.Where(a => a.name == field.reference).FirstOrDefault();
                if (cstruct != null)
                {
                    res.Add(field.name, cstruct);
                }
            }
            return res;
        }
        private void writeAllCasesCpp(StreamWriter sw, CStruct OMX_INDEXTYPE, List<CStruct> cstructs, WriteType t)
        {
            Dictionary<string, CStruct> allStructs = getAllStructs(OMX_INDEXTYPE, cstructs);

            sw.WriteLine(@"  switch (nParamIndex) {");
            foreach (var row in allStructs)
            {
                string index = row.Key;
                CStruct cstruct = row.Value;

                if (t == WriteType.get)
                {
                    writeCaseGet(sw, index, cstruct);
                }
                else
                {
                    writeCaseSet(sw, index, cstruct);
                }
            }
            sw.WriteLine(@"    default:");
            sw.WriteLine(@"      break;");
            sw.WriteLine(@"  }");
        }
        
        private void writeFunctionGetter(StreamWriter sw, CStruct cstruct, bool writeBody)
        {
            if (cstruct.name.Length == 0)
            {
                return;
            }
            sw.Write(@"v8::Local<v8::Object> GET_" + cstruct.name + "(" + cstruct.name + " &format)");
            sw.WriteLine(writeBody ? " {" : ";");
            if (!writeBody) return;
            sw.WriteLine(@"  Nan::EscapableHandleScope scope;");
            sw.WriteLine(@"  v8::Local<v8::Object> ret = Nan::New<v8::Object>();");

            foreach (CField f in cstruct.fields)
            {
                if (f.name == "nSize" || f.name == "nVersion" || f.name == "nPortIndex") continue;

                // Remove the array info
                string nameNoArray = Regex.Replace(f.name, @"\[\w*?\]", "");

                string fname = nameNoArray;

                if (
                    f.type == "OMX_TICKS" ||
                    f.type == "OMX_BU32" ||
                    f.type == "OMX_BS32" ||
                    f.type == "OMX_FRAMESIZETYPE" ||
                    f.type == "OMX_DISPLAYRECTTYPE" ||
                    f.type == "OMX_PTR" ||
                    f.type == "OMX_PTR" ||
                    f.type == "OMX_TUNNELSETUPTYPE" ||
                    f.type == "OMX_BRCM_POOL_T" ||
                    f.type == "struct" ||
                    f.type == "OMX_BRCM_PERFSTATS" ||
                    f.type == "OMX_CONFIG_LENSCALIBRATIONVALUETYPE" ||
                    f.type == "OMX_YUVCOLOUR"
                    ) continue;

                // Special code for OMX_IndexParamPortDefinition
                if (cstruct.name == "OMX_PARAM_PORTDEFINITIONTYPE" && new string[] { "audio", "video", "image", "other" }.Contains(nameNoArray))
                {
                    sw.WriteLine(@"  if (format.eDomain == OMX_PortDomain" + Utils.FirstCharToUpper(nameNoArray) + ") {");
                    sw.WriteLine(@"    Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), GET_OMX_{1}_PORTDEFINITIONTYPE(format.format.{0}));", nameNoArray, nameNoArray.ToUpper());
                    sw.WriteLine(@"  }");
                    continue;
                }

                bool canBeNull = f.type == "OMX_STRING";

                string castTo = null;
                if (f.type == "OMX_U64")
                {
                    castTo = "double";
                }

                if (canBeNull)
                {
                    sw.WriteLine(@"  if (format.{0} != NULL)", nameNoArray);
                    sw.Write("  ");
                }
                sw.WriteLine(@"  Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), Nan::New({1}format.{2}){3});{4}", nameNoArray, castTo != null ? "(" + castTo + ")" : "", fname, canBeNull ? ".ToLocalChecked()" : "", f.comment.Length == 0 ? "" : " // " + f.comment);
            }

            sw.WriteLine(@"  return scope.Escape(ret);");
            sw.WriteLine(@"}");
        }
        private void writeFunctionSetter(StreamWriter sw, CStruct cstruct, bool writeBody)
        {
            if (cstruct.name.Length == 0)
            {
                return;
            }

            sw.Write(@"void SET_" + cstruct.name + "(" + cstruct.name + " &format, v8::Local<v8::Object> param)");
            sw.WriteLine(writeBody ? " {" : ";");
            if (!writeBody) return;

            foreach (CField f in cstruct.fields)
            {
                if (f.name == "nSize" || f.name == "nVersion" || f.name == "nPortIndex") continue;

                // Remove the array info
                if (Regex.IsMatch(f.name, @"\[\w*?\]"))
                {
                    continue;
                }
                string nameNoArray = Regex.Replace(f.name, @"\[\w*?\]", "");

                if (
                    f.type == "OMX_TICKS" ||
                    f.type == "OMX_BU32" ||
                    f.type == "OMX_BS32" ||
                    f.type == "OMX_STRING" ||
                    f.type == "OMX_FRAMESIZETYPE" ||
                    f.type == "OMX_DISPLAYRECTTYPE" ||
                    f.type == "OMX_PTR" ||
                    f.type == "OMX_TUNNELSETUPTYPE" ||
                    f.type == "OMX_BRCM_POOL_T" ||
                    f.type == "struct" ||
                    f.type == "OMX_BRCM_PERFSTATS" ||
                    f.type == "OMX_CONFIG_LENSCALIBRATIONVALUETYPE" ||
                    f.type == "OMX_YUVCOLOUR"
                    ) continue;

                // Special code for OMX_IndexParamPortDefinition
                if (cstruct.name == "OMX_PARAM_PORTDEFINITIONTYPE" && new string[] { "audio", "video", "image", "other" }.Contains(nameNoArray))
                {
                    sw.WriteLine(@"  if (format.eDomain == OMX_PortDomain" + Utils.FirstCharToUpper(nameNoArray) + ") {");
                    sw.WriteLine(@"    v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New(""{0}"").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();", nameNoArray);
                    sw.WriteLine(@"    SET_OMX_{1}_PORTDEFINITIONTYPE(format.format.{0}, obj);", nameNoArray, nameNoArray.ToUpper());
                    sw.WriteLine(@"  }");
                    continue;
                }

                sw.WriteLine(@"  format.{1} = ({0}) Nan::To<int>(Nan::Get(param, Nan::New(""{1}"").ToLocalChecked()).ToLocalChecked()).FromJust();{2}", f.type, nameNoArray, f.comment.Length == 0 ? "" : " // " + f.comment);
            }
            sw.WriteLine(@"}");
        }


        private void writeCaseGet(StreamWriter sw, string indexName, CStruct cstruct)
        {
            if (indexName == "OMX_IndexParamBrcmRecursionUnsafe") return;

            sw.WriteLine("    case {0}:", indexName);
            sw.WriteLine("    {");

            sw.WriteLine("      {0} format;", cstruct.name);

            bool hasPort = cstruct.fields.Any(a => a.name == "nPortIndex");
            string hasPortStr = hasPort ? ", port" : "";

            sw.WriteLine("      GetParameterTemplate(&format{0}, handle, nParamIndex);", hasPortStr);

            sw.WriteLine("      return scope.Escape(GET_{0}(format));", cstruct.name);

            sw.WriteLine("    }");
            sw.WriteLine("      break;");
        }

        private void writeCaseSet(StreamWriter sw, string indexName, CStruct cstruct)
        {
            if (indexName == "OMX_IndexParamBrcmRecursionUnsafe") return;

            sw.WriteLine("    case {0}:", indexName);
            sw.WriteLine("    {");

            sw.WriteLine("      {0} format;", cstruct.name);

            bool hasPort = cstruct.fields.Any(a => a.name == "nPortIndex");
            string hasPortStr = hasPort ? ", port" : "";
            
            sw.WriteLine("      OMX_consts::InitOMXParams(&format{0});", hasPortStr);

            sw.WriteLine("      SET_{0}(format, param);", cstruct.name);

            sw.WriteLine("");
            sw.WriteLine(@"      SetParameterTemplate(&format, handle, nParamIndex);");
            sw.WriteLine("    }");
            sw.WriteLine("      break;");
        }
    }
}