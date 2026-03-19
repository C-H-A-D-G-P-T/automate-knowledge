*** Settings ***
Library    DatabaseLibrary

*** Variables ***
${DB_NAME}     mydb
${DB_USER}     root
${DB_PASS}     password
${DB_HOST}     localhost
${DB_PORT}     3306

*** Test Cases ***
Check User Exists
    [Documentation]    ✅ 1. Basic Query (ตรวจสอบข้อมูลใน DB)
    Connect To Database    pymysql    ${DB_NAME}    ${DB_USER}    ${DB_PASS}    ${DB_HOST}    ${DB_PORT}

    ${result}=    Query    SELECT * FROM users WHERE id=1
    Should Not Be Empty    ${result}

    Disconnect From Database

Validate Username
    [Documentation]    ✅ 2. Validate Data Value
    Connect To Database    pymysql    mydb    root    password    localhost    3306

    ${result}=    Query    SELECT username FROM users WHERE id=1
    ${username}=    Set Variable    ${result[0][0]}

    Should Be Equal    ${username}    warit

    Disconnect From Database

Insert User And Verify
    [Documentation]    ✅ 3. Insert + Verify
    Connect To Database    pymysql    mydb    root    password    localhost    3306

    Execute Sql String    INSERT INTO users (name) VALUES ('test_user')

    ${result}=    Query    SELECT * FROM users WHERE name='test_user'
    Should Not Be Empty    ${result}

    Disconnect From Database

Delete User
    [Documentation]    ✅ 4. Delete + Verify
    Connect To Database    pymysql    mydb    root    password    localhost    3306

    Execute Sql String    DELETE FROM users WHERE name='test_user'

    ${result}=    Query    SELECT * FROM users WHERE name='test_user'
    Should Be Empty    ${result}

    Disconnect From Database