*** Settings ***
Library    RequestsLibrary

*** Variables ***
${BASE_URL}    https://reqres.in

*** Test Cases ***
Get Users List
    [Documentation]    ✅ 1. Basic GET API
    Create Session    myapi    ${BASE_URL}
    ${response}=    GET On Session    myapi    /api/users?page=2

    Status Should Be    200
    Log    ${response.json()}

Create User
    [Documentation]    ✅ 2. POST API (Create User)
    Create Session    myapi    ${BASE_URL}

    ${body}=    Create Dictionary    name=warit    job=qa
    ${response}=    POST On Session    myapi    /api/users    json=${body}

    Status Should Be    201
    Should Contain    ${response.text}    warit

Get With Headers
    [Documentation]    ✅ 3. API with Headers (Auth / Token)
    Create Session    myapi    ${BASE_URL}

    ${headers}=    Create Dictionary
    ...    Authorization=Bearer dummy_token
    ...    Content-Type=application/json

    ${response}=    GET On Session    myapi    /api/users/2    headers=${headers}

    Status Should Be    200