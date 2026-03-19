*** Settings ***
Library    Collections

*** Test Cases ***
Test List Operations
    ${my_list}=    Create List    apple    banana    cherry
    Append To List    ${my_list}    date
    List Should Contain Value    ${my_list}    banana
    Length Should Be    ${my_list}    4

Test Dictionary Operations
    ${user}=    Create Dictionary    name=Alice    age=30    role=QA
    Dictionary Should Contain Key    ${user}    name
    ${name}=    Get From Dictionary    ${user}    name
    Should Be Equal    ${name}    Alice