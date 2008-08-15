;///////////////////////////////////////////////////////////////////////////////
;///
;/// Copyright (c) [!output PROJECT_YEAR] - [!output DDKWIZ_USERVARIABLE_COMPANY]
;///
;/// Original filename: [!output PROJECT_NAME].h
;/// Project          : [!output PROJECT_NAME]
;/// Date of creation : [!output PROJECT_DATE]
;/// Author(s)        : <see [!output PROJECT_FILENAME]>
;///
;/// Purpose          : Message table.
;///
;/// Revisions:         <see [!output PROJECT_FILENAME]>
;///
;///////////////////////////////////////////////////////////////////////////////
;
;// $Id$
;
;#ifndef __MSG_[!output PROJECT_PREFIX]_MC_VERSION__
;#define __MSG_[!output PROJECT_PREFIX]_MC_VERSION__ 100

;#if defined(_MSC_VER) && (_MSC_VER >= 1020)
;#pragma once
;#endif
;
;/*
;MessageIdTypedef=[!output PROJECT_PREFIX]_STATUS
;
;SeverityNames=(Success=0x0:STATUS_SEVERITY_SUCCESS
;               Informational=0x1:STATUS_SEVERITY_INFORMATIONAL
;               Warning=0x2:STATUS_SEVERITY_WARNING
;               Error=0x3:STATUS_SEVERITY_ERROR
;              )
;
;FacilityNames=(System=0x0
;               [!output PROJECT_NAME]Whatever=0x1:FACILITY_[!output PROJECT_PREFIX]_WHATEVER
;              )
;
;MessageId=0x0001 Facility=System Severity=Informational SymbolicName=[!output PROJECT_PREFIX]STATUS_SOME_MESSAGE
;Language=English
;Some message.
;.
;
;*/
;
;#endif // __[!output PROJECT_PREFIX]_MC_VERSION__
