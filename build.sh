#fix folders from repository issues
mv React_WebApplication/backend_Address.json react_webapplication/ && mv React_WebApplication/src/Utillity.tsx react_webapplication/src/ && mv React_WebApplication/src/Domain/Tasklist.tsx react_webapplication/src/Domain/
#Building:
docker compose up --build -d
#Confirmation (Displays all Containers)
docker ps -a
#cleanup (Optional)
cd ..
rm -r Pictogram_3_Semester/
