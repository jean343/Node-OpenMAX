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
            foreach (CStruct cstruct in cstructs)
            {
                /*tmp*/
                if (cstruct.name != "OMX_PARAM_PORTDEFINITIONTYPE" &&
                    cstruct.name != "OMX_AUDIO_PORTDEFINITIONTYPE" &&
                    cstruct.name != "OMX_VIDEO_PORTDEFINITIONTYPE" &&
                    cstruct.name != "OMX_IMAGE_PORTDEFINITIONTYPE" &&
                    cstruct.name != "OMX_OTHER_PORTDEFINITIONTYPE" &&
                    cstruct.name != "OMX_VIDEO_PARAM_PORTFORMATTYPE") continue;

                if (t == WriteType.get)
                {
                    writeFunctionGetter(sw, cstruct);
                    sw.WriteLine();
                }
                else
                {
                    writeFunctionSetter(sw, cstruct);
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
                if (field.name != "OMX_IndexParamPortDefinition" && field.name != "OMX_IndexParamVideoPortFormat") continue;

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
        
        private void writeFunctionGetter(StreamWriter sw, CStruct cstruct)
        {
            sw.WriteLine(@"v8::Local<v8::Object> GET_" + cstruct.name + "(" + cstruct.name + " &format) {");
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
                    f.type == "OMX_STRING" ||
                    f.type == "OMX_FRAMESIZETYPE" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == ""
                    ) continue;

                if (cstruct.name == "OMX_PARAM_PORTDEFINITIONTYPE" && (
                    fname == "audio" ||
                    fname == "video" ||
                    fname == "image" ||
                    fname == "other"
                    ))
                {
                    continue;
                    fname = "format." + fname;
                }

                sw.WriteLine(@"  Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), Nan::New(format.{1}));{2}", nameNoArray, fname, f.comment.Length == 0 ? "" : " // " + f.comment);
            }

            sw.WriteLine(@"  return scope.Escape(ret);");
            sw.WriteLine(@"}");
        }
        private void writeFunctionSetter(StreamWriter sw, CStruct cstruct)
        {
            sw.WriteLine(@"void SET_" + cstruct.name + "(" + cstruct.name + " &format, v8::Local<v8::Object> obj) {");

            foreach (CField f in cstruct.fields)
            {
                if (f.name == "nSize" || f.name == "nVersion" || f.name == "nPortIndex") continue;

                // Remove the array info
                if (Regex.IsMatch(f.name, @"\[\w*?\]"))
                {
                    continue;
                }

                string fname = f.name;

                if (
                    f.type == "OMX_TICKS" ||
                    f.type == "OMX_BU32" ||
                    f.type == "OMX_BS32" ||
                    f.type == "OMX_STRING" ||
                    f.type == "OMX_FRAMESIZETYPE" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == ""
                    ) continue;

                if (cstruct.name == "OMX_PARAM_PORTDEFINITIONTYPE" && (
                    f.name == "audio" ||
                    f.name == "video" ||
                    f.name == "image" ||
                    f.name == "other"
                    ))
                {
                    continue;
                    fname = "format." + fname;
                }

                sw.WriteLine(@"  format.{0} = ({1}) Nan::To<int>(Nan::Get(obj, Nan::New(""{2}"").ToLocalChecked()).ToLocalChecked()).FromJust();{3}", fname, f.type, f.name, f.comment.Length == 0 ? "" : " // " + f.comment);
            }
            sw.WriteLine(@"}");
        }


        private void writeCaseGet(StreamWriter sw, string indexName, CStruct cstruct)
        {
            sw.WriteLine("    case {0}:", indexName);
            sw.WriteLine("    {");

            sw.WriteLine("      {0} format;", cstruct.name);
            if (cstruct.fields.Any(a => a.name == "nPortIndex"))
            {
                sw.WriteLine("      GetParameterTemplate(&format, port, handle, nParamIndex);");
            }
            else
            {
                sw.WriteLine("      GetParameterTemplate(&format, handle, nParamIndex);");
            }
            foreach (CField f in cstruct.fields)
            {
                if (f.name == "nSize" || f.name == "nVersion" || f.name == "nPortIndex") continue;

                // Remove the array info
                string nameNoArray = Regex.Replace(f.name, @"\[\w*?\]", "");

                if (
                    f.type == "OMX_TICKS" ||
                    f.type == "OMX_BU32" ||
                    f.type == "OMX_BS32" ||
                    f.type == "OMX_STRING" ||
                    f.type == "OMX_FRAMESIZETYPE" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == ""
                    ) continue;

                // Special code for OMX_IndexParamPortDefinition
                if (indexName == "OMX_IndexParamPortDefinition" && new string[] { "audio", "video", "image", "other" }.Contains(nameNoArray))
                {
                    sw.WriteLine(@"      if (format.eDomain == OMX_PortDomain" + Utils.FirstCharToUpper(nameNoArray) + ") {");
                    sw.WriteLine(@"        Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), GET_OMX_{1}_PORTDEFINITIONTYPE(format.format.{0}));", nameNoArray, nameNoArray.ToUpper());
                    sw.WriteLine(@"      }");
                    continue;
                }

                sw.WriteLine(@"      Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), Nan::New(format.{0}));{1}", nameNoArray, f.comment.Length == 0 ? "" : " // " + f.comment);
            }
            sw.WriteLine("    }");
            sw.WriteLine("      break;");
        }

        private void writeCaseSet(StreamWriter sw, string indexName, CStruct cstruct)
        {
            sw.WriteLine("    case {0}:", indexName);
            sw.WriteLine("    {");

            sw.WriteLine("      {0} format;", cstruct.name);

            bool hasPort = cstruct.fields.Any(a => a.name == "nPortIndex");
            string hasPortStr = hasPort ? ", port" : "";
            
            sw.WriteLine("      OMX_consts::InitOMXParams(&format{0});", hasPortStr);

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
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == "" ||
                    f.type == ""
                    ) continue;

                // Special code for OMX_IndexParamPortDefinition
                if (indexName == "OMX_IndexParamPortDefinition" && new string[] { "audio", "video", "image", "other" }.Contains(nameNoArray))
                {
                    sw.WriteLine(@"      if (format.eDomain == OMX_PortDomain" + Utils.FirstCharToUpper(nameNoArray) + ") {");
                    sw.WriteLine(@"        v8::Local<v8::Object> obj = Nan::To<v8::Object>(Nan::Get(param, Nan::New(""{0}"").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();", nameNoArray);
                    sw.WriteLine(@"        SET_OMX_{1}_PORTDEFINITIONTYPE(format.format.{0}, obj);", nameNoArray, nameNoArray.ToUpper());
                    sw.WriteLine(@"      }");
                    continue;
                }

                sw.WriteLine(@"      format.{1} = ({0}) Nan::To<int>(Nan::Get(param, Nan::New(""{1}"").ToLocalChecked()).ToLocalChecked()).FromJust();{2}", f.type, nameNoArray, f.comment.Length == 0 ? "" : " // " + f.comment);
            }
            sw.WriteLine("");
            sw.WriteLine(@"      SetParameterTemplate(&format, handle, nParamIndex);");
            sw.WriteLine("    }");
            sw.WriteLine("      break;");
        }
    }
}