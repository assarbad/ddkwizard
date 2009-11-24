#############################################################################
# Include Modern UI

  !include "MUI.nsh"
#############################################################################
  # Other Defines needed
  !define PRODUCT_NAME "DDKWizard"
  !define AUTHOR_NAME "Oliver Schneider (assarbad.net)"
  !define COPYRIGHT_YEAR "© 2006-2009"
  !define DISPLAY_VERSION "1.3.0"
  !define FILE_PRODUCT_VERSION "1.3.0.0"
  !define FILE_VERSION_COMMENTS "DDKWizard provides DDKBUILD project templates for Visual Studio .NET, .NET 2003, 2005 and 2008"
  !define FILES_FOR_SPECIFIC_TEMPLATES_DIR ".\files\Templates\*"
  !define FILES_FROM_INSTALLER_DIR ".\files\DDK_Project\*"
  !define HELP_FILE_NAME "DDKWizard_Help.pdf"
  !define SCRIPT_FILE_NAME "DDKWizIniFile.js"
  !define CONFIG_FILE_NAME "DDKWizard.ini"
  !define HELP_SHORTCUT_NAME "${PRODUCT_NAME} Help.lnk"
  !define INSTALLER_EXE_NAME "ddkwizard_setup_v${DISPLAY_VERSION}.exe"
  !define PRODUCT_WEBSITE "http://ddkwizard.assarbad.net/"
  !define SOFTWARE_KEY "SOFTWARE\Microsoft"
  !define TEMPLATES_DIR "TemplatesDir"
  !define TEMPLATES_DIR_KEY "NewProjectTemplates\TemplateDirs\{F1C25864-3097-11D2-A5C5-00C04F7968B4}\/1"
  !define UNINSTALL_EXE "Uninstall.exe"
  !define UNINSTALL_KEY "${SOFTWARE_KEY}\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"
# "Dynamic" declarations
  !define VSNET "VSNET"
  !define VS2003 "VS2003"
  !define VC2003Exp "VC2003Exp"
  !define VS2005 "VS2005"
  !define VC2005Exp "VC2005Exp"
  !define VS2008 "VS2008"
  !define VC2008Exp "VC2008Exp"
#  !define VS2010 "VS2010"
#  !define VC2010Exp "VC2010Exp"
  !define ${VSNET}_PRODUCT_KEY "${SOFTWARE_KEY}\VisualStudio\7.0"
  !define ${VS2003}_PRODUCT_KEY "${SOFTWARE_KEY}\VisualStudio\7.1"
  !define ${VC2003Exp}_PRODUCT_KEY "${SOFTWARE_KEY}\VCExpress\7.1"
  !define ${VS2005}_PRODUCT_KEY "${SOFTWARE_KEY}\VisualStudio\8.0"
  !define ${VC2005Exp}_PRODUCT_KEY "${SOFTWARE_KEY}\VCExpress\8.0"
  !define ${VS2008}_PRODUCT_KEY "${SOFTWARE_KEY}\VisualStudio\9.0"
  !define ${VC2008Exp}_PRODUCT_KEY "${SOFTWARE_KEY}\VCExpress\9.0"
#  !define ${VS2010}_PRODUCT_KEY "${SOFTWARE_KEY}\VisualStudio\10.0"
#  !define ${VC2010Exp}_PRODUCT_KEY "${SOFTWARE_KEY}\VCExpress\10.0"
  !define ${VSNET}_PRODUCT_NAME "Visual Studio .NET"
  !define ${VS2003}_PRODUCT_NAME "Visual Studio .NET 2003"
  !define ${VC2003Exp}_PRODUCT_NAME "Visual C++ 2003 Express"
  !define ${VS2005}_PRODUCT_NAME "Visual Studio 2005"
  !define ${VC2005Exp}_PRODUCT_NAME "Visual C++ 2005 Express"
  !define ${VS2008}_PRODUCT_NAME "Visual Studio 2008"
  !define ${VC2008Exp}_PRODUCT_NAME "Visual C++ 2008 Express"
#  !define ${VS2010}_PRODUCT_NAME "Visual Studio 2010"
#  !define ${VC2010Exp}_PRODUCT_NAME "Visual C++ 2010 Express"

  !define ${VSNET}_PRODUCT_FUNC "CreateVSZ_${VSNET}"
  !define ${VS2003}_PRODUCT_FUNC "CreateVSZ_${VS2003}"
  !define ${VC2003Exp}_PRODUCT_FUNC "CreateVSZ_${VS2003}"
  !define ${VS2005}_PRODUCT_FUNC "CreateVSZ_${VS2005}"
  !define ${VC2005Exp}_PRODUCT_FUNC "CreateVSZ_${VS2005}"
  !define ${VS2008}_PRODUCT_FUNC "CreateVSZ_${VS2008}"
  !define ${VC2008Exp}_PRODUCT_FUNC "CreateVSZ_${VS2008}"
#  !define ${VS2010}_PRODUCT_FUNC "CreateVSZ_${VS2010}"
#  !define ${VC2010Exp}_PRODUCT_FUNC "CreateVSZ_${VS2010}"

  !define ${VSNET}_VSWIZARD "7.0"
  !define ${VSNET}_VSWIZARD_VERSION ""
  !define ${VS2003}_VSWIZARD "${${VSNET}_VSWIZARD}"
  !define ${VS2003}_VSWIZARD_VERSION ".7.1"
  !define ${VS2005}_VSWIZARD "${${VSNET}_VSWIZARD}"
  !define ${VS2005}_VSWIZARD_VERSION ".8.0"
  !define ${VS2008}_VSWIZARD "${${VSNET}_VSWIZARD}"
  !define ${VS2008}_VSWIZARD_VERSION ".9.0"
#  !define ${VS2010}_VSWIZARD "${${VSNET}_VSWIZARD}"
#  !define ${VS2010}_VSWIZARD_VERSION ".10.0"

  Var sProductKey
  Var sProductName

# General
  !include "Sections.nsh"
  Name "${PRODUCT_NAME}"
  BrandingText "${PRODUCT_WEBSITE}"
  OutFile "${INSTALLER_EXE_NAME}"
  Caption "$(^Name) ${DISPLAY_VERSION}"
  SetDatablockOptimize on
  SetCompress force
  SetCompressor /SOLID /FINAL lzma
  ShowInstDetails show
  CRCCheck force
  XPStyle on
  LicenseForceSelection checkbox

  # Default installation folder
  InstallDir "$PROGRAMFILES\${PRODUCT_NAME}"

#############################################################################
# Pages

  !insertmacro MUI_PAGE_LICENSE ".\files\license.txt"
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES

# Define some values
  !define MUI_FINISHPAGE_LINK "Visit the ${PRODUCT_NAME} website"
  !define MUI_FINISHPAGE_LINK_LOCATION "${PRODUCT_WEBSITE}"
  !define MUI_FINISHPAGE_NOREBOOTSUPPORT
  !define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\${HELP_FILE_NAME}"
  !define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
  !define MUI_FINISHPAGE_NOAUTOCLOSE
  !define MUI_FINISHPAGE_RUN "$WINDIR\notepad.exe"
  !define MUI_FINISHPAGE_RUN_PARAMETERS "$\"$INSTDIR\${CONFIG_FILE_NAME}$\""
  !define MUI_FINISHPAGE_RUN_TEXT "Edit DDKWizard configuration file"
  !define MUI_FINISHPAGE_RUN_NOTCHECKED
# Insert finish page
  !insertmacro MUI_PAGE_FINISH

  !insertmacro MUI_UNPAGE_CONFIRM
  !insertmacro MUI_UNPAGE_INSTFILES

#############################################################################
#Languages

  !insertmacro MUI_LANGUAGE "English"

#############################################################################
# Version Information

  VIProductVersion "${FILE_PRODUCT_VERSION}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductName" "${PRODUCT_NAME}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "Comments" "${FILE_VERSION_COMMENTS}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "CompanyName" "${AUTHOR_NAME}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "LegalCopyright" "${COPYRIGHT_YEAR} ${AUTHOR_NAME}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "FileDescription" "${PRODUCT_NAME} ${DISPLAY_VERSION} Installer"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "FileVersion" "${DISPLAY_VERSION}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "InternalName" "${PRODUCT_NAME} Setup"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "OriginalFilename" "${INSTALLER_EXE_NAME}"
  VIAddVersionKey /LANG=${LANG_ENGLISH} "Website" "${PRODUCT_WEBSITE}"

#############################################################################
# Installer Sections

!macro ProductInstall product
  StrCpy $sProductKey "${${product}_PRODUCT_KEY}"
  StrCpy $sProductName "${${product}_PRODUCT_NAME}"
  Call SpecificProductInstall
!macroend

!macro DispatchProduct product
  StrCmp $sProductName "${${product}_PRODUCT_NAME}" 0 +3
  Call ${${product}_PRODUCT_FUNC}
  Goto ExitThis
!macroend

!macro MakeCreationFunction product
Function CreateVSZ_${product}
  FileOpen $R0 '$0\$1.vsz' w
  FileWrite $R0 'VSWIZARD ${${product}_VSWIZARD}'
  FileWrite $R0 "$\r$\n" # Line break
  FileWrite $R0 'Wizard=VsWizard.VsWizardEngine${${product}_VSWIZARD_VERSION}'
  FileWrite $R0 "$\r$\n" # Line break
  FileWrite $R0 'Param="WIZARD_NAME = $1"'
  FileWrite $R0 "$\r$\n" # Line break
  FileWrite $R0 'Param="ABSOLUTE_PATH = $INSTDIR\Wizards\$1"'
  FileWrite $R0 "$\r$\n" # Line break
  FileWrite $R0 'Param="FALLBACK_LCID = 1033"'
  FileWrite $R0 "$\r$\n" # Line break
  FileClose $R0
FunctionEnd
!macroend

Section "-Required"
  SectionIn RO
  SetOverwrite on

  IntOp $9 0 + 0
  !insertmacro ProductInstall ${VSNET}
  !insertmacro ProductInstall ${VS2003}
  !insertmacro ProductInstall ${VC2003Exp}
  !insertmacro ProductInstall ${VS2005}
  !insertmacro ProductInstall ${VC2005Exp}
  !insertmacro ProductInstall ${VS2008}
  !insertmacro ProductInstall ${VC2008Exp}
#  !insertmacro ProductInstall ${VS2010}
#  !insertmacro ProductInstall ${VC2010Exp}
  StrCmp $9 "0" No_Visual_Studio_Found 0
  DetailPrint "Installing common components"
  SetOutPath $INSTDIR\Wizards
  File /r /x .svn ${FILES_FOR_SPECIFIC_TEMPLATES_DIR}
  # Copy the wizard files which are not templates
  StrCpy $0 "$INSTDIR\Wizards\Driver"
  Call CopyScripts
  StrCpy $0 "$INSTDIR\Wizards\NativeApp"
  Call CopyScripts
  StrCpy $0 "$INSTDIR\Wizards\EmptyDrv"
  Call CopyScripts
  StrCpy $0 "$INSTDIR\Wizards\Win32CUI"
  Call CopyScripts
  StrCpy $0 "$INSTDIR\Wizards\Win32DLL"
  Call CopyScripts
  # Copy the help
  SetOutPath $INSTDIR
  File .\doc\${HELP_FILE_NAME}
  File .\files\${SCRIPT_FILE_NAME}
  # Only overwrite if the user wants it!!!
  IfFileExists $INSTDIR\${CONFIG_FILE_NAME} 0 Overwrite_Config
  MessageBox MB_YESNO "Do you want to overwrite the existing DDKWizard configuration file?$\nNote: This will undo any customizations you made!$\n$\nOverwrite it?" IDYES 0 IDNO No_Overwrite_Config
Overwrite_Config:
  File .\files\${CONFIG_FILE_NAME}
No_Overwrite_Config:
  # Create shortcut to the help on desktop
  CreateShortCut "$DESKTOP\${HELP_SHORTCUT_NAME}" "$INSTDIR\${HELP_FILE_NAME}"
  Call CreateUninstallEntry # Create entry in "Add/Remove Software"
  Goto EndOfInstallSection
No_Visual_Studio_Found:
  StrCpy $0 "Can't install. The installer could not find any of the required products."
  MessageBox MB_OK "$0$\nPress 'Cancel' in the installer window."
  Abort $0
EndOfInstallSection:
SectionEnd

Function CopyScripts
  SetOutPath $0
  File /r /x .svn .\files\Wizard\*
  Delete "$0\Templates\1033\CustomVars.vsprops"
#  FileOpen $R0 '$0\HTML\1033\Config.ini' w
#  FileWrite $R0 "[General]$\r$\nInstDir=$INSTDIR$\r$\n" # Line break
#  FileClose $R0
FunctionEnd

Function SpecificProductInstall
  DetailPrint "Trying to find $sProductName"
  ClearErrors
  ReadRegStr $0 HKLM "$sProductKey\${TEMPLATES_DIR_KEY}" "${TEMPLATES_DIR}"
  IfErrors 0 +3
  DetailPrint "... not found"
  Goto ExitThis
#Install:
  DetailPrint "Installing for $sProductName"
  StrCpy $0 '$0\DDK Project'
  SetOutPath $0
  File /r /x .svn ${FILES_FROM_INSTALLER_DIR}
  StrCpy $1 'Driver'
  Call SpecificProductDispatcher
  StrCpy $1 'NativeApp'
  Call SpecificProductDispatcher
  StrCpy $1 'EmptyDrv'
  Call SpecificProductDispatcher
  StrCpy $1 'Win32CUI'
  Call SpecificProductDispatcher
  StrCpy $1 'Win32DLL'
  Call SpecificProductDispatcher
  IntOp $9 $9 + 1
ExitThis:
FunctionEnd

# Dispatcher for each of the specific products ...
Function SpecificProductDispatcher
  !insertmacro DispatchProduct ${VSNET}
  !insertmacro DispatchProduct ${VS2003}
  !insertmacro DispatchProduct ${VC2003Exp}
  !insertmacro DispatchProduct ${VS2005}
  !insertmacro DispatchProduct ${VC2005Exp}
  !insertmacro DispatchProduct ${VS2008}
  !insertmacro DispatchProduct ${VC2008Exp}
#  !insertmacro DispatchProduct ${VS2010}
#  !insertmacro DispatchProduct ${VC2010Exp}
ExitThis:
FunctionEnd

# These macros create the functions responsible to create the .VSZ files
!insertmacro MakeCreationFunction ${VSNET}
!insertmacro MakeCreationFunction ${VS2003}
!insertmacro MakeCreationFunction ${VS2005}
!insertmacro MakeCreationFunction ${VS2008}
#!insertmacro MakeCreationFunction ${VS2010}

#############################################################################
#Installer Functions

#############################################################################
# This function is a callback being called upon initialization. It checks the
# OS versionon which we run and decides about the available options.
#############################################################################
Function .onInit
  SetCurInstType 0
FunctionEnd

Function CreateUninstallEntry
  # Create the uninstaller
  WriteUninstaller "$INSTDIR\${UNINSTALL_EXE}"
  WriteRegExpandStr HKCU "${UNINSTALL_KEY}" "UninstallString" '"$INSTDIR\${UNINSTALL_EXE}"'
  WriteRegExpandStr HKCU "${UNINSTALL_KEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "DisplayName" "${PRODUCT_NAME} (DDKBUILD project templates for Visual Studio)"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "DisplayIcon" "$INSTDIR\${UNINSTALL_EXE},0"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "DisplayVersion" "${DISPLAY_VERSION}"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "Publisher" "${AUTHOR_NAME}"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "Readme" "$INSTDIR\${HELP_FILE_NAME}"
  WriteRegStr       HKCU "${UNINSTALL_KEY}" "URLInfoAbout" "${PRODUCT_WEBSITE}"
  WriteRegDWORD     HKCU "${UNINSTALL_KEY}" "NoModify" "1"
  WriteRegDWORD     HKCU "${UNINSTALL_KEY}" "NoRepair" "1"
FunctionEnd
#############################################################################

#############################################################################
#Uninstaller Section

!macro ProductUninstall product
  StrCpy $sProductKey "${${product}_PRODUCT_KEY}"
  StrCpy $sProductName "${${product}_PRODUCT_NAME}"
  Call un.SpecificProductInstall
!macroend

Section "Uninstall"
# Registry stuff has to be removed as well as the uninstaller itself
  Call un.CreateUninstallEntry
  IntOp $9 0 + 0
  !insertmacro ProductUninstall ${VSNET}
  !insertmacro ProductUninstall ${VS2003}
  !insertmacro ProductUninstall ${VC2003Exp}
  !insertmacro ProductUninstall ${VS2005}
  !insertmacro ProductUninstall ${VC2005Exp}
  !insertmacro ProductUninstall ${VS2008}
  !insertmacro ProductUninstall ${VC2008Exp}
#  !insertmacro ProductUninstall ${VS2010}
#  !insertmacro ProductUninstall ${VC2010Exp}
  StrCmp $9 "0" 0 Common
# No_Visual_Studio_Found:
  DetailPrint "Strangely none of the required products was found."
  DetailPrint "Skipped uninstallation of the respective files."
Common:
  DetailPrint "Removing common components"
# Delete the files
  Delete "$INSTDIR\${HELP_FILE_NAME}"
# Remove the install directory
  RMDir /r "$INSTDIR"
# Remove desktop link
  Delete "$DESKTOP\${HELP_SHORTCUT_NAME}"
SectionEnd

#############################################################################
#Uninstaller Functions

Function un.SpecificProductInstall
  DetailPrint "Removing wizard from $sProductName"
  ClearErrors
  ReadRegStr $0 HKLM "$sProductKey\${TEMPLATES_DIR_KEY}" "${TEMPLATES_DIR}"
  IfErrors 0 +3
  DetailPrint "... failed"
  Goto ExitThis
  StrCpy $0 '$0\DDK Project'
  RMDir /r $0
  IntOp $9 $9 + 1
ExitThis:
FunctionEnd

Function un.onInit
FunctionEnd

Function un.CreateUninstallEntry
  Delete "$INSTDIR\${UNINSTALL_EXE}"
  DeleteRegKey HKCU "${UNINSTALL_KEY}"
FunctionEnd
#############################################################################
