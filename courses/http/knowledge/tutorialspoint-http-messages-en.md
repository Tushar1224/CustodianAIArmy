# Tutorialspoint Http Messages

Source: https://www.tutorialspoint.com/http/http_messages.htm

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
HTTP - Messages
Previous
Quiz
Next
HTTP Message provides a way for communication between a client and server. An HTTP message can be a
request
sent by the client to the server or a
response
sent by the server to the client. HTTP is  based on the client-server architecture model and a stateless request/response protocol that operates by exchanging messages across a reliable TCP/IP connection.
An HTTP "client" is a program (Web browser or any other client) that establishes a connection to a server for the purpose of sending one or more HTTP request messages.  An HTTP "server" is a program ( generally a web server like Apache Web Server or Internet Information Services IIS, etc. ) that accepts connections in order to serve HTTP requests by sending HTTP response messages.
HTTP makes use of the Uniform Resource Identifier (URI) to identify a given resource and to establish a connection. Once the connection is established,
HTTP messages
are passed in a format
similar to that used by the Internet mail [RFC5322] and the Multipurpose Internet Mail Extensions (MIME) [RFC2045]. These messages include
requests
from client to server and
responses
from server to client which will have the following format:
HTTP-message   = <Request> | <Response> ; HTTP/1.1 messages
HTTP Message Components
HTTP requests and HTTP responses use a generic message format of RFC 822 for transferring the required data. This generic message format consists of the following four items.
Message Start Line
Headers
Message Body
In the following sections, we will explain each of the entities used in an HTTP message.
Message Start Line
A start-line will have the following generic
syntax:
start-line = Request-Line | Status-Line
request
message, start line contains HTTP method, request-target and HTTP version. 
      Example: GET /hello.htm HTTP/1.1
response
message, start line contains HTTP version, status code and status message. 
      Example: HTTP/1.1 200 OK
We will discuss
Request-Line
Status-Line
in detail while discussing HTTP Request and HTTP Response messages respectively.
Headers
HTTP header fields provide required information about the request or response, or about the object sent in the message body. There are four types of HTTP message headers:
General-header:
These header fields have general applicability for both request and response messages.
Request-header:
These header fields have applicability only for request messages.
Response-header:
These header fields have applicability only for response messages.
Entity-header:
These header fields define meta information about the entity-body or, if no body is present, about the resource identified by the request.
All the above mentioned headers follow the same generic format and each  of the header field consists of a name followed by a colon (
) and the field value as follows:
field-name ":" [ field-value ]
Following are the examples of various header fields:
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi
Date: Mon, 27 Jul 2009 12:28:53 GMT
Server: Apache
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
Content-Length: 51
Vary: Accept-Encoding
Content-Type: text/plain
Message Body
The message body part is optional for an HTTP message but if it is available, then it is used to carry the entity-body associated with the request or response. If entity body is associated, then usually
Content-Type
Content-Length
headers lines specify the nature of the body associated.
A message body is the one which carries the actual HTTP request data (including form data and uploaded, etc.) and HTTP response data from the server ( including files, images, etc.). Shown below is the simple content of a message body:
<html>
   <body>
      <h1>Hello, World!</h1>
   </body>
</html>
Next two chapters will make use of above explained concepts to prepare
HTTP Requests
HTTP Responses
Print Page
Previous
Quiz
Next
Advertisements
