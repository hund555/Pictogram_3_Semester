# PictoPlanner
Test live version [here](http://49.13.17.29:49732)
## Important note:
  Make sure to go in to PictogramAPI and change the CORS origin in Program.cs before Building.
  This is how:
  1. Go in to the projects root folder (`Pictogram_3_Semester`).
  2. Go in to the `PictogramAPI` folder.
  3. Edit the file using your Texteditor of choice (fx. `vim`).
  4. Find the line: `policy.WithOrigins("http://localhost:49732") // React dev server` (should be line 64)
  5. Change the line to `policy.WithOrigins("http://your-server:<your-custom-port"<)`
  6. Save the file.

  Now you should be able to build the code without any issues.
## Download:
  Download the repository from the branch [Deploy](https://github.com/hund555/Pictogram_3_Semester/tree/Deploy).

  Alternatively you can Clone it by typing:

  `git clone -b Deploy https://github.com/hund555/Pictogram_3_Semester.git `.

## Deployment fully Dockerized:
This option is for a full and quick deploy on a single server.

### Build on Linux:
  To start the build:
  1. Go in to the projects root folder (`Pictogram_3_Semester`).
  2. Change the permissions for the build-script:  `chmod -x build.sh` or `chmod 775 build.sh`.
  3. Run `./build.sh`.
  Now it should be compiling and building the container.
  
  In the end, it should show you the container.

### Build on Windows:
Use cmd:
 1. go in to the folder.
 2. run: `docker compose up --build -d`.

## Deployment Partialy Dockerized (API and MongoDB) for Deployment
This option is for a partialy dockerized environment where API and MongoDB get dockerized seperate from React (fx if you want the React Frontend to run on a different server).

### Build API and MongoDB:
  1. Go in to the root folder (`Pictogram_3_Semester`)
  2. Now go in to `PictogramAPI`. 
  3. Run `docker compose up --build -d`.

### Build React
  This part is, when you want React to run dockerized (fx. on a different server)
  1. Go in to the root folder (`Pictogram_3_Semester`).
  2. Go in to `React_WebApplication`.
  3. Run `docker compose up --build -d`.

  Alternatively, if you don't want React dockerized
  1. Go in to the projects root folder (`Pictogram_3_Semester`).
  2. Go in to `React_WebApplication`.
  3. Run `npm install`
  4. Run `npm run build`


  Make sure to go in to the `backend_Address.json` and set `ipaddress: "apiserver"` to `ipaddress: "<your-api-server-ip>"`

## Deployment partialy Dockerized for Developement (This versions frontend only runs dev not build)
  This option is for, when you only want the API and the Database dockerized but the React running in dev localy.
### Download:
  To accomplish that you download the Version from the master branch.
	Alternatively use the command `git clone -b Deploy https://github.com/hund555/Pictogram_3_Semester.git`.
### Build:
Go in to the projects root folder (`Pictogram_3_Semester`).
  1. go in to the `PictogramAPI` folder.
  2. run `docker compose up --build -d`
	
  Afterwards you can go in to the React_Webapplication folder and do `npm install` and run `npm run dev`







## Docker Setup
In the Compose script for the fully Dockerized Deploy the communication between the API and MongoDB is fully isolated, to ensure a secure communication and higher security

