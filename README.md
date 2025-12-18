# PictoPlanner
## Deployment fully Dockerized:
To Deploy all Services to Dockercontainer, download the repository from the branch Deploy.
Alternatively you can Clone it by typing:
`git clone -b Deploy https://github.com/hund555/Pictogram_3_Semester.git `.
To start the build use the `build.sh` script (for Linux Systems) or run: `docker compose up --build -d` (Windows only);


## Deployment partialy Dockerized and only for Developement (This versions frontend only runs dev not build)
This option is for, when you only want the API and the Database dockerized but the React running in dev localy.
To accomplish that you download the Version from the master branch, go in to the PictogramAPI folder and do a `docker compose up --build -d`
Afterwards you can go in to the React_Webapplication folder and do `npm install` and run `npm run dev`







## Docker Setup
In the Compose script for the fully Dockerized Deploy the communication between the API and MongoDB is fully isolated, to ensure a secure communication and higher security

