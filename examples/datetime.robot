*** Settings ***
Library    DateTime

*** Test Cases ***
Get Current Date
    ${now}=    Get Current Date
    Log    ${now}

Get Current Date Custom Format
    ${now}=    Get Current Date    result_format=%Y-%m-%d %H:%M:%S
    Log    ${now}

Add Days
    ${new_date}=    Add Time To Date    2025-03-19    5 days
    Log    ${new_date}

Subtract Hours
    ${new_date}=    Add Time To Date    2025-03-19 10:00:00    -2 hours
    Log    ${new_date}

Convert Date Format
    ${date}=    Convert Date    19-03-2025    date_format=%d-%m-%Y    result_format=%Y/%m/%d
    Log    ${date}

Time Difference
    ${diff}=    Subtract Date From Date    2025-03-20    2025-03-19
    Log    ${diff}

Timestamp Example
    ${ts}=    Get Current Date    result_format=epoch
    Log    ${ts}

Check Expiry Date
    ${today}=    Get Current Date    result_format=%Y-%m-%d
    ${expiry}=   Add Time To Date    ${today}    7 days

    Log    Today: ${today}
    Log    Expiry: ${expiry}