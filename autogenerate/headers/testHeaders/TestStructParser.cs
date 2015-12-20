using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using headers;

namespace testHeaders
{
    [TestClass]
    public class TestStructParser
    {
        [TestMethod]
        public void Test1()
        {
            CField f1 = StructParser.parseLine("OMX_IndexParamPriorityMgmt,             /**< reference: OMX_PRIORITYMGMTTYPE */");
            Assert.AreEqual(f1, new CField("", "OMX_IndexParamPriorityMgmt", "reference: OMX_PRIORITYMGMTTYPE"));
        }
        [TestMethod]
        public void Test2()
        {
            CField f2 = StructParser.parseLine("OMX_BOOL bFlagErrorConcealment;  /**< Turns on error concealment if it is supported by the OMX component */");
            Assert.AreEqual(f2, new CField("OMX_BOOL", "bFlagErrorConcealment", "Turns on error concealment if it is supported by the OMX component"));
        }
        [TestMethod]
        public void Test3()
        {
            CField f3 = StructParser.parseLine("OMX_IndexAudioStartUnused = 0x04000000,");
            Assert.AreEqual(f3, new CField("", "OMX_IndexAudioStartUnused", ""));
        }
        [TestMethod]
        public void Test4()
        {
            CField f4 = StructParser.parseLine("OMX_IndexMax = 0x7FFFFFFF");
            Assert.AreEqual(f4, new CField("", "OMX_IndexMax", ""));
        }
        [TestMethod]
        public void Test5()
        {
            CField f5 = StructParser.parseLine("OMX_STRING cMIMEType;");
            Assert.AreEqual(f5, new CField("OMX_STRING", "cMIMEType", ""));
        }
        [TestMethod]
        public void Test6()
        {
            CField f6 = StructParser.parseLine("OMX_VIDEO_AVCLoopFilterEnable = 0,");
            Assert.AreEqual(f6, new CField("", "OMX_VIDEO_AVCLoopFilterEnable", ""));
        }
        [TestMethod]
        public void Test7()
        {
            CField f7 = StructParser.parseLine("OMX_U32 nSize;                    /**< Size of this structure, in Bytes */ ");
            Assert.AreEqual(f7, new CField("OMX_U32", "nSize", "Size of this structure, in Bytes"));
        }
    }
}
