const options = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'ru',
    'Cache-Control': 'max-age=0',
    Cookie: '__ddg1_=3J9a5pxkuSUQpora1qgK; _xsrf=e74df7142a1345b60bc9cb0f9f8374c1; region_clarified=NOT_SET; display=desktop; crypted_hhuid=C5C2B2F69A1FD631D09C28C1213D3AF660117CEB60B8E9E2028EA7EF01CD04EF; hhtoken=zgg6V_YulzB7dod6afw0nkT5aEgL; hhuid=FimtIRj2n!Az8mX5upApEw--; GMT=7; tmr_lvid=d2fce16ba0954a8ccbd3302c19aa9baf; tmr_lvidTS=1710865043565; iap.uid=d7ae7f017e764a7f829632eef6bfffc5; hhrole=applicant; redirect_host=zima.hh.ru; crypted_id=46C8FF7D3999AB95861D644C320F9D79A5471C6F722104504734B32F0D03E9F8; hhul=01f5425aef3ce22b42099c61b1c208df0d02bf8169448b52ae8529d78e9fb3fa; _hi=161146200; total_searches=2; regions=54; __zzatgib-w-hh=MDA0dC0pXB4IH04NIH5rL2R7RSRfHDx1ZS9DcHNbcWdQZXhbIkhYUQomHxYwbVZYPA1bcElwey1BbCVnTF5TdVp/ayELUTQ1ZhBKT01HMzg/aH0eVBw5VREPFhI2FyMSfmwkTwkOW0BCdHMvN1dhMA8WEU1HDTJoUXtMZxUTRkIce3AtLGxzVycyOSdQfyIKay8LEn1sJFMNDVs9M2llaXAvYCASJRFNRxhFZFtCNigVS3FPHHp2X30qQmYeX0lcH0ZWVHksFXtDPGMMcRVNCA03QFx/V2pbORdYCRQKQ2VbSj03FVlSdSlufTowG0VXIRpQYlBJWQo3WUxHM3FUDBA/YUFycTEpQWVOZ00SI0RHSWtlTlNCLGYbcRVNCA00PVpyIg9bOSVYCBI/CyYgEnhrJVJ/DlxEQXVvG382XRw5YxEOIRdGWF17TEA=y7Fh4Q==; __zzatgib-w-hh=MDA0dC0pXB4IH04NIH5rL2R7RSRfHDx1ZS9DcHNbcWdQZXhbIkhYUQomHxYwbVZYPA1bcElwey1BbCVnTF5TdVp/ayELUTQ1ZhBKT01HMzg/aH0eVBw5VREPFhI2FyMSfmwkTwkOW0BCdHMvN1dhMA8WEU1HDTJoUXtMZxUTRkIce3AtLGxzVycyOSdQfyIKay8LEn1sJFMNDVs9M2llaXAvYCASJRFNRxhFZFtCNigVS3FPHHp2X30qQmYeX0lcH0ZWVHksFXtDPGMMcRVNCA03QFx/V2pbORdYCRQKQ2VbSj03FVlSdSlufTowG0VXIRpQYlBJWQo3WUxHM3FUDBA/YUFycTEpQWVOZ00SI0RHSWtlTlNCLGYbcRVNCA00PVpyIg9bOSVYCBI/CyYgEnhrJVJ/DlxEQXVvG382XRw5YxEOIRdGWF17TEA=y7Fh4Q==; tmr_detect=0%7C1711023033535; gsscgib-w-hh=hWoezg2JZEV6q1jqJ8GGR9x/7cp4mlQUlAs3oUOy5X0Cm/cQ33+lXVsW3cdp5CQjcS7Z4Z1uLg/NKYFBMNtTLho35x6jnR1+bEix64KKPKX3gFPSH6EFZDESkIKUvsPpMzTG7Q0TVJcwvhJNZOWjF2X7vmFSbJHi+mZvPZpyMk8jrXd1i8KkOKybPL+7z5l7/RFBgoYo5vC8lk3wrXgW6POftz3bOQFf2L/jh/ylFarU5kvEN+sjQDCu8xQf42ZAlw==; cfidsgib-w-hh=Og5CCCF/3+zOX4oK63P8JzViyi0I2HLtjAV0iihqmlgs5DbEeNQnjQ4hTmYZz+0/r7pTrQ9mLO5bTtiSsqANUebYVvIM/93tD4fPwKv8HoOObXer5+LgjSmSU7Et6zbFrZaj7XNSGQaFe1jVY5e8tybBhEbs9XjkitEJIQ==; cfidsgib-w-hh=Og5CCCF/3+zOX4oK63P8JzViyi0I2HLtjAV0iihqmlgs5DbEeNQnjQ4hTmYZz+0/r7pTrQ9mLO5bTtiSsqANUebYVvIM/93tD4fPwKv8HoOObXer5+LgjSmSU7Et6zbFrZaj7XNSGQaFe1jVY5e8tybBhEbs9XjkitEJIQ==; cfidsgib-w-hh=Og5CCCF/3+zOX4oK63P8JzViyi0I2HLtjAV0iihqmlgs5DbEeNQnjQ4hTmYZz+0/r7pTrQ9mLO5bTtiSsqANUebYVvIM/93tD4fPwKv8HoOObXer5+LgjSmSU7Et6zbFrZaj7XNSGQaFe1jVY5e8tybBhEbs9XjkitEJIQ==; gsscgib-w-hh=hWoezg2JZEV6q1jqJ8GGR9x/7cp4mlQUlAs3oUOy5X0Cm/cQ33+lXVsW3cdp5CQjcS7Z4Z1uLg/NKYFBMNtTLho35x6jnR1+bEix64KKPKX3gFPSH6EFZDESkIKUvsPpMzTG7Q0TVJcwvhJNZOWjF2X7vmFSbJHi+mZvPZpyMk8jrXd1i8KkOKybPL+7z5l7/RFBgoYo5vC8lk3wrXgW6POftz3bOQFf2L/jh/ylFarU5kvEN+sjQDCu8xQf42ZAlw==; gsscgib-w-hh=hWoezg2JZEV6q1jqJ8GGR9x/7cp4mlQUlAs3oUOy5X0Cm/cQ33+lXVsW3cdp5CQjcS7Z4Z1uLg/NKYFBMNtTLho35x6jnR1+bEix64KKPKX3gFPSH6EFZDESkIKUvsPpMzTG7Q0TVJcwvhJNZOWjF2X7vmFSbJHi+mZvPZpyMk8jrXd1i8KkOKybPL+7z5l7/RFBgoYo5vC8lk3wrXgW6POftz3bOQFf2L/jh/ylFarU5kvEN+sjQDCu8xQf42ZAlw==; fgsscgib-w-hh=3tLO30e57eb9352cbde907c6e6ca881659f83935; fgsscgib-w-hh=3tLO30e57eb9352cbde907c6e6ca881659f83935; device_breakpoint=s; device_magritte_breakpoint=s',
    'Sec-Ch-Ua':
        '"Chromium";v="122", "Not(A:Brand";v="24", "Microsoft Edge";v="122"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': 'Windows',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
};

module.exports = options;
