<div align="center">
<img src='gen_readme.png'>
<h3 style="text-decordation:none;">Gen</h3>
<p>Create any kind of event in sync with Google Calendar.</p>
</div>
<br>
<br>
  
  
# Run the application 
You have two options for testing and using GEN.    
                       
## Run GEN live on the Web
You can view the application directly in your browser at the following [link](http://genevents.herokuapp.com/).    

## Run GEN locally
Once [Node.js](https://nodejs.org/en/), [Npm](https://www.npmjs.com/), and [Git](https://git-scm.com/) are installed on your computer, go to the local directory of your choice from your terminal, and run the following command:  
 
```  
git clone https://github.com/MichelML/q.git
```  

Now the project being on your computer, you can preview the application locally by following these steps:  
  
1. Go to the `dist` folder of the project directory  
2. Run the command `node index.js` in your terminal  
3. View the application in your favorite browser at the following address: `http://127.0.0.1/8080`  
<br>
<br>  
  
# Edit the application  
After cloning the project on your computer, you can also edit the application to your taste.  

## A note on the build process  
This application also comes bundled with Gulp and basic build tasks helping you move from the development version of the project to distribution. After cloning the repository, run the following command from the project's root directory (`q/`) to install all dependencies of the build process:   

```  
npm install
```   

Once all the dependencies are installed, you can run the default Gulp process by typing the following command in your terminal:   

```
gulp
```  

You can also run independent tasks by running the following command:   
 
```
gulp <name of the task>
```    

To learn more about what is Gulp and how to use it, [visit Gulp's website](http://gulpjs.com/).        
<br>
<br>
# Technology stack    
As of the last edit of this README, GEN is mostly supported by the following technologies:
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
* [Google Maps API](https://developers.google.com/maps/web/?hl=en) - Search for event locations      
* [Google People API](https://developers.google.com/people/) - Access user's contacts to invite them as guests    
* [Google+ API](https://developers.google.com/+/web/api/rest/) - Access user's profile    
<br>

## Contributors
to be completed   

  
## MIT License    
Copyright (c) 2016 Michel Moreau  
  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.  
