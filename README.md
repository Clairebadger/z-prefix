# z-prefix
# A few added features:

Data validation:
-Does not allow duplicate usernames
-passwords must be at least 8 characters in length with letters and numbers
-All fields are required for sign up and create post
-Max characters for fields are checked by the server, error status is sent if user tries to input more

Logout button!

## Note about heroku

I am using the free version, and the app has been running fine overnight and i  am pushing some final changes today
However, I did recieve an error that crashed my frontend about the available memory
Added this environment variable to fix it: NODE_OPTIONS: --max_old_space_size=1024
This avoids having to buy a premium account, I am somewhat nervous about the error happening again so please contact me if the frontend won't spin up
