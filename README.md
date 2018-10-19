# LYSKALAN 2018 Session 6

This site was created for LyskaLAN 2018 Session 6 LAN event. Site uses express NodeJS with MongoDB as a DB. Frontend uses mostly plain JS with some Jquery and other smaller libs. This site also used Bulma css framework. Site is in finnish.

Pictures:
------

Homepage. Used for reserving place.
![Homepage](https://i.imgur.com/q04AO3i.png)

Admin panel. Used for controlling reservations.
![Admin Panel](https://i.imgur.com/TZxxjXl.png)

Music request control panel. Works but not finished. 
![Music request](https://i.imgur.com/8TpCq1S.png)

Install:
------

1. Clone the repo
2. Use `npm install` and install every package
3. Create a `.env` file on `root` of this project and customize options
```
#.env file
#SERVER
PORT=80

#COOKIE SETTINGS
COOKIE_HTTPS=false
COOKIE_SECRET="custom cookie secret"

#DB
DB="mongodb+srv://mongodbpath
```
4. Create new folder `private` and make sub-jsonfile called `SECRET.json` and customize login info. Use sha256 to encrypt it.
```
{
    "username": "admin",
    "password": "5E884898DA28047151D0E56F8DC6292773603D0D6AABBDD62A11EF721D1542D8"
}
```
5. Run the server: `node app`

NOTE:
------
This project is not perfect.