///////////////////////////////////////////////////////////////////////////////
///
/// Copyright (c) [!output PROJECT_YEAR] - [!output DDKWIZ_USERVARIABLE_COMPANY]
///
/// Some fixes in case you build with W2K as target platform
/// See: http://blog.assarbad.net/20060708/windows-2003-sp1-ddk-with-a-little-annoyance/
///
/// (File was in the PUBLIC DOMAIN  - Created by: ddkwizard\.assarbad\.net)
///////////////////////////////////////////////////////////////////////////////

// $Id$

#if _WIN32_WINNT == 0x500

#ifdef __cplusplus
extern "C" {
#endif

extern void NtProcessStartup(void * StartupArgument);

extern void NtProcessStartupForGS(void * StartupArgument);

void NtProcessStartupForGS(void * StartupArgument)
{
    NtProcessStartup(StartupArgument);
}

#ifdef __cplusplus
}; // extern "C"
#endif

#endif // _WIN32_WINNT == 0x500