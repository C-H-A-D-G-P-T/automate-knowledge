*** Settings ***
Library    AppiumLibrary

*** Variables ***
${REMOTE_URL}    http://127.0.0.1:4723

*** Test Cases ***
Login Test iOS
    Open Application    ${REMOTE_URL}
    ...    platformName=iOS
    ...    deviceName=iPhone 15
    ...    automationName=XCUITest
    ...    app=/path/to/your.app

    Input Text    accessibility_id=username    testuser
    Input Text    accessibility_id=password    123456
    Click Element    accessibility_id=login_button

    Wait Until Page Contains Element    accessibility_id=home_screen
    Capture Page Screenshot

    Close Application