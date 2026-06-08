# Tutorialspoint Http Status

Source: https://www.tutorialspoint.com/http/http_status_codes.htm

HTTP - Home
HTTP - Overview
HTTP - Parameters
HTTP - Messages
HTTP - Requests
HTTP - Responses
HTTP - Methods
HTTP - Status Codes
HTTP - Header Fields
HTTP  - Caching
HTTP  - URL Encoding
HTTP - Security
HTTP - Message Examples
HTTP - Versions
HTTP - Connection Management
HTTP - Content Negotiation
HTTP - Redirection
HTTP - Authentication and Authorization
HTTP - HTTP over TLS(HTTPS)
HTTP - HTTP/2 and HTTP/3 Features
HTTP - API Design Considerations
HTTP - Troubleshooting
HTTP - Quick Guide
HTTP - Useful Resources
Selected Reading
UPSC IAS Exams Notes
Developer's Best Practices
Questions and Answers
Online Resume Builder
HR Interview Questions
Computer Glossary
Who is Who
HTTP - Status Codes
Previous
Quiz
Next
The Status-Code element in a server response, is a 3-digit integer where the first digit of the Status-Code defines the class of response and the last two digits do not have any categorization role. There are 5 values for the first digit:
Status Code
Description
1xx: Informational
It means the request has been received and the process is continuing.
2xx: Success
It means the action was successfully received, understood, and accepted.
3xx: Redirection
It means further action must be taken in order to complete the request.
4xx: Client Error
It means the request contains incorrect syntax or cannot be fulfilled.
5xx: Server Error
It means the server failed to fulfill an apparently valid request.
HTTP status codes are extensible and HTTP applications are not required to understand the meaning of all the registered status codes. Given below is a list of all the status codes.
1xx: Information
Message
Description
100 Continue
Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request.
101 Switching Protocols
The server switches protocol.
2xx: Successful
Message
Description
200 OK
The request is OK.
201 Created
The request is complete, and a new resource is created.
202 Accepted
The request is accepted for processing, but the processing is not complete.
203 Non-authoritative Information
The information in the entity header is from a local or third-party copy, not from the original server.
204 No Content
A status code and a header are given in the response, but there is no entity-body in the reply.
205 Reset Content
The browser should clear the form used for this transaction for additional input.
206 Partial Content
The server is returning partial data of the size requested. Used in response to a request specifying a
Range
header. The server must specify the range included in the response with the
Content-Range
header.
Example
GET /index.htm HTTP/1.1
User-Agent: Mozilla/4.0 
Host: www.tutorialspoint.com
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
The server
response
against the above GET request will be as follows:
HTTP/1.1 200 OK
Date: Tue, 16 Dec 2024 18:59:38 GMT
Server: Apache/2.4.59 (Ubuntu)
Vary: Accept-Encoding,Origin
Content-Length: 20241
Content-Type: text/html; charset=UTF-8
3xx: Redirection
Message
Description
300 Multiple Choices
A link list. The user can select a link and go to that location. Maximum five addresses.
301 Moved Permanently
The requested page has moved to a new url.
302 Found
The requested page has moved temporarily to a new url.
303 See Other
The requested page can be found under a different url.
304 Not Modified
This is the response code to an
If-Modified-Since
If-None-Match
header, where the URL has not
        been modified since the specified date.
305 Use Proxy
The requested URL must be accessed through the proxy mentioned in the
Location
header.
Unused
This code was used in a previous version. It is no longer used, but the code is reserved.
307 Temporary Redirect
The requested page has moved temporarily to a new url.
Example
GET httpbin.org/redirect/1 HTTP/1.1
The server
response
against the above GET request will be as follows:
HTTP/1.1 302 FOUND
Date: Tue, 17 Dec 2024 07:55:56 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 215
Server: gunicorn/19.9.0
4xx: Client Error
Message
Description
400Bad Request
The server did not understand the request.
401 Unauthorized
The requested page needs a username and a password.
402 Payment Required
You can not use this code yet
403 Forbidden
Access is forbidden to the requested page.
404 Not Found
The server can not find the requested page.
405 Method Not Allowed
The method specified in the request is not allowed.
406 Not Acceptable
The server can only generate a response that is not accepted by the client.
407 Proxy Authentication Required
You must authenticate with a proxy server before this request can be served.
408 Request Timeout
The request took longer than the server was prepared to wait.
409 Conflict
The request could not be completed because of a conflict.
410 Gone
The requested page is no longer available.
411 Length Required
The "Content-Length" is not defined. The server will not accept the request without it.
412 Precondition Failed
The pre condition given in the request evaluated to false by the server.
413 Request Entity Too Large
The server will not accept the request, because the request entity is too large.
414 Request-url Too Long
The server will not accept the request, because the url is too long. Occurs when you convert a "post" request to a "get" request with a long query information.
415 Unsupported Media Type
The server will not accept the request, because the mediatype is not supported.
416 Requested Range Not Satisfiable
The requested byte range is not available and is out of bounds.
417 Expectation Failed
The expectation given in an Expect request-header field could not be met by this server.
Example
GET httpbin.org/post HTTP/1.1
The server
response
against the above GET request will be as follows:
HTTP/1.1 405 METHOD NOT ALLOWED
Date: Tue, 17 Dec 2024 07:58:43 GMT
Content-Type: text/html
Content-Length: 178
Server: gunicorn/19.9.0
Allow: POST, OPTIONS
5xx: Server Error
Message
Description
500Internal Server Error
The request was not completed. The server met an unexpected condition.
501 Not Implemented
The request was not completed. The server did not support the functionality required.
502 Bad Gateway
The request was not completed. The server received an invalid response from the upstream server.
503 Service Unavailable
The request was not completed. The server is temporarily overloading or down.
504 Gateway Timeout
The gateway has timed out.
505 HTTP Version Not Supported
The server does not support the "http protocol" version.
Example
GET httpbin.org/status/500 HTTP/1.1
The server
response
against the above GET request will be as follows:
HTTP/1.1 500 INTERNAL SERVER ERROR
Date: Tue, 17 Dec 2024 08:05:12 GMT
Content-Type: text/html; charset=utf-8
Content-Length: 0
Server: gunicorn/19.9.0
Print Page
Previous
Quiz
Next
Advertisements
