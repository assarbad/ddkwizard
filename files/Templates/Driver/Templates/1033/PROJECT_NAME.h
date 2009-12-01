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
#include "drvcommon.h"
#include "drvversion.h"

#define DEVICE_NAME			"\\Device\\[!output PROJECT_PREFIX]_DeviceName"
#define SYMLINK_NAME		"\\DosDevices\\[!output PROJECT_PREFIX]_DeviceName"
PRESET_UNICODE_STRING(usDeviceName, DEVICE_NAME);
PRESET_UNICODE_STRING(usSymlinkName, SYMLINK_NAME);

#ifndef FILE_DEVICE_[!output PROJECT_PREFIX]
#define FILE_DEVICE_[!output PROJECT_PREFIX] 0x8000
#endif

// Values defined for "Method"
// METHOD_BUFFERED
// METHOD_IN_DIRECT
// METHOD_OUT_DIRECT
// METHOD_NEITHER
// 
// Values defined for "Access"
// FILE_ANY_ACCESS
// FILE_READ_ACCESS
// FILE_WRITE_ACCESS

[!if STRICTERCPP_CHECKBOX]
const ULONG IOCTL_[!output PROJECT_PREFIX]_OPERATION = CTL_CODE(FILE_DEVICE_[!output PROJECT_PREFIX], 0x01, METHOD_BUFFERED, FILE_READ_DATA | FILE_WRITE_DATA);
[!else]
#define IOCTL_[!output PROJECT_PREFIX]_OPERATION CTL_CODE(FILE_DEVICE_[!output PROJECT_PREFIX], 0x01, METHOD_BUFFERED, FILE_READ_DATA | FILE_WRITE_DATA)
[!endif]

#endif // __[!output PROJECT_PREFIX]_H_VERSION__
