*** Settings ***
Library    XML

*** Test Cases ***
Validate XML
    ${xml}=    Parse XML    users.xml

    Element Should Exist    ${xml}    .//user[@id="2"]
    Element Text Should Be  ${xml}    .//user[@id="2"]/role    Dev

Update XML
    ${xml}=    Parse XML    users.xml

    Set Element Text    ${xml}    .//user[@id="1"]/role    SDET
    Save XML    ${xml}    updated.xml

Add Element
    ${xml}=    Parse XML    users.xml

    Add Element    ${xml}    .//users    user    id=2
    Add Element    ${xml}    .//user[@id="2"]    name
    Set Element Text    ${xml}    .//user[@id="2"]/name    Alice

    Save XML    ${xml}    updated.xml

Remove Element
    ${xml}=    Parse XML    users.xml

    Remove Element    ${xml}    .//user[@id="2"]
    Save XML    ${xml}    updated.xml

Loop Users
    ${xml}=    Parse XML    users.xml
    ${users}=  Get Elements    ${xml}    .//user

    FOR    ${u}    IN    @{users}
        ${name}=    Get Element Text    ${u}    ./name
        Log    ${name}
    END

Validate API XML
    ${xml}=    Parse XML    ${response.text}

    Element Text Should Be    ${xml}    .//status    success