# Tutorialspoint Http Caching

Source: https://www.tutorialspoint.com/http/http_caching.htm

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
HTTP - Caching
Previous
Quiz
Next
HTTP is typically used for distributed information systems, where performance can be improved by the use of response caches. The HTTP/1.1 protocol includes a number of elements intended to make caching work.
The goal of caching in HTTP/1.1 is to eliminate the need to send requests in many cases, and to eliminate the need to send full responses in many other cases.
The basic cache mechanisms in HTTP/1.1 are implicit directives to caches where server-specifies expiration times and validators. We use the
Cache-Control
header for this purpose.
Cache-Control
header allows a client or server to transmit a variety of directives in either requests or responses. These directives typically override the default caching algorithms. The caching directives are specified in a comma-separated list. For example:
Cache-control: no-cache
Cache Request Directive
The following cache request directives can be used by the client in its HTTP request:
Cache Request Directive
Description
no-cache
A cache must not use the response to satisfy a subsequent request without successful revalidation with
                the origin server.
no-store
The cache should not store anything about the client request or server response.
max-age = seconds
Indicates that the client is willing to accept a response whose age is not greater than the specified
                time in seconds.
max-stale [ = seconds ]
Indicates that the client is willing to accept a response that has exceeded its expiration time. If
                seconds are given, it must not be expired by more than that time.
min-fresh = seconds
Indicates that the client is willing to accept a response whose freshness lifetime is not less than its
                current age plus the specified time in seconds.
no-transform
Does not convert the entity-body.
only-if-cached
Does not retrieve new data. The cache can send a document only if it is in the cache, and should not
                contact the origin-server to see if a newer copy exists.
Cache Response Directive
The following cache response directives can be used by the server in its HTTP response:
Cache Response Directive
Description
public
Indicates that the response may be cached by any cache.
private
Indicates that all or part of the response message is intended for a single user and must not be cached
                by a shared cache.
no-cache
A cache must not use the response to satisfy a subsequent request without successful re-validation with
                the origin server.
no-store
The cache should not store anything about the client request or server response.
no-transform
Does not convert the entity-body.
must-revalidate
The cache must verify the status of the stale documents before using it and expired ones should not be
                used.
proxy-revalidate
The proxy-revalidate directive has the same meaning as the must- revalidate directive, except that it
                does not apply to non-shared user agent caches.
max-age = seconds
Indicates that the client is willing to accept a response whose age is not greater than the specified
                time in seconds.
s-maxage = seconds
The maximum age specified by this directive overrides the maximum age specified by either the max-age
                directive or the Expires header. The s-maxage directive is always ignored by a private cache.
Print Page
Previous
Quiz
Next
Advertisements
