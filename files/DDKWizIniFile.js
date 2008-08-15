///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) 2006-2008 by Oliver Schneider (assarbad.net)
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
/// Original filename: DDKWizIniFile.js
/// Project          : DDKWizard
/// Date of creation : 2006-12-22
/// Author(s)        : Oliver Schneider
///
/// Purpose          : This file parses an INI file to override some default
///                    settings for DDKWizard.
///
/// Revisions:
///  0000 [2006-12-23] Initial revision.
///  0001 [2008-06-18] Adding a new user variable (Website).
///
///////////////////////////////////////////////////////////////////////////////

var bDDKWizard_OverriddenDefaults = false; // must be false initially

function DDKWizard_GetIniFile_(IniFilePath)
{
	var re = /file:\/\//i;
	IniFilePath = IniFilePath.replace(re, "");
	var fso = new ActiveXObject('Scripting.FileSystemObject');
	return fso.GetFile(IniFilePath + "\\DDKWizard.ini");
}

function DDKWizard_AddGlobalSymbol_(sKey, sValue)
{
	if(sValue.toLowerCase() == "default")
	{
		return;
	}
	var oWizard;
	try
	{
		oWizard = wizard;
	}
	catch(e)
	{
		oWizard = window.external;
	}
	if(sKey == "Author")
	{
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_AUTHOR', sValue);
		var re = /\/\//i;
		sValue.replace(re, "/##/"); // Make sure to "escape special characters"
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_AUTHOR_C', sValue);
	}
	else if(sKey == "CompanyName")
	{
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_COMPANY', sValue);
		var re = /\/\//i;
		sValue.replace(re, "/##/"); // Make sure to "escape special characters"
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_COMPANY_C', sValue);
	}
	else if(sKey == "Website")
	{
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_WEBSITE', sValue);
		var re = /\/\//i;
		sValue.replace(re, "/##/"); // Make sure to "escape special characters"
		oWizard.AddSymbol('DDKWIZ_USERVARIABLE_WEBSITE_C', sValue);
	}
}

function DDKWizard_OverrideListbox_(oElem, sValue)
{
	// Deselect all
	for(var i = 0; i < oElem.options.length; i++)
	{
		oElem.options[i].selected = false;
	}
	var re = /[^,0-9]/i;
	sValue.replace(re, ""); // Remove unused characters
	// If the value is empty, i.e. no DDKs preselected, bail out!
	if(sValue.length == 0)
	{
		return;
	}
	// Append the comma in cases where only one preselection is given, to force match
	sValue += ",";
	// Now preselect the chosen DDKs
	for(var i = 0; i < oElem.options.length; i++)
	{
		var sRegExp = "(^"+i+",|,"+i+",|"+i+"$)";
		var re = RegExp(sRegExp, "i");
		if(sValue.match(re) != null)
		{
			oElem.options[i].selected = true;
		}
	}
}

function DDKWizard_OverrideElement_(sType, sKey, sValue)
{
	if(sValue.toLowerCase() == "default")
	{
		return;
	}
	var oElem = document.getElementById(sKey.toUpperCase() + "_" + sType.toUpperCase());
	if(oElem && (sType == "checkbox"))
	{
		if(sValue.toLowerCase() == "true")
		{
			oElem.checked = true;
		}
		else if(sValue.toLowerCase() == "false")
		{
			oElem.checked = false;
		}
	}
	else if(oElem && (sType == "text"))
	{
		oElem.value = sValue;
	}
	else if(oElem && (sType == "listbox"))
	{
		DDKWizard_OverrideListbox_(oElem, sValue);
	}
}

function DDKWizard_ParseIniFile_(ProjectName, IniFilePath)
{
	var oIniFile = DDKWizard_GetIniFile_(IniFilePath);
	if(oIniFile == null)
	{
		return false;
	}
	var strTextStream = oIniFile.OpenAsTextStream(1, -2);
	var sSection = "";
	var re = new RegExp("^\\[(General|Project\\."+ ProjectName +")\\]", "i");
	while (!strTextStream.AtEndOfStream)
	{
		var strTpl = strTextStream.ReadLine();
		// Ignore empty and comment lines
		if ((strTpl != '') && (!strTpl.match(/^[\t\s]*;/)))
		{
			if(strTpl.match(re) != null)
			{
				sSection = RegExp.$1;
			}
			else if(sSection == "General")
			{
				var re1 = RegExp("^([A-Z0-9_]+?)[\\t\\s]*?=[\\t\\s]*(.+?)[\\t\\s]*$", "i");
				if(strTpl.match(re1) != null)
				{
					DDKWizard_AddGlobalSymbol_(RegExp.$1, RegExp.$2);
				}
			}
			else if(sSection == "Project." + ProjectName)
			{
				var re2 = RegExp("^(checkbox|text|listbox)\\.([A-Z0-9_]+?)[\\t\\s]*?=[\\t\\s]*(.+?)[\\t\\s]*$");
				if(strTpl.match(re2) != null)
				{
					DDKWizard_OverrideElement_(RegExp.$1, RegExp.$2, RegExp.$3);
				}
			}
		}
	}
	return true;
}

// Returns true if the INI file was read (does not imply that values were overridden!)
function DDKWizard_OverrideDefaults(iVersion, IniFilePath)
{
	var bResult = false;
	var oWizard;
	try
	{
		oWizard = wizard;
	}
	catch(e)
	{
		oWizard = window.external;
	}

	// SANITY CHECK: The following condition ensures that we don't get that nasty
	//               message about an ActiveX control being used when DDKWizard
	//               runs and tries to use the FileSystem object to read the INI.
	if((iVersion >= 8) || bOverrideOldVsConfig)
	{
		bResult = DDKWizard_ParseIniFile_(oWizard.FindSymbol('WIZARD_NAME'), IniFilePath);
	}

	if(!bDDKWizard_OverriddenDefaults)
	{
		bDDKWizard_OverriddenDefaults = true;
		// Set default values if there was nothing defined for the global user variables
		if(!oWizard.FindSymbol('DDKWIZ_USERVARIABLE_COMPANY'))
		{
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_COMPANY', "<company name here>");
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_COMPANY_C', "<company name here>");
		}
		if(!oWizard.FindSymbol('DDKWIZ_USERVARIABLE_AUTHOR'))
		{
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_AUTHOR', "<author name(s)>");
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_AUTHOR_C', "<author name(s)>");
		}
		if(!oWizard.FindSymbol('DDKWIZ_USERVARIABLE_WEBSITE'))
		{
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_WEBSITE', "<website>");
			oWizard.AddSymbol('DDKWIZ_USERVARIABLE_WEBSITE_C', "<website>");
		}
	}
	return bResult;
}

// Please change the value to true if you want to have DDKWizard use its new
// configuration file feature even on Visual Studio 2003!
var bOverrideOldVsConfig = false;
