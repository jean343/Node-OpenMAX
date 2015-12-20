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

            using (StreamWriter sw = new StreamWriter(Path.GetFullPath(Path.Combine(path, @"..\..\..\src", "Parameters.cpp"))))
            {
                sw.WriteLine(@"#include ""Parameters.h""

v8::Local<v8::Object> Parameters::GetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex) {
  Nan::EscapableHandleScope scope;
  v8::Local<v8::Object> ret = Nan::New<v8::Object>();

  switch (nParamIndex) {");
                writeCpp(sw, OMX_INDEXTYPE, cstruct, WriteType.get);
                sw.WriteLine(@"    default:
    break;
  }
  return scope.Escape(ret);
}");
                
                sw.WriteLine(@"void Parameters::SetParameter(OMX_HANDLETYPE *handle, int port, OMX_INDEXTYPE nParamIndex, v8::Local<v8::Object> param) {

  switch (nParamIndex) {");
                writeCpp(sw, OMX_INDEXTYPE, cstruct, WriteType.set);
                sw.WriteLine(@"
    /*case OMX_IndexParamPortDefinition:
    {
      OMX_PARAM_PORTDEFINITIONTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.eDir = (OMX_DIRTYPE) Nan::To<int>(Nan::Get(param, Nan::New(""eDir"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountActual = (int) Nan::To<int>(Nan::Get(param, Nan::New(""nBufferCountActual"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferCountMin = (int) Nan::To<int>(Nan::Get(param, Nan::New(""nBufferCountMin"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferSize = (int) Nan::To<int>(Nan::Get(param, Nan::New(""nBufferSize"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bEnabled = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New(""bEnabled"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.bPopulated = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New(""bPopulated"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eDomain = (OMX_PORTDOMAINTYPE) Nan::To<int>(Nan::Get(param, Nan::New(""eDomain"").ToLocalChecked()).ToLocalChecked()).FromJust();

      if (format.eDomain == OMX_PortDomainVideo) {
        v8::Local<v8::Object> video = Nan::To<v8::Object>(Nan::Get(param, Nan::New(""video"").ToLocalChecked()).ToLocalChecked()).ToLocalChecked();

        format.format.video.nFrameWidth = (int) Nan::To<int>(Nan::Get(video, Nan::New(""nFrameWidth"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nFrameHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New(""nFrameHeight"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nStride = (int) Nan::To<int>(Nan::Get(video, Nan::New(""nStride"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nSliceHeight = (int) Nan::To<int>(Nan::Get(video, Nan::New(""nSliceHeight"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.nBitrate = (int) Nan::To<int>(Nan::Get(video, Nan::New(""nBitrate"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.xFramerate = (int) Nan::To<int>(Nan::Get(video, Nan::New(""xFramerate"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.bFlagErrorConcealment = (OMX_BOOL) Nan::To<int>(Nan::Get(video, Nan::New(""bFlagErrorConcealment"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(video, Nan::New(""eCompressionFormat"").ToLocalChecked()).ToLocalChecked()).FromJust();
        format.format.video.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(video, Nan::New(""eColorFormat"").ToLocalChecked()).ToLocalChecked()).FromJust();
      }

      format.bBuffersContiguous = (OMX_BOOL) Nan::To<int>(Nan::Get(param, Nan::New(""bBuffersContiguous"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.nBufferAlignment = (int) Nan::To<int>(Nan::Get(param, Nan::New(""nBufferAlignment"").ToLocalChecked()).ToLocalChecked()).FromJust();

//      printf(""format.eDir: %d\n"", format.eDir);
//      printf(""format.nBufferCountActual: %d\n"", format.nBufferCountActual);
//      printf(""format.nBufferCountMin: %d\n"", format.nBufferCountMin);
//      printf(""format.nBufferSize: %d\n"", format.nBufferSize);
//      printf(""format.bEnabled: %d\n"", format.bEnabled);
//      printf(""format.bPopulated: %d\n"", format.bPopulated);
//      printf(""format.eDomain: %d\n"", format.eDomain);
//      printf(""format.bBuffersContiguous: %d\n"", format.bBuffersContiguous);
//      printf(""format.nBufferAlignment: %d\n"", format.nBufferAlignment);

      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;
    case OMX_IndexParamVideoPortFormat:
    {
      OMX_VIDEO_PARAM_PORTFORMATTYPE format;
      OMX_consts::InitOMXParams(&format, port);

      format.nIndex = (int) Nan::To<int>(Nan::Get(param, Nan::New(""nIndex"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eCompressionFormat = (OMX_VIDEO_CODINGTYPE) Nan::To<int>(Nan::Get(param, Nan::New(""eCompressionFormat"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.eColorFormat = (OMX_COLOR_FORMATTYPE) Nan::To<int>(Nan::Get(param, Nan::New(""eColorFormat"").ToLocalChecked()).ToLocalChecked()).FromJust();
      format.xFramerate = (int) Nan::To<int>(Nan::Get(param, Nan::New(""xFramerate"").ToLocalChecked()).ToLocalChecked()).FromJust();

      SetParameterTemplate(&format, port, handle, nParamIndex);
    }
      break;*/
    default:
      break;
  }
}");
            }
        }

        private void writeCpp(StreamWriter sw, CStruct OMX_INDEXTYPE, List<CStruct> cstructs, WriteType t)
        {
            foreach (CField field in OMX_INDEXTYPE.fields)
            {
                if (field.reference.Length == 0) continue;
                Console.WriteLine(field.reference);

                CStruct cstruct = cstructs.Where(a => a.name == field.reference).FirstOrDefault();
                if (cstruct == null)
                {
                    //Console.WriteLine("{0} is null",field.reference);
                }
                else
                {
                    if (t == WriteType.get)
                    {
                        writeCaseGet(sw, field.name, cstruct);
                    }
                    else
                    {
                        writeCaseSet(sw, field.name, cstruct);
                    }
                }
            }
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

                sw.WriteLine(@"      Nan::Set(ret, Nan::New(""{0}"").ToLocalChecked(), Nan::New(format.{1}));{2}", nameNoArray, fname, f.comment.Length == 0 ? "" : " // " + f.comment);
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

                sw.WriteLine(@"      format.{0} = ({1}) Nan::To<int>(Nan::Get(param, Nan::New(""{2}"").ToLocalChecked()).ToLocalChecked()).FromJust();{3}", fname, f.type, f.name, f.comment.Length == 0 ? "" : " // " + f.comment);
            }
            sw.WriteLine("");
            sw.WriteLine(@"      SetParameterTemplate(&format, handle, nParamIndex);");
            sw.WriteLine("    }");
            sw.WriteLine("      break;");
        }
    }
}