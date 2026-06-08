# tutorialspoint-http

Source: https://www.tutorialspoint.com/http/index.htm

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
HTTP Tutorial
Audience
Prerequisites
History and Evolution
How HTTP Works?
HTTP Tutorial Chapters
FAQs on HTTP
The Hypertext Transfer Protocol (HTTP) is an application-level protocol for distributed, collaborative, hypermedia information systems. This is the foundation for data communication for the World Wide Web (i.e. internet) since 1990. HTTP is a generic and stateless protocol which can be used for other purposes as well using extensions of its request methods, error codes, and headers.
This tutorial is based on RFC-2616 specification, which defines the protocol referred to as HTTP/1.1. HTTP/1.1 is a revision of the original HTTP (HTTP/1.0). A major difference between HTTP/1.0 and HTTP/1.1 is that HTTP/1.0 uses a new connection for each request/response exchange, where as HTTP/1.1 connection may be used for one or more request/response exchanges.
Audience
This tutorial has been prepared for computer science graduates and web developers to help them understand the basic to advanced level concepts related to Hypertext Transfer Protocol (HTTP).
Prerequisites
Before proceeding with this tutorial, it is good to have a basic understanding of web concepts, web browsers, web servers, client and server architecture based software.
History and Evolution
HTTP was released in 1991 by Tim Berners-Lee, with the launch of the World Wide Web. Since then, it has evolved and improved for faster and more secure web experiences. Here is a brief timeline of the evolution of HTTP over the years.
HTTP/0.9 (1991):
HTTP was first released in 1991 by Tim Berners-Lee and supported only GET method.
HTTP/1.0 (1996):
It was released in 1996 and supported many other request methods such as POST, PUT, DELETE, etc. and allowed more complex interaction.
HTTP/1.1 (1997):
HTTP/1.1 was released in 1997 and offered various new improvements such as pipelining, persistent connections, efficient caching and additional header fields to improve performance and better control.
HTTP/2 (2015):
HTTP/2 introduced various performance improvements, like, header compression, multiplexing, and server push which helped in reducing the latency.
HTTP/3 (2020):
HTTP/3 is the latest and currently most used version of HTTP. It aims to improve the performance on unreliable networks. It is based on QUIC protocol and reduces the latenct, provides better security and offers faster connection establishment.
How HTTP Works?
HTTP works as request-response model between the client and server. The working of HTTP is mentioned below:
HTTP works on request-response cycle where, first client sends a request to server for resource by searching any url or clicking on any link.
Then, server process the client's request and checks for the existence of requestsed resource.
After processing the request, server sends back the HTTP response along with status code, headers and requested data.
The browser receives the response sent by server and renders the content for users.
HTTP Tutorial Chapters
A list of chapters is mentioned below, which will be covered in this HTTP tutorial.
Overview
Parameters
Messages
Requests
Responses
Methods
Status Codes
Header Fields
Caching
URL Encoding
Security
Versions
Connection Management
HTTP Content Negotiation
HTTP Redirection
Authentication and Authorization
HTTP over TLS (HTTPS)
HTTP/2 and HTTP/3 Features
API Design Considerations
Troubleshooting
FAQs on HTTP
Here are some Frequently Asked Questions(FAQs) on Hypertext Transfer Protocol (HTTP), this section tries to answer them briefly.
Q1. What is HTTP?
The Hypertext Transfer Protocol (HTTP) is an application-level protocol used to deliver data (HTML files, image files, query results, etc.) over web. It establishes communication between clients and servers.
Q2. Explain the difference between HTTP and HTTPS.
The major difference between HTTPS(Hypertext Transfer Protocol Secure) and HTTP(Hypertext Transfer Protocol) is that HTTPS encrypts the data using TLS/SSL making the communication more secure whereas HTTP transmits data in plain text without encryption.
Q3. What are HTTP request methods?
HTTP request methods are actions that specifies operations to be performed on the resource identified by the given Request-URI. HTTP request methods used are : GET, POST, PUT, DELETE, HEAD, and OPTIONS.
Q4. What are HTTP status codes?
HTTP status codes represents status of HTTP requests. Common HTTP status codes are: 200(OK), 404(Not Found), 500(Internal Server Error)
Q5. What is URI?
URI stands for Uniform Resource Identifier. It is a string used to uniquely identify resources on the internet.
Q6. What is caching in HTTP?
Caching in HTTP improves the performance and reduces server load as it stores the copies of responses on client's device or server to reuse them for future requests rather than fetching them again and again.
Q7. What is the role of HTTP headers?
HTTP headers is used to provide the metadata about requests and responses such as type of content, caching instructions, cookie information and many more.
Previous
Next
Advertisements
