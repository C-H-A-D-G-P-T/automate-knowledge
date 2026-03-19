*** Settings ***
Library    OperatingSystem

*** Test Cases ***
Check File Exists
    File Should Exist    ./data/test.txt

Check Directory Exists
    Directory Should Exist    ./logs

Create And Remove File
    Create File    ./temp.txt    Hello World
    File Should Exist    ./temp.txt

    Remove File    ./temp.txt
    File Should Not Exist    ./temp.txt

Read Write File
    Create File    ./note.txt    Robot Framework
    ${content}=    Get File    ./note.txt
    Log    ${content}

    Append To File    ./note.txt    \nAutomation Test
    ${updated}=    Get File    ./note.txt
    Log    ${updated}

List Files
    ${files}=    List Files In Directory    ./
    Log    ${files}

Run Command Example
    ${output}=    Run    echo Hello Robot
    Log    ${output}

Environment Variable
    ${path}=    Get Environment Variable    PATH
    Log    ${path}

Copy Move File
    Create File    file1.txt    test

    Copy File    file1.txt    file2.txt
    Move File    file2.txt    ./backup/file2.txt