*** Settings ***
Library    String

*** Test Cases ***
Change Case
    ${text}=    Set Variable    hello world

    ${upper}=   Convert To Upper Case    ${text}
    ${lower}=   Convert To Lower Case    ${upper}

    Log    ${upper}    # HELLO WORLD
    Log    ${lower}    # hello world

Join And Split
    ${joined}=    Catenate    SEPARATOR=-    apple    banana    cherry
    Log    ${joined}    # apple-banana-cherry

    ${list}=      Split String    ${joined}    -
    Log    ${list}

Find Text
    ${text}=    Set Variable    Robot Framework

    Should Contain    ${text}    Framework
    Should Not Contain    ${text}    Selenium

Replace Text
    ${text}=    Set Variable    Hello Robot

    ${new}=    Replace String    ${text}    Robot    QA
    Log    ${new}    # Hello QA

Trim Text
    ${text}=    Set Variable    "   hello   "

    ${clean}=    Strip String    ${text}
    Log    ${clean}    # hello

Substring Example
    ${text}=    Set Variable    RobotFramework

    ${sub}=    Get Substring    ${text}    0    5
    Log    ${sub}    # Robot

Length Example
    ${text}=    Set Variable    Robot

    ${len}=    Get Length    ${text}
    Log    ${len}    # 5

Random String
    ${random}=    Generate Random String    8    [LETTERS]
    Log    ${random}

Validate Username
    ${username}=    Set Variable    test_user_01

    Should Contain    ${username}    test
    ${len}=    Get Length    ${username}

    Should Be True    ${len} > 5