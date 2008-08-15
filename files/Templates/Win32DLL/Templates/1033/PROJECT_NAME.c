///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) [!output PROJECT_YEAR] - [!output DDKWIZ_USERVARIABLE_COMPANY]
///
/// Original filename: [!output PROJECT_FILENAME]
/// Project          : [!output PROJECT_NAME]
/// Date of creation : [!output PROJECT_DATE]
/// Author(s)        : [!output DDKWIZ_USERVARIABLE_AUTHOR]
///
/// Purpose          : <description>
///
/// Revisions:
///  0000 [[!output PROJECT_DATE]] Initial revision.
///
///////////////////////////////////////////////////////////////////////////////

// $Id$

///////////////////////////////////////////////////////////////////////////////
// #define UNICODE
// #define _UNICODE
// These two defines are given implicitly through the settings of C_DEFINES in
// the SOURCES file of the project. Hence change them there and there only.
///////////////////////////////////////////////////////////////////////////////

#include <stdio.h>
#include <tchar.h>
#include "[!output PROJECT_NAME].h"

// Global variable for the instance (i.e. module) handle
[!if STRICTERCPP_CHECKBOX]
namespace
{
	static HINSTANCE hInstance = NULL;
}
[!else]
static HINSTANCE hInstance = NULL;
[!endif]

BOOL WINAPI DllMain(HINSTANCE hModule, DWORD dwReason, LPVOID lpvReserved)
{
	switch(dwReason)
	{
	case DLL_PROCESS_ATTACH:
		DisableThreadLibraryCalls(hModule);
		hInstance = hModule;
		break;
	case DLL_PROCESS_DETACH:
		break;
	default:
	    break;
	}
	return TRUE;
}
