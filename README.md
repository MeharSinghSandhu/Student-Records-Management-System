Commands I have run to setup this directory 

npm create vite@4.1.0
√ Project name: ... Development_Technical_Test
√ Package name: ... development-technical-test
√ Select a framework: » React
√ Select a variant: » TypeScript

cd .\Development_Technical_Test\
npm install

npm run dev

--in between of this I have created a backend folder in which Im going to handle the connection between mysql and node


npm install mysql2

npm install dotenv
-- now I have added a dotenv file to protect sensitive information 

npm install cors
--for server

Then in MYSQL Workbench I created a new schema "student_management_system"

Now I created a new files to impliment sql tables through node 'setupdb.js'
mysql2, which supports Promises, you can make the function more robust by using asynchronous code which will allow for better error handling and flow control.