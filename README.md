## What is this project
    - A repository for tools and code that will aid in the development in the AWs environment
    - Included functions
        - destrigify

## What is the destringify function?
    The problem:
        When AWS microservices pass an event from one service to the next; the service 
        wraps the event in meta data and stringifies it.  This is repeated each time a 
        resource is passed. This how events that have variable levels of stringification 
        get continually passed through an distributed AWS flow.  

        An example of a log with single and triple levels of stringification.

        "data":{"Records":[{"messageId":"a59c0eb1-9f86-4e37-8942","receiptHandle":"AQEB95j==","body":"{\n \"Type\" : 
        \"Notification\",\n \"MessageId\" : \"fd8e5d6c-fa6a-5571-9747-3d793a1a926c\",\n \"SequenceNumber\" : \"1000000\",\n 
        \"TopicArn\" : \"arn:aws:sns:us-east-1:6:sf-telematics-trace-test5-enrollment-topic.fifo\",\n \"Message\" : \"
        {\\\"event_code\\\":\\\"EE4220\\\",\\\"event_name\\\":\\\"Registration Reminder-40\\\",
        \\\"source\\\":\\\"EnrollmentLambda-RewriteNewFull\\\",\\\"telematics_enrollment_id\\\":\\\"91511\\\",
        \\\"physical_object_id\\\":\\\"15858412\\\",\\\"agre_index_id\\\":\\\"3530069169\\\",
        \\\"book_of_business_id\\\":\\\"ZS46WM8AL\\\",\\\"product_code\\\":\\\"20\\\",\\\"product_name\\\":\\\"DSSB\\\",
        \\\"enrollment_start_reason_code\\\":\\\"EN-210000\\\",\\\"enrollment_start_date\\\":\\\"2024-12-20\\\",
        \\\"enrollment_effective_date\\\":\\\"2025-02-07\\\",\\\"enrollment_setup_window_end_date\\\":\\\"2025-04-08\\\",
        \\\"enrollment_stop_date\\\":\\\"9999-12-31\\\",\\\"enrollment_complete_date\\\":\\\"2025-02-07\\\",
        \\\"enrollment_consent_date\\\":\\\"2025-01-30\\\",\\\"event_id\\\":\\\"6591cdaa-d0d9-4672-b6d5-2ae5393700d2\\\",
        \\\"timestamp\\\":1738260015994}\",\n \"Timestamp\" : \"2025-01-30T18:00:16.004Z\",\n \"UnsubscribeURL\" : 
        \"https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&
        SubscriptionArn=arn:aws:sns:us-east-1::sf-telematics-trace-test5-enrollment-topic.fifo:c62aa\",\n 
        \"MessageAttributes\" : {\n \"eventTypeCode\" : {\"Type\":\"String\",\"Value\":\"E20\"},\n \"groupId\" : 
        {\"Type\":\"String\",\"Value\":\"Registration Reminder-40\"}\n }\n}","attributes":{"ApproximateReceiveCount":"3",
        "AWSTraceHeader":"Root=1-679bbe24-1a9afbcc0a83d3fb;Parent=f8e463248a4c5;Sampled=1;Lineage=2:573fd71f:0",
        "SentTimestamp":"17382027","SequenceNumber":"18891737812463872","MessageGroupId":"m1","SenderId":"AIDAYRRVD2ENUBX",
        "MessageDeduplicationId":"91768beacb3c9690d0362422141784aaa38c90b"....
        
        Due to the distributed nature of AWS microservice infrastructure, there are a lot of logs/events like this.  
        Logs can be single, double, triple, quadrupled, ect.. stringified at different levels within a json
        structure.
    
    The challenges:
        1. During testing, whether automated or manual, the data must always be correctly strigified.
        2. If a service is called by multiple resources, then input can have variable levels of
           stringification.  
        3. It can make the structures(from logs or elsewhere) difficult to read/edit.

    The solution:
        This function will always return a json object with no stringification.  It will fully parse any json object 
        regardless of the level of stringification at any level within a json object.

    Use cases:
        1. Include this code in a script that can take a “wall of text" as input and convert it into 
           something that is readable and editable.  

        2. Called at the beginning of a lambda so that stringification is completely ignored.  
           This is especially useful when creating custom input for testing purposes.  The test input does not need 
           to be stringified or destringified before being sent into the app.  This applies to unit/integration/manual
           testing.

        3. An applications that has multiple source of input that contain variable levels of strigification. 
           Especially if the app can be subscribed to and the level of stringification that is received in 
           future events is unknown.
    
```javascript
// Example:
// Import the destringify function
import { destringify } from '@statefarmins/destringify-any-json';

// Use it to parse any JSON structure with any level of stringification
const destringifiedJSON = destringify(jsonStructure);
```

## Contacts
    - Eric Schaumburg(Blaane15)
    - Matthew Walden(mwalden2004)