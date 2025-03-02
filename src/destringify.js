//This is a "one size fits all" solution to destrigification.  
//An object that has properly formed json, whether it be a string,
//json, or an array; will be returned as an object.  Any level of 
//stringification can exist at any point.  The object will always
//be returned fully parsed.  

function destringify(json) {
    while (typeof json === 'string') {
      json = JSON.parse(json);
    }
  
    if (typeof json === 'object') {
      for (let key in json) {
        if (typeof json[key] === 'string') {
          try {
            let parsedJson = JSON.parse(json[key]);
            
            while (typeof parsedJson === 'string') {
              parsedJson = JSON.parse(parsedJson);
            }
  
            // Check if the parsed result is an object or array
            if (typeof parsedJson === 'object' || Array.isArray(parsedJson)) {
              // Recursively search and parse the parsed JSON
              destringify(parsedJson);
  
              // Update the value in the original JSON structure
              json[key] = parsedJson;
            }
          } catch (error) {
            // String is not a valid JSON, ignore it
          }
        } else if (typeof json[key] === 'object') {
          // Recursively search and parse the nested JSON structure
          destringify(json[key]);
        }
      }
    }
    //console.log('destringify = ', json);
    return json;
  }

  module.exports = destringify;