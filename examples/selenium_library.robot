*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}        https://example.com/login
${BROWSER}    chrome

*** Test Cases ***
Login Success
    [Documentation]    ✅ 1. Basic Web Test (Login)
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

    Input Text    id=username    demo
    Input Text    id=password    1234
    Click Button    id=login-btn

    Wait Until Page Contains    Welcome

    Close Browser

Check Dashboard Title
    [Documentation]    ✅ 2. Verify Element + Assertion
    Open Browser    https://example.com/dashboard    chrome

    Title Should Be    Dashboard
    Page Should Contain Element    css=.user-profile

    Close Browser

Count Products
    [Documentation]    ✅ 3. Working with List / Multiple Elements
    Open Browser    https://example.com/products    chrome

    ${count}=    Get Element Count    css=.product-item
    Log    Total products: ${count}

    Should Be True    ${count} > 0

    Close Browser