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
[!if STRICTERCPP_CHECKBOX]
#include <iostream>
[!endif]
#include "[!output PROJECT_NAME].h"

int __cdecl _tmain(int argc, _TCHAR *argv[])
{
[!if STRICTERCPP_CHECKBOX]
    using namespace std;

    cout << "Hello world" << endl;
/*
[!endif]
    _tprintf(_T("Hello world\n"));
[!if STRICTERCPP_CHECKBOX]
*/
[!endif]
    return 0;
}
