///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) 2006-2009 by Oliver Schneider (assarbad.net)
/// This software is provided 'as-is', without any express or implied warranty.
/// In no event will the authors be held liable for any damages arising from
/// the use of this software.
///
/// Permission is granted to anyone to use this software for any purpose,
/// including commercial applications, and to alter it and redistribute it
/// freely, subject to the following restrictions:
///
///   1. The origin of this software must not be misrepresented; you must not
///      claim that you wrote the original software. If you use this software
///      in a product, an acknowledgment in the product documentation would be
///      appreciated but is not required.
///
///   2. Altered source versions must be plainly marked as such, and must not
///      be misrepresented as being the original software.
///
///   3. This notice may not be removed or altered from any source distribution.
///
/// -----
///
/// Original filename: default.js
/// Project          : DDKWizard
/// Date of creation : 2006-09-22
/// Author(s)        : Oliver Schneider
///
/// Purpose          : This file does all the "magic" stuff required to create
///                    a customized DDKBUILD project.
///                    Documentation for "wizard" under "IVCWizCtlUI" and
///                    "VCWizCtlClass"
///
/// Revisions:
///  0010 [2009-11-24] Added variables for Windows 7 WDK
///  0009 [2007-09-08] Removed variable PROJECT_NAME_UPPERCASE.
///  0008 [2007-09-07] Added variable PROJECT_FILENAME (for .c and .cpp),
///                    PROJECT_NAME_UPPERCASE.
///  0007 [2007-02-04] UNICODE and _UNICODE symbol defined for Win32 projects
///  0006 [2007-01-03] Added NTDDI_VERSION define
///  0005 [2006-12-25] Added defines to the VS 2005 projects, fixed compat.
///                    issue with VS 2003
///  0004 [2006-12-15] PREfast option enhanced. Introduced option to choose
///                    64bit platform (Intel and/or AMD)
///  0003 [2006-11-26] PREfast option.
///  0002 [2006-10-02] Minor fix.
///  0001 [2006-10-01] Compatibility with VS 2003.
///  0000 [2006-09-24] Initial revision.
///
///////////////////////////////////////////////////////////////////////////////

var thePrefastOption = new Array("", "prefast");
var theDDKs = new Array("WXP", "WNET", "WLH", "W7");
var theCfgsName = new Array("free", "checked", "free (PREfast)", "checked (PREfast)");
var theCfgsCmdline = new Array("free .", "checked .", "free .", "checked .");
var theCfgsPrefast = new Array("", "", " -prefast", " -prefast");
var BuildCommandLine = new Array(
		"W7",
		"W7I64",
		"W7X64",
		"W7LH",
		"W7LHI64",
		"W7LHX64",
		"W7NET",
		"W7NETI64",
		"W7NETX64",
		"W7XP",

		"WLH",
		"WLH2K",
		"WLHXP",
		"WLHXP64",
		"WLHNET",
		"WLHNETI64",
		"WLHNETX64",
		"WLHI64",
		"WLHX64",

		"WNET",
		"WNET64",
		"WNETXP",
		"WNETXP64",
		"WNETAMD64",
		"WNET2K",

		"WXP",
		"WXP64",
		"WXP2K"
	);
var BuildIncPath = new Array(
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",

		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",
		"\\",

		"\\wnet\\",
		"\\wnet\\",
		"\\wxp\\",
		"\\wxp\\",
		"\\wnet\\",
		"\\w2k\\",

		"",
		"",
		""
	);
// 0 = 32bit, 1 = AMD64, 2 = IA64
var Build64bit = new Array(
		0, // W7
		2, // W7I64
		1, // W7X64
		0, // W7LH
		2, // W7LHI64
		1, // W7LHX64
		0, // W7NET
		2, // W7NETI64
		1, // W7NETX64
		0,  // W7XP

		0, // WLH
		0, // WLH2K
		0, // WLHXP
		2, // WLHXP64
		0, // WLHNET
		2, // WLHNETI64
		1, // WLHNETX64
		2, // WLHI64
		1, // WLHX64

		0, // WNET
		2, // WNET64
		0, // WNETXP
		2, // WNETXP64
		1, // WNETAMD64
		0, // WNET2K

		0, // WXP
		2, // WXP64
		0  // WXP2K
	);

var BuildDefines = new Array(
		"WINVER=0x0601;NTDDI_VERSION=0x06010000", // W7
		"WINVER=0x0601;NTDDI_VERSION=0x06010000;_WIN64", // W7I64
		"WINVER=0x0601;NTDDI_VERSION=0x06010000;_WIN64", // W7X64
		"WINVER=0x0600;NTDDI_VERSION=0x06000100", // W7LH
		"WINVER=0x0600;NTDDI_VERSION=0x06000100;_WIN64", // W7LHI64
		"WINVER=0x0600;NTDDI_VERSION=0x06000100;_WIN64", // W7LHX64
		"WINVER=0x0502;NTDDI_VERSION=0x05020100", // W7NET
		"WINVER=0x0502;NTDDI_VERSION=0x05020100;_WIN64", // W7NETI64
		"WINVER=0x0502;NTDDI_VERSION=0x05020100;_WIN64", // W7NETX64
		"WINVER=0x0501;NTDDI_VERSION=0x05010200", // W7XP

		"WINVER=0x0600;NTDDI_VERSION=0x06000000", // WLH
		"WINVER=0x0500;NTDDI_VERSION=0x05000400", // WLH2K
		"WINVER=0x0501;NTDDI_VERSION=0x05010200", // WLHXP
		"WINVER=0x0501;NTDDI_VERSION=0x05010200;_WIN64", // WLHXP64
		"WINVER=0x0502;NTDDI_VERSION=0x05020100", // WLHNET
		"WINVER=0x0502;NTDDI_VERSION=0x05020100;_WIN64", // WLHNETI64
		"WINVER=0x0502;NTDDI_VERSION=0x05020100;_WIN64", // WLHNETX64
		"WINVER=0x0600;NTDDI_VERSION=0x06000000;_WIN64", // WLHI64
		"WINVER=0x0600;NTDDI_VERSION=0x06000000;_WIN64",  // WLHX64

		"WINVER=0x0502", // WNET
		"WINVER=0x0502;_WIN64", // WNET64
		"WINVER=0x0501", // WNETXP
		"WINVER=0x0501;_WIN64", // WNETXP64
		"WINVER=0x0502;_WIN64", // WNETAMD64
		"WINVER=0x0500", // WNET2K

		"WINVER=0x0500", // WXP
		"WINVER=0x0500;_WIN64", // WXP64
		"WINVER=0x0501" // WXP2K
	);

///////////////////////////////////////////////////////////////////////////////
///
/// Gets the current date in ISO format (YYYY-MM-DD)
///
///////////////////////////////////////////////////////////////////////////////
function MyGetIsoDate()
{
	var date = new Date();
	var temp = 0;
	var retValue = "";
	temp = date.getYear();
	if(temp < 1000)
	{
		retValue += "0";
	}
	retValue += temp + "-";
	temp = date.getMonth() + 1;
	if(temp < 10)
	{
		retValue += "0";
	}
	retValue += temp + "-";
	temp = date.getDate();
	if(temp < 10)
	{
		retValue += "0";
	}
	retValue += temp;
	return retValue;
}

///////////////////////////////////////////////////////////////////////////////
///
/// This is a kind of main() function which gets things going once the Finish
/// button was clicked.
///
///////////////////////////////////////////////////////////////////////////////
function OnFinish(selProj, selObj)
{
	var strDDKs = wizard.FindSymbol("DDK_LISTBOX");
	try
	{
		// Retrieve some "fixed" symbols
		var strProjectPath = wizard.FindSymbol("PROJECT_PATH");
		var strProjectName = wizard.FindSymbol("PROJECT_NAME");
		var date = new Date();
		wizard.AddSymbol("PROJECT_YEAR", date.getYear());
		wizard.AddSymbol("PROJECT_DATE", MyGetIsoDate());
		wizard.AddSymbol("PROJECT_FILENAME", strProjectName + "." + ((wizard.FindSymbol("STRICTERCPP_CHECKBOX")) ? "cpp" : "c"));
		var temp = strProjectName;
		var re = /[^a-z0-9]/i;
		// Remove underscores and dashes from the project name and make it uppercase
		// (this will be used as the prefix to functions in the project)
		wizard.AddSymbol("PROJECT_PREFIX", temp.replace(re, "").toUpperCase());
		wizard.AddSymbol("VS_SOLUTION_NAME", strProjectName);

		var strProjTemplatePath = wizard.FindSymbol("PROJECT_TEMPLATE_PATH");
		var strProjTemplate = "";
		strProjTemplate = strProjTemplatePath + "\\default.vcproj";

		var Solution = dte.Solution;
		var strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
		if (wizard.FindSymbol("CLOSE_SOLUTION"))
		{
			Solution.Close();
			if (strSolutionName.length)
			{
				var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
				Solution.Create(strSolutionPath, strSolutionName);
			}
		}

		var InfFile = CreateCustomInfFile();
		// The files are added only once for all projects created!!!
		AddFilesToCustomProj(strProjectName, strProjectPath, InfFile);
		for(var i = 0; i < theDDKs.length; i++)
		{
			if(strDDKs.indexOf(i) != -1)
			try
			{
				// wizard.ReportError(strDDKs + " " + theDDKs[i] + " " + i, false);
				var strProjectNameWithExt = "";
				var strProjectDdkToUse = theDDKs[i];
				if(strProjectDdkToUse.length)
				{
					strProjectDdkToUse = "." + strProjectDdkToUse;
				}
				strProjectNameWithExt = strProjectName + strProjectDdkToUse + ".vcproj";

				var oTarget = wizard.FindSymbol("TARGET");
				var prj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
				if(prj == null)
				{
					window.alert("Could not create the project from the default ttemplate. In most cases this means that the file (" + strProjTemplate + ") does not exist!");
					continue;
				}

				AddConfig(prj, strProjectName, i);
				AddFilters(prj, strProjectName, strProjectPath, InfFile);

				prj.Object.Save();
			}
			catch(e)
			{
				throw e;
			}
			selProj = prj;
		}
		InfFile.Delete();
		// Delete the obsolete *solution* configurations
		var currcfg = Solution.SolutionBuild.SolutionConfigurations.Item("Debug");
		if(currcfg != null)
		{
			currcfg.Delete();
		}
		currcfg = Solution.SolutionBuild.SolutionConfigurations.Item("Release");
		if(currcfg != null)
		{
			currcfg.Delete();
		}
		// Set the solution configurations so that they will ignore projects which
		// do not correspond to the solution configuration
		SetSolutionConfigs(Solution);
		// Save the solution
		Solution.SaveAs(strSolutionPath + strSolutionName + ".sln");
	}
	catch(e)
	{
		if (e.description.length)
		{
			SetErrorInfo(e);
		}
		return e.number
	}
}

///////////////////////////////////////////////////////////////////////////////
///
/// Adds the filters to the given project.
///
///////////////////////////////////////////////////////////////////////////////
function AddFilters(proj, strProjectName, strProjectPath, InfFile)
{
	try
	{
		// Add the "folders" (filters) to your project
		var strSrcFilter = wizard.FindSymbol("SOURCE_FILTER");
		// First the source file filter
		var objSourceFilter = proj.Object.AddFilter("Source Files");
		objSourceFilter.Filter = strSrcFilter;
		strSrcFilter = wizard.FindSymbol("HEADER_FILTER");
		// Then the header file filter
		var objHeaderFilter = proj.Object.AddFilter("Header Files");
		objHeaderFilter.Filter = strSrcFilter;
		strSrcFilter = wizard.FindSymbol("RESOURCE_FILTER");
		// Then the resource file filter
		var objResourceFilter = proj.Object.AddFilter("Resource Files");
		objResourceFilter.Filter = strSrcFilter;
		strSrcFilter = wizard.FindSymbol("SPECIAL_FILTER");
		// Then the special file filter
		var objSpecialFilter = proj.Object.AddFilter("Special Files");
		objSpecialFilter.Filter = strSrcFilter;

		var strTextStream = InfFile.OpenAsTextStream(1, -2);
		while (!strTextStream.AtEndOfStream)
		{
			strTpl = strTextStream.ReadLine();
			if (strTpl != "")
			{
				strName = strTpl;
				var strTarget = GetTargetName(strName, strProjectName);
				if(strTarget.length)
				{
					var strFile = strProjectPath + "\\" + strTarget;
					var re = /\.(c|cpp)$/i;
					if(strTarget.match(re) != null)
					{
						objSourceFilter.AddFile(strFile);
					}
					else
					{
						var re = /\.(h|hpp)$/i;
						if(strTarget.match(re) != null)
						{
							objHeaderFilter.AddFile(strFile);
						}
						else
						{
							var re = /\.(rc|mc)$/i;
							if(strTarget.match(re) != null)
							{
								objResourceFilter.AddFile(strFile);
							}
							else
							{
								objSpecialFilter.AddFile(strFile);
							}
						}
					}
				}
			}
		}
		strTextStream.Close();
	}
	catch(e)
	{
		throw e;
	}
}

///////////////////////////////////////////////////////////////////////////////
///
/// This function sets the "solution configuration" to match the respective
/// "project configuration". I.e.: if you have a WXP project, it will only be
/// built if the respective "solution configuration" is of WXP type.
///
///////////////////////////////////////////////////////////////////////////////
function SetSolutionConfigs(Solution)
{
	var solcfgs = Solution.SolutionBuild.SolutionConfigurations;
	try
	{
		var e1 = new Enumerator(solcfgs);
		e1.moveFirst();
		// Go through all possible solution contexts and set them to "don't build"
		for(;!e1.atEnd();e1.moveNext())
		{
			var solcfg = e1.item();
			var e2 = new Enumerator(solcfg.SolutionContexts);
			for(;!e2.atEnd();e2.moveNext())
			{
				var solctx = e2.item();
				solctx.ShouldBuild = false;//
				solctx.ShouldDeploy = false;//
			}
		}

		e1.moveFirst();
		// Go through all possible solution configurations and contexts
		for(;!e1.atEnd();e1.moveNext())
		{
			var solcfg = e1.item();
			var e2 = new Enumerator(solcfg.SolutionContexts);
			for(;!e2.atEnd();e2.moveNext())
			{
				var solctx = e2.item();
				var projname = solctx.ProjectName;
				// For all DDK names ...
				for(var i = 0; i < theDDKs.length; i++)
				{
					var matchstr = "." + theDDKs[i] + ".";
					// ... match the config names with the DDK names ...
					if((projname.indexOf(matchstr) > 0) && (solcfg.Name.indexOf(theDDKs[i]) == 0))
					{
						// ... and if matched, set build and deploy properties
						solctx.ShouldBuild = true;
						solctx.ShouldDeploy = true;
					}
				}
			}
		}

	}
	catch(e)
	{
		throw e;
	}
}

///////////////////////////////////////////////////////////////////////////////
///
/// Adds the configurations on a per-DDK basis to the given project.
///
///////////////////////////////////////////////////////////////////////////////
function AddConfigPerDdk(proj, strProjectName, iDDK)
{
	var strDdkbuild = wizard.FindSymbol("DDKBUILD_COMBOBOX");
	// If the checkbox for property sheets is checked, we are going to override
	// the path to DDKBUILD through the variable DDKBUILD_PATH, which is being
	// set by the property sheet to be the value of symbol "DDKBUILD_COMBOBOX".
	if(wizard.FindSymbol("PROPERTYSHEET_CHECKBOX"))
	{
		strDdkbuild = "$(DDKBUILD_PATH)";
	}
	var bBuildPrefast = wizard.FindSymbol("PREFASTCONFIG_CHECKBOX");
	var bBuildPrefastChecked = wizard.FindSymbol("PREFASTCONFIG_ONLYCHECKED_CHECKBOX");

	try
	{
		// Go through all possible command line "tags" ...
		for(var j = 0; j < BuildCommandLine.length; j++)
		{
			// ... if the name of the DDK is not at position 0, continue
			if(BuildCommandLine[j].indexOf(theDDKs[iDDK]) != 0)
			{
				continue;
			}
			if((!wizard.FindSymbol("SUPPORT64BIT_CHECKBOX")) && (Build64bit[j] != 0))
			{
				// User does not want 64bit configs, skip it ...
				continue;
			}
			// Check for AMD64 now
			if((!wizard.FindSymbol("SUPPORT64BIT_AMD64_CHECKBOX")) && (Build64bit[j] == 1))
			{
				// User does not want AMD 64bit configs, skip it ...
				continue;
			}
			// Check for IA64 now
			if((!wizard.FindSymbol("SUPPORT64BIT_IA64_CHECKBOX")) && (Build64bit[j] == 2))
			{
				// User does not want Intel 64bit configs, skip it ...
				continue;
			}
			// ... all configuration types (free, checked)
			for(var i = 0; i < theCfgsName.length; i++)
			{
				if((!bBuildPrefast) && (theCfgsPrefast[i] != ""))
				{
					// User does not want PREfast configuration
					continue;
				}
				// Check for PREfast only with checked builds
				if((bBuildPrefast && bBuildPrefastChecked) && (theCfgsPrefast[i] != "") && (theCfgsName[i].indexOf("checked") == -1))
				{
					// User does want PREfast only for checked configuration
					continue;
				}
				// Build the name of the configuration
				var strCfgName = BuildCommandLine[j] + " " + theCfgsName[i];
				// Add it to the current project
				proj.Object.AddConfiguration(strCfgName);
				// Retrieve the configuration we just created
				var config = proj.Object.Configurations(strCfgName);
				// "InheritedPropertySheets" does not exist on VS 7.1 (2003)
				// Hence, we catch the error and fall back to the default value
				try
				{
					// Set some properties
					if(wizard.FindSymbol("PROPERTYSHEET_CHECKBOX"))
					{
						config.InheritedPropertySheets = ".\\" + strProjectName + ".vsprops";
					}
				}
				catch(e1)
				{
					strDdkbuild = wizard.FindSymbol("DDKBUILD_COMBOBOX");
				}
				// Set some properties
				config.IntermediateDirectory = ".\\";
				config.ConfigurationType = "0";
				// Retrieve the make tool object
				var make = config.Tools("VCNMakeTool");
				if(make != null)
				{
					var xBuildOpt = "";
					var xRebuildOpt = " -cZ";
					var xUnicodeWin32 = "";
					if(theCfgsPrefast[i] != "")
					{
						xBuildOpt = xRebuildOpt;
					}
					if(wizard.FindSymbol("WIZARD_NAME").indexOf("Win32") != -1)
					{
						xUnicodeWin32 = ";UNICODE;_UNICODE";
					}
					// Set those properties in which we are interested
					make.BuildCommandLine = strDdkbuild + " -" + BuildCommandLine[j] + " " + theCfgsCmdline[i] + xBuildOpt + theCfgsPrefast[i];
					make.ReBuildCommandLine = strDdkbuild + " -" + BuildCommandLine[j] + " " + theCfgsCmdline[i] + xRebuildOpt + theCfgsPrefast[i];
					// This is used to fake the DBG flag set in the build environment
					// (useful for Visual AssistX and so on)
					if(theCfgsName[i].indexOf("checked") != -1)
					try
					{
						make.PreprocessorDefinitions = "DBG=1;" + BuildDefines[j] + xUnicodeWin32;
					} catch(e){}
					else
					try
					{
						make.PreprocessorDefinitions = "DBG=0;" + BuildDefines[j] + xUnicodeWin32;
					} catch(e){}
					// Set a useful include path
					if(BuildIncPath[j] != "")
					try
					{
						make.IncludeSearchPath = "$(" + theDDKs[iDDK] + "BASE)\\inc\\ddk" + BuildIncPath[j];
					} catch(e){}
				}
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

///////////////////////////////////////////////////////////////////////////////
///
/// Adds a number of configurations to the current project given the DDK type
/// to which the project relates.
///
///////////////////////////////////////////////////////////////////////////////
function AddConfig(proj, strProjectName, iDDK)
{
	try
	{
		switch(iDDK)
		{
		case 0: // WXP
		case 1: // WNET
		case 2: // WLH
		case 3: // W7
			// For every possible configuration of this DDK add one ...
			AddConfigPerDdk(proj, strProjectName, iDDK);
			// Now delete the obsolete configurations
			// This has to be done *after* adding the other configurations
			// since otherwise an error will occur because a solution needs
			// at least one project to exist.
			var config = proj.Object.Configurations("Release");
			if(config != null)
			{
				proj.Object.RemoveConfiguration(config);
			}
			config = proj.Object.Configurations("Debug");
			if(config != null)
			{
				proj.Object.RemoveConfiguration(config);
			}
			break;
		}
	}
	catch(e)
	{
		throw e;
	}
}

function DelFile(fso, strWizTempFile)
{
	try
	{
		if (fso.FileExists(strWizTempFile))
		{
			var tmpFile = fso.GetFile(strWizTempFile);
			tmpFile.Delete();
		}
	}
	catch(e)
	{
		throw e;
	}
}

function CreateCustomInfFile()
{
	try
	{
		var fso, TemplatesFolder, TemplateFiles, strTemplate;
		fso = new ActiveXObject("Scripting.FileSystemObject");

		var TemporaryFolder = 2;
		var tfolder = fso.GetSpecialFolder(TemporaryFolder);
		var strTempFolder = tfolder.Drive + "\\" + tfolder.Name;

		var strWizTempFile = strTempFolder + "\\" + fso.GetTempName();

		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");
		var strInfFile = strTemplatePath + "\\Templates.inf";
		wizard.RenderTemplate(strInfFile, strWizTempFile);

		var WizTempFile = fso.GetFile(strWizTempFile);
		return WizTempFile;
	}
	catch(e)
	{
		throw e;
	}
}

///////////////////////////////////////////////////////////////////////////////
///
/// Given the file name and the project name this function will attempt to
/// change the file names passed to it and return the changed ones or simply
/// the same name that was passed if the name is okay.
///
///////////////////////////////////////////////////////////////////////////////
function GetTargetName(strName, strProjectName)
{
	try
	{
		// We are going to replace "PROJECT_NAME" by the actual project name
		var strTarget = strName;
		var re = /PROJECT_NAME/;
		if (strName.match(re) != null)
		{
			strTarget = strName.replace(re, strProjectName);
		}

		// Use C++ instead of C
		if(wizard.FindSymbol("STRICTERCPP_CHECKBOX"))
		{
			var re = /\.c$/i;
			if(strTarget.match(re) != null)
			{
				// File name will be changed to *.cpp
				strTarget = strTarget.replace(re, ".cpp");
			}
		}

		// Include message file support or not
		if(!wizard.FindSymbol("MESSAGEFILE_CHECKBOX"))
		{
			var re = /\.mc$/i;
			if(strTarget.match(re) != null)
			{
				// Don't copy message files
				return "";
			}
		}

		// Copy the makefile.inc or not
		if(!wizard.FindSymbol("MAKEFILEINC_CHECKBOX"))
		{
			var re = /^makefile\.inc$/i;
			if(strTarget.match(re) != null)
			{
				// Don't copy makefile.inc
				return "";
			}
		}

		// Include the build number increment or not
		if(!wizard.FindSymbol("AUTOINCBUILDNR_CHECKBOX"))
		{
			var re = /^(BUILD|buildinc\.cmd|buildnumber\.h)$/i;
			if(strTarget.match(re) != null)
			{
				// Don't copy build number file
				return "";
			}
		}

		// Copy the build scripts or not
		if(!wizard.FindSymbol("BUILDSCRIPTS_CHECKBOX"))
		{
			var re = /^ddk(postbld|prebld|bldenv)\.cmd$/i;
			if(strTarget.match(re) != null)
			{
				// Don't copy build scripts
				return "";
			}
		}

		// Copy the property sheet or not ...
		if(!wizard.FindSymbol("PROPERTYSHEET_CHECKBOX"))
		{
			var re = /\.vsprops$/i;
			if(strTarget.match(re) != null)
			{
				// Don't copy makefile.inc
				return "";
			}
		}
		return strTarget;
	}
	catch(e)
	{
		throw e;
	}
}

function AddFilesToCustomProj(strProjectName, strProjectPath, InfFile)
{
	try
	{
		var strTemplatePath = wizard.FindSymbol("TEMPLATES_PATH");

		var strTpl = "";
		var strName = "";

		var strTextStream = InfFile.OpenAsTextStream(1, -2);
		while (!strTextStream.AtEndOfStream)
		{
			strTpl = strTextStream.ReadLine();
			if (strTpl != "")
			{
				strName = strTpl;
				var strTarget = GetTargetName(strName, strProjectName);
				if(strTarget.length)
				{
					var strTemplate = strTemplatePath + "\\" + strTpl;
					var strFile = strProjectPath + "\\" + strTarget;

					var bCopyOnly = false;  //"true" will only copy the file from strTemplate to strTarget without rendering/adding to the project
					var strExt = strName.substr(strName.lastIndexOf("."));
					if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
						bCopyOnly = true;
					wizard.RenderTemplate(strTemplate, strFile, bCopyOnly);
				}
			}
		}
		strTextStream.Close();
	}
	catch(e)
	{
		throw e;
	}
}
