# Expensify Take-Home

<br />

## Write-up

This write-up only includes timeframes for each task. There were moments that were unrelated to
a specific task but took time to do such as refactoring that are not included in the timeframes.

### 1. Sign in Page

#### 1.2 Visuals
The visuals took ~ **3 hours** total to complete.

I started creating the visuals for the app by creating a wireframe in Excalidraw of how I was going to create the elements.
Once I had a general idea of how to create them, I then created a Figma design based on the Expensify website (Which I take heavy
inspiration from and practically clone).

With a firm foundation, I jumped into the code. Given the wireframe I created in Excalidraw it was straightforward to take what I
had and code it in HTML. I made an emphasis to keep classes reusable in case I needed them later in the app (which I did need).
It took me roughly 1 hour to create the mobile view and 1 hour for the desktop.

#### 1.3 Sign in feature

The Sign in feature took ~ **5 hours** to complete.

I never used PHP before and have only heard of it so I started by taking a look at the PHP documentation's Getting
Started guide to get familiarized with it. Once I had a general understanding I then needed a server that I could use locally
with PHP, so I searched for it and found a method with apache2 and php built in web server. I chose the built in web server
for it's ease of use in a development environment.

Then, I needed a way to fetch data asynchronously. I usually use axios but with the restrictions and ability to use jquery I
opted for the jquery ajax method. I had used it before but I wanted a refresher on it so I looked at the documentation and
referenced StackOverflow for anything that I couldn't easily understand in the documentation.

The most secure way I found to make an API call would be outside of JavaScript which would make PHP perfect. In earlier steps
an API proxy was mentioned but I was shaky on knowing what it was. So I read multiple articles covering API proxies and once I
realized it's somewhat of a middleman for the client to communicate with the server I set it aside to come back to later.

I still did not touch the API and wanted to see what data I was working with so I started testing the POST authentication endpoint.
This was where the **first challenge surfaced** I was getting 400 status codes whenever I made a request. I knew the problem was on my
end and started by comparing my parameters with the parameters in the Expensify API documentation. They were the same. Then I
googled how to make a post request with PHP and found a StackOverflow article that used a header of
`Content-type: application/x-www-form-urlencoded\r\n`. I was using a `json/application` header. I updated my header in Postman
and retested the auth POST endpoint with success!

Once I knew the data I was working with I jumped into javascript and implemented ajax paired with promises for making asynchronous calls.
I wanted to keep some keys inaccessible from the client so I kept them in the PHP environment. I created the API proxy for POST requests
to the auth endpoint and used the article I mentioned earlier for getting that up and running. There were other options like cURL that
could have been used for making the API calls but I wanted to only use the tools I needed for the job so I opted for the PHP built-ins.

#### 1.4 Auto sign in feature

Auto sign in took ~ **1 hour 30** minutes to complete.

**The challenge** here was figuring out how to skip the login form if an authToken was present in cookies. I had never used cookies
So I got a foundation on what cookies is by reading some articles and how to use them by checking out MDN and finally I filled in the
knowledge gaps with a video I found on youtube about what cookies are and how to use them.

Once I got the foundation I created a JavaScript file that would add cookies for me and get all cookies for me in an object format
or a single cookie. I used an object instead of an array in order to have constant time in data retrieval.

Once I was able to use cookies. I implemented authToken storage into my app and added the feature that would jump from the login page to
the transactions page if an auth token was present.

#### 1.5 Error handling

Error handling took ~ **1 hour** to complete.

This was a straightforward task. The object returned from the auth POST endpoint is an object with a JSON status code that I used
in the case of an email or password error. Based on the error I populated a unique error message for email or for password.

### 2. Transactions Page

#### 2.2 Visuals

Visuals took ~ **7 hours** to complete

I started off by designing the mocks in Figma for both mobile and desktop views. Once that was done I created wireframes in Excalidraw.

Then, I worked on creating the transactions card component that was going to be dynamically rendered on the screen. I first started crafting it
with HTML and once I had the classes and layout I created a function in javascript that would create the component for me and with parameters that
could be used to feed it data.

Once that was done I looked into how to render the data on the page without populating all the 1000s of transactions at once so I opted for an
infinite-scroll inspired feature. I researched through some articles and eventually found a nice video on youtube detailing the infinite scroll
feature. My biggest takeaway here was how I could use scrollY, innerHeight, and scrollHeight to get it implemented.

For the transactions page, I worked on going mobile-first and expanded from there. I made the header stay positioned to the transactions portion of
the page while also implementing overflow for scrolling. Then I added the sidebar to the app and also uniquely styled it depending on the
viewport size. I'm a fan of tailwinds breakpoints so I used their defaults for the media queries in my project for consistency.

Finally, I ended the visuals with the refactoring of my components to make them resusable.

#### 2.3 Retrieving and Displaying transactions from Expensify API

Retrieving transactions took ~ 2 hour to complete.

Here development went more smoothly, I had a genuine idea of how the API was going to work and how the proxy was going to be implemented so
I just followed the same steps as I did when creating a post request by following the same resources. The only time-consuming part of this task was
creating the methods needed for using the data to populate the page without overloading it with elements. So I created a counter that I would use to
access elements within the transactions list that was retrieved from the API. The counter would keep track of which transaction to access within
transaction list and add it to a new array so we knew what data we had in the list the client is seeing.

#### 2.4 Creating form that posts transaction

Implementing took ~ 1 hour to complete.

The form creation took some tinkering to do. I wanted to reuse the form element that I had created for the login form so I took that and added
an id to it to make it uniquely the transactions page. Then I also refactored the inputs to also be somewhat reusable based on the login forms
inputs. and implemented the logic in JavaScript with views and controllers for displaying data.

### 3. Hosting a basic PHP environment

Hosting and figuring out how to took ~ **2 hours** total to complete.

I started by creating my AWS EC2 Ubuntu instance and installed PHP and node on it. For some reason, I had an issue where I couldn't ssh into the
instance so I edited my security groups to fix that issue. I followed an article I wrote on
[How to SSH into AWS EC2 instances easily](https://dev.to/ec_rilo/how-to-ssh-into-ec2-instances-easily-2708) so I wouldn't have to ssh with large
commands repeatedly.

I've worked with AWS before, **The challenge** here was being able to deploy a PHP application and host it on AWS. I had only deployed applications
express and node. So I first looked to see if there was a simple guide that would let me deploy a PHP app but most consisted of deploying an app with
extra services like MySQL, MariaDB, puTTY, and other services I didn't need. So I narrowed my search for how to deploy a PHP app locally with only
the bare minimum resources needed since I didn't need a database and eventually funneled down to only needing apache2.

I installed apache2 and first tested to see if the basic page was able to be viewed from the web and when I was successful with that I then went on to
upload my zipped project file to the instance and replace the default page. Once I did that by moving my files to `/var/www/html/` I did a final
test to see if it was viewable on the web and was successful there!

<br />

## Getting Started
Please visit the application at [http://52.53.171.190/](http://52.53.171.190/) on any device.

### Login Form
Once you are in the application, if you are not signed in, a login form should appear.
Please enter your credentials to continue and when ready click the green `sign in`
button.

**Required credentials**:
- Email
- Password

If you already signed in before and your authorization token hasn't expired you should
automatically sign in to your session.

### Transaction Page
Once logged in, your transactions should load onto the screen. To add a transaction, please fill
in the information on the Add Transaction pane.

**Required information**:
- Date
- Amount in cents
- Merchant

Once information is filled, please click on the
`Add` button. If visiting on a mobile device, please click on the `Add Transaction` button which
will bring up the `Add Transaction` pane, allowing you to fill out the required fields.

Refresh the page to see the transactions displayed in creation order.

<br />

## Tech Stack
- JavaScript
- HTML
- CSS
- PHP
- AWS
- Apache2
