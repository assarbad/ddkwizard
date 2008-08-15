///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) [!output PROJECT_YEAR] - [!output DDKWIZ_USERVARIABLE_COMPANY]
///
/// Original filename: [!output PROJECT_NAME].h
/// Project          : [!output PROJECT_NAME]
/// Date of creation : <see [!output PROJECT_FILENAME]>
/// Author(s)        : <see [!output PROJECT_FILENAME]>
///
/// Purpose          : <see [!output PROJECT_FILENAME]>
///
/// Revisions:         <see [!output PROJECT_FILENAME]>
///
///////////////////////////////////////////////////////////////////////////////

// $Id$

#ifndef __[!output PROJECT_PREFIX]_H_VERSION__
#define __[!output PROJECT_PREFIX]_H_VERSION__ 100

#if defined(_MSC_VER) && (_MSC_VER >= 1020)
#pragma once
#endif


[!if MESSAGEFILE_CHECKBOX]
#include "msg_[!output PROJECT_NAME].h"
[!endif]
#include "execommon.h"
#include "exeversion.h"

#endif // __[!output PROJECT_PREFIX]_H_VERSION__
