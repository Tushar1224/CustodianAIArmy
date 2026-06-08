# Tutorialspoint Http Methods

Source: https://www.tutorialspoint.com/http/http_methods.htm

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
HTTP - Methods
Previous
Quiz
Next
HTTP request methods specifies action to be performed on resources. The set of common methods for HTTP/1.1 is defined below and this set can be expanded based on requirements. These method names are case sensitive and they must be used in uppercase.
Method
Description
The GET method is used to retrieve information from the given server using a given URI. Requests using GET should only retrieve data and should have no other effect on the data.
HEAD
Same as GET, but transfers the status line and header section only.
POST
A POST request is used to send data to the server, for example, customer information, file upload, etc. using HTML forms.
Replaces all current representations of the target resource with the uploaded content.
DELETE
Removes all current representations of the target resource given by a URI.
CONNECT
Establishes a tunnel to the server identified by a given URI.
OPTIONS
Describes the communication options for the target resource.
TRACE
Performs a message loop-back test along the path to the target resource.
GET Method
A GET request retrieves data from a web server by specifying parameters in the URL portion of the request. This is the main method used for document retrieval.
Example
The following example makes use of
GET method
to fetch
index.htm:
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
ETag: "34aa387-d-1568eb00"
Vary: Accept-Encoding,Origin
Content-Length: 20241
Content-Type: text/html; charset=UTF-8
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes, maximum-scale=1">
    <title>Quality Tutorials, Video Courses, and eBooks - TutorialsPoint</title>
    more content
</html>
HEAD Method
The HEAD method is functionally similar to GET, except that the server replies with a response line and headers, but no entity-body.
Example
The following example makes use of
HEAD
method to fetch header information about
index.htm:
HEAD /index.htm HTTP/1.1
User-Agent: Mozilla/4.0 
Host: www.tutorialspoint.com
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
server response
against the above HEAD request will be as follows:
HTTP/1.1 200 OK
Date: Tue, 16 Dec 2024 18:59:38 GMT
Server: Apache/2.4.59 (Ubuntu)
ETag: "34aa387-d-1568eb00"
Vary: Accept-Encoding,Origin
Content-Length: 20241
Content-Type: text/html; charset=UTF-8
You can notice that here server the does not send any data after header.
POST Method
The POST method is used when you want to send some data to the server, for example, file update, form data, etc.
Example
The following example makes use of POST method to send  a form data to the server, which will be processed by a process.cgi and finally a response will be returned:
POST /cgi-bin/process.cgi HTTP/1.1
User-Agent: Mozilla/4.0 
Host: www.tutorialspoint.com
Content-Type: text/xml; charset=utf-8
Accept-Language: en-us
Accept-Encoding: gzip, deflate
Connection: Keep-Alive
This is the request body which we are sending using
POST
method
<?xml version="1.0" encoding="utf-8"?>
<string xmlns="http://clearforest.com/">string</string>
The server side script
process.cgi
processes the passed data and sends the following response:
HTTP/1.1 200 OK
Date: Tue, 17 Dec 2024 05:07:16 GMT
Server: Apache/2.4.59 (Ubuntu)
ETag: "34aa387-d-1568eb00"
Vary: Accept-Encoding,Origin
Accept-Ranges: bytes
Content-Length: 20241
Content-Type: text/html; charset=UTF-8
Connection: Closed
<html>
<body>
<h1>Request Processed Successfully</h1>
</body>
</html>
PUT Method
The PUT method is used to request the server to store the included entity-body at a location specified by the given URL.
Example
The following example requests the server to save the given entity-body in
index.htm
at the root of the server:
PUT /index.htm HTTP/1.1
User-Agent: Mozilla/4.0 (compatible; MSIE5.01; Windows NT)
Host: www.tutorialspoint.com
Accept-Language: en-us
Connection: Keep-Alive
Content-type: text/html
Content-Length: 182
<html>
    <body>
        <h1>Hello, World!</h1>
    </body>
</html>
The server will store the given entity-body in
index.htm
file and will send the following response back to the client:
HTTP/1.1 201 Created
Date: Tue, 17 Dec 2024 12:49:53 GMT
Server: Apache/2.2.14 (Ubuntu)
Content-type: text/html; charset=UTF-8
Content-length: 20241
Connection: Closed
<html>
    <body>
        <h1>The file was created.</h1>
    </body>
</html>
DELETE Method
The DELETE method is used to request the server to delete a file at a location specified by the given URL.
Example
The following example requests the server to delete the given file
index.htm
at the root of the server:
DELETE /index.htm HTTP/1.1
User-Agent: Mozilla/4.0 
Host: www.tutorialspoint.com
Accept-Language: en-us
Connection: Keep-Alive
The server will delete the mentioned file
index.htm
and will send the following response back to the client:
HTTP/1.1 200 OK
Date: Tue, 17 Dec 2024 11:52:10 GMT
Server: Apache/2.2.14 (Ubuntu)
Content-type: text/html; charset=UTF-8
Content-length: 20241
Connection: Closed
<html>
    <body>
        <h1>URL deleted.</h1>
    </body>
</html>
CONNECT Method
The CONNECT method is used by the client to establish a network connection to a web server over HTTP.
Example
The following example requests a connection with a web server running on the host tutorialspoint.com:
CONNECT www.tutorialspoint.com HTTP/1.1
User-Agent: Mozilla/4.0
The connection is established with the server and the following response is sent back to the client:
HTTP/1.1 200 Connection established
Date: Tue, 17 Dec 2024 11:54:12 GMT
Server: Apache/2.2.14 (Ubuntu)
OPTIONS Method
The OPTIONS method is used by the client to find out the HTTP methods and other options supported by a web server. The client can specify  a URL for the OPTIONS method,  or an asterisk (*) to refer to the entire server.
Example
The following example requests a list of methods supported by a web server running on tutorialspoint.com:
OPTIONS www.tutorialspoint.com/index.htm HTTP/1.1
User-Agent: Mozilla/4.0 
Accept-Encoding: gzip, deflate, br
Connection: Keep-Alive
Access-Control-Request-Headers: *
Access-Control-Request-Headers: GET
Origin: *
The server will send an information based on the current configuration of the server, for example:
HTTP/1.1 200 OK
Date: Tue, 17 Dec 2024 12:07:26 GMT
Server: Apache/2.4.59 (Ubuntu)
Content-Type: text/html; charset=UTF-8
Vary: Accept-Encoding,Origin
Access-Control-Allow-Origin: *
Content-Encoding: gzip
TRACE Method
The TRACE method is used to echo the contents of an HTTP Request back to the requester which can be used for debugging purpose at the time of development.
Example
The following example shows the usage of TRACE method:
TRACE / HTTP/1.1
Host: www.tutorialspoint.com
User-Agent: Mozilla/4.0
The server will send the following message in response to the above request:
HTTP/1.1 200 OK
Date: Tue, 17 Dec 2024 12:16:47 GMT
Server: Apache/2.2.14 (Ubuntu)
Connection: close
Content-Type: message/http
Content-Length: 39
Print Page
Previous
Quiz
Next
Advertisements
