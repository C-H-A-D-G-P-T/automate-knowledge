*** Settings ***
Library    AppiumLibrary

*** Variables ***
${REMOTE_URL}        http://127.0.0.1:4723/wd/hub
${PLATFORM_NAME}     Android
${PLATFORM_VERSION}  13
${DEVICE_NAME}       emulator-5554
${APP_PACKAGE}       com.android.settings
${APP_ACTIVITY}      .Settings

*** Test Cases ***
Open Settings And Click Network
    Open Application    ${REMOTE_URL}
    ...    platformName=${PLATFORM_NAME}
    ...    platformVersion=${PLATFORM_VERSION}
    ...    deviceName=${DEVICE_NAME}
    ...    appPackage=${APP_PACKAGE}
    ...    appActivity=${APP_ACTIVITY}
    ...    automationName=UiAutomator2

    Wait Until Page Contains Element    xpath=//android.widget.TextView[@text="Network & internet"]
    Click Element    xpath=//android.widget.TextView[@text="Network & internet"]

    Sleep    2s
    Capture Page Screenshot

    Close Application