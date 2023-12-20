# Creating a New API Call Type

To create a new API call type, follow these steps:

## Step 1: Create a New API Call Class

1. **Create a New JavaScript File:**
   Create a new JavaScript file for your API call type, e.g., `NewAPICall.js` in the 'apiCalls' directory.

2. **Import Required Dependencies:**
   Import necessary dependencies. For instance, you may need to import the `Caller` class or other modules.

   ```js
   import Caller from "./apiCalls/Caller.js";
   ```

3. **Extend the `Caller` Class:**
   Extend the `Caller` class to create your new API call type.

   ```js
   export default class NewAPICall extends Caller {
       constructor() {
           super("newAPICall"); // Provide a unique call pointer to your api call. This will call this api call like "website.com/newAPICall"
       }

       // Implement the onCall method to define the functionality of your API call
       onCall(data) {
           // Add your API call logic here. Data represents the arguments given in the call
       }
   }
   ```

## Step 2: Register Your New API Call

1. **Modify `API.js`:**
   Import your new API call type into `API.js` and register it within the `registerCalls` method.

   ```js
   import NewAPICall from "./apiCalls/NewAPICall.js";

   export default class API {
       static registerCalls() {
           // Register your new API call type
           Caller.registerCall(new NewAPICall());
           // Other existing registrations...
       }

       // Other existing methods...
   }
   ```

2. **Register in `Caller` Class:**
   Ensure your new API call type extends the `Caller` class and defines its behavior in the `onCall` method.

3. **Testing:**
   Test your new API call type by invoking it as part of your application logic.