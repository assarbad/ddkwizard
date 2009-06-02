///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) [!output PROJECT_YEAR] - [!output DDKWIZ_USERVARIABLE_COMPANY]
///
/// Defines for the version information in the resource file
///
/// (File was in the PUBLIC DOMAIN  - Created by: ddkwizard\.assarbad\.net)
///////////////////////////////////////////////////////////////////////////////

// $Id$

#ifndef __EXEVERSION_H_VERSION__
#define __EXEVERSION_H_VERSION__ 100

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif

[!if AUTOINCBUILDNR_CHECKBOX]
#include "buildnumber.h"
[!endif]

// ---------------------------------------------------------------------------
// Several defines have to be given before including this file. These are:
// ---------------------------------------------------------------------------
#define TEXT_AUTHOR            [!output DDKWIZ_USERVARIABLE_AUTHOR_C] // author (optional value)
#define PRD_MAJVER             1 // major product version
#define PRD_MINVER             0 // minor product version
#define PRD_BUILD              0 // build number for product
#define FILE_MAJVER            1 // major file version
#define FILE_MINVER            0 // minor file version
[!if AUTOINCBUILDNR_CHECKBOX]
#define FILE_BUILD             _FILE_VERSION_BUILD // file build number
[!else]
#define FILE_BUILD             0 // file build number
[!endif]
#define EXE_YEAR               [!output PROJECT_YEAR] // current year or timespan (e.g. 2003-2009)
#define TEXT_WEBSITE           [!output DDKWIZ_USERVARIABLE_WEBSITE_C] // website
#define TEXT_PRODUCTNAME       Some native application // product's name
#define TEXT_FILEDESC          This is the native application to my very cool product // component description
#define TEXT_COMPANY           [!output DDKWIZ_USERVARIABLE_COMPANY_C] // company
#define TEXT_MODULE            [!output PROJECT_NAME] // module name
#define TEXT_COPYRIGHT         Copyright \xA9 EXE_YEAR TEXT_COMPANY // copyright information
// #define TEXT_SPECIALBUILD      // optional comment for special builds
#define TEXT_INTERNALNAME      [!output PROJECT_NAME].exe // copyright information
// #define TEXT_COMMENTS          // optional comments
// ---------------------------------------------------------------------------
// ... well, that's it. Pretty self-explanatory ;)
// ---------------------------------------------------------------------------

#endif // __EXEVERSION_H_VERSION__
