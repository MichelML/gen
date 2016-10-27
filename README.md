<div align="center">
<img src='gen_readme.png'>
<h3 style="text-decordation:none;">GEN</h3>
<p>Create any kind of event in sync with Google Calendar</p>
</div>
<br>
  
# Synopsis   
*GEN* lets you create any kind of event in sync with Google Calendar. The application allows someone to name their event, search for a host location, invite guests, set the start and end dates and times, and input a description of the event.  
                       
# Deployed version
You can use the live version of *GEN* in your favorite browser at the [following link](http://genevents.herokuapp.com/).    

# Local version
You can also run *GEN* locally by following all the steps below.

## Prerequisites

#### Installs
First, you need to have installed [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), [Git](https://git-scm.com/), and [PostgreSQL](https://www.postgresql.org/download/) on your computer.   

#### PostgreSQL Setup
  
Also, before you go further, make sure to [set up a PostgreSQL database](http://www.techrepublic.com/blog/diy-it-guy/diy-a-postgresql-database-server-setup-anyone-can-handle/) on your computer for this project, and to possess the [URI](http://www.starkandwayne.com/blog/using-a-postgres-uri-with-psql/) for this database. The URI should look similar to this one:  

```  
postgres://USERNAME:PASSWORD@localhost:5432/DATABASENAME
``` 
Note that you might not need to provide a password if your local PostgreSQL user does not need one. In this case, the URI shoud look similar to the one below:  

```  
postgres://USERNAME@localhost:5432/DATABASENAME
```   

#### Google API Console Project Setup
Since this project is using multiple APIs from Google, your next task is to initiate a project on the [Google API Console](https://console.developers.google.com/project/_/apiui/apis/library):
  
  1. Go to the [Google API Console](https://console.developers.google.com/project/_/apiui/apis/library)   
  
  2. From the project drop-down, create a new project by selecting **Create a new project**.  
  

#### Google OAuth 2.0 Client ID setup  
Gen also allows users to authenticate with Google Sign-In. To setup this feature, we will need a Google OAuth 2.0 Client ID. Always from the [Google API Console](https://console.developers.google.com/project/_/apiui/apis/library), follow these steps (inspired from [Google's documentation](https://developers.google.com/identity/sign-in/web/devconsole-project)):
  
  1. In the sidebar under "API Manager", select **Credentials**, then select the **OAuth consent screen** tab.  
  
    * Choose an **Email Address**, specify a **Product Name**, and press **Save**.  
    
  2. In the **Credentials** tab, select the **New credentials** drop-down list, and choose **OAuth client ID**.  
  
  3. Under **Application type**, select **Web application**. Register the origins from which your app is allowed to access the Google APIs, as follows. An origin is a unique combination of protocol, hostname, and port.  
  
    * In the **Authorized JavaScript origins** field, enter the origin for your app. You can enter multiple origins to allow for your app to run on different protocols, domains, or subdomains. For our purpose, we will use the following url: 
    
    ```
    http://localhost:3000  
    ```  
    
    * In the **Authorized redirect URI** field, we will enter the following URI:  
    
    ```  
    http://localhost:3000/googleauth
    ```    
    
    * Press the **Create** button.  
    
#### Google Places API Web Service Key
The last thing to do in the [Google API Console](https://console.developers.google.com/project/_/apiui/apis/library) is to obtain an API key for the Google Places API Web service that *GEN* uses to help users find an event's location more easily. To obtain this API key, follow these steps:  
  
  1. Go to the Google API Console via this [specific link](https://console.developers.google.com/flows/enableapi?apiid=places_backend&reusekey=true).  
  
  2. Select your project.  
  
  3. Click Continue to enable the API.  
  
  4. On the Credentials page, get an API key.  
  
  5. In the **Accept requests from these HTTP referrers (web sites)** field, enter the following url:  
  
  ```  
  http://localhost:3000/*  
  ```  
  
#### Nodemailer setup 
The last prerequisite before cloning the repository is to make sure you prepare a valid URI to create your [SMTP](https://github.com/nodemailer/nodemailer#send-using-smtp) transporter object for sending E-mails via [Nodemailer](https://github.com/nodemailer/nodemailer). You can easily do this if you have a gmail address, in which case your URI should look similar to this one:  
  
```
smtps://user%40gmail.com:YOURGMAILPASSWORD@smtp.gmail.com  
```  
where `user%40gmail.com` represents your gmail address with the exception that the character `@` is replaced by `%40`.  

Nonetheless, to use Gmail you may need to configure "[Allow Less Secure Apps](https://www.google.com/settings/security/lesssecureapps)" in your Gmail account unless you are using 2FA in which case you would have to create an [Application Specific](https://security.google.com/settings/security/apppasswords) password. You also may need to unlock your account with "[Allow access to your Google account](https://accounts.google.com/DisplayUnlockCaptcha)" to use SMTP.


## Additional steps required

#### Step 1: Clone the github repository

Move to an empty directory on your computer and clone the github repository with the following command:  

```  
git clone https://github.com/MichelML/gen.git
```  
After this command is executed,  move to the local directory created for the cloned github repository. It should be named `gen`.

#### Step 2: Install project dependencies
To install all the module dependencies of the project, run the following command on your computer:  

```
npm install  
```  
This could take a few minutes or less.

#### Step 3: Environment variables
Open the `.env` file in your favorite text editor. The file should look exactly like this:   

```  
PORT=3000  
TOKEN_DIR=tks/google
NODE_ENV=development
GMAP_KEY=enter your Google API Web Service key goes here
GAPIS_CLIENT=enter your Google OAuth 2.O Client ID
GAPIS_SEC=enter your Google OAuth 2.O Client secret
DATABASE_URL=enter your PostgresSQL Database URI
MAIL_TRANSPORTER=enter your SMTP transporter URI
EMAIL_ADDRESS=enter your email address - should be the same as the one utilized with the SMTP URI
ORIGINE_URI=
REDIRECT_URI=
```  
For the `PORT`, `TOKEN_DIR`, `NODE_ENV`, `ORIGINE_URI`, and `REDIRECT_URI` variables, leave what is after the equal sign as is. The `ORIGINE_URI` AND `REDIRECT_URI` are left empty because these are utilized only if the application is deployed remotely.  

For the variables having instructions after the equal sign, please use the information you have gathered in the prerequisites section to replace those instructions with the proper value needed for each of these environment variables. Once you have completed this step, you can save and close the file.
<br>
<br>  

#### Step 4: PostgreSQL database - creating tables
The final step before finally running the application locally is to create two SQL tables in your PostgreSQL database. To do that, we will run the two SQL scripts that were provided in the GitHub repository. First, run the script to create the `users` table with the following command from within your local version of the GitHub repository:  
  
```  
psql -U yourusername -d yourDatabaseName -a -f userstable.sql
```  

Next, run the script to create the `events` table iwth the following command:  
   
```
psql -U yourusername -d yourDatabaseName -a -f eventstable.sql
```  
If you are the root user, you might not need to provide a user name and run the scripts with simplified commands:  

```
psql -d yourDatabaseName -a -f userstable.sql
```  

```
psql -d yourDatabaseName -a -f eventstable.sql
```  

#### Step 5: Run the application  
With all these efforts, it is now time to run the application with the following command from the local version of the github repository:  

```
node app
```  

#### Step 6: Edit the application (optional) 
After completing the prerequisites and steps 1 to 5, feel free to start editing the application to your taste. If you are to edit the views or elements in the `public` folder, make your edits in the `views_src` and the `public_src` first, and run the following command before rerunning the app:  

```  
gulp move-views && gulp
```
If you are to add images to the application, you can either add them directly in the `public/img` folder, or add them in the `public_src/img` folder and run:

```  
gulp move-img
```  

Lastly, if you were to take the time to human read `gulpfile.js`, you could also decide to run specific tasks with the following command:  

```  
gulp <name of the task>
```  

# Technology stack    
As of the last edit of this README, *GEN* is mostly supported by the following technologies:
#### Web framework  
* [Express](http://expressjs.com/) - Minimalist web framework for Node.js

#### Database
* [PostgreSQL](https://www.postgresql.org/) - Open source SQL database for users and events storing
    
#### Design    
* [Materialize](http://materializecss.com/) - Material Design appearance of the application  
* [Google Fonts](https://www.google.com/fonts) - Fonts of the application  
  
#### DOM manipulation   
* [jQuery](https://jquery.com/) - DOM selection, animation, and event handling   
  
#### Tailored inputs
* [Selectize](https://selectize.github.io/selectize.js/) - Integration of a textbox/\<select\> hybrid input for selecting guests for an event
* [Pickadate](http://amsul.ca/pickadate.js/) - Mobile-friendly and responsive jQuery date and time input picker

#### Templating 
* [Pug](https://github.com/pugjs/pug) - Cleaner html allowing back-end to front-end data injection and conditionals

#### Emailing module
* [Node-mailer](https://github.com/nodemailer/nodemailer) - E-mail sender via  Node.js

#### Data-binding and MVVM framework    
* [Knockout.js](http://knockoutjs.com/) - Data-binding and MVVM framework    
  
#### Local storage technology    
* [localForage](https://github.com/localForage/localForage) - Augmented client side storage functionalities for faster info retrieval
  
#### Development    
* [Gulp](http://gulpjs.com/) - Build process and automation of various development tasks (see `gulpfile.js` for all gulp packages utilized)     

#### API  
* [Google Places API Web Service](https://developers.google.com/maps/web/?hl=en) - Search for event locations    
* [Google Maps API](https://developers.google.com/maps/web/?hl=en) - Search for event locations        
* [Google People API](https://developers.google.com/people/) - Access user's contacts to invite them as guests    
* [Google+ API](https://developers.google.com/+/web/api/rest/) - Access user's profile    
* [Google Calendar API](https://developers.google.com/google-apps/calendar/) - Insert events in user's and guests' calendars
<br>

## Contributors
Michel Moreau - [michel.moreau.lapointe@gmail.com](mailto:michel.moreau.lapointe@gmail.com?Subject=GEN%20Project)
  
## Maintainer 
Michel Moreau - [michel.moreau.lapointe@gmail.com](mailto:michel.moreau.lapointe@gmail.com?Subject=GEN%20Project)
  
## MIT License    
Copyright (c) 2016 Michel Moreau  
  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
