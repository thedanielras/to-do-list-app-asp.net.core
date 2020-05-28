# https://hub.docker.com/_/microsoft-dotnet-core
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY *.sln .
COPY ToDoList/*.csproj ./ToDoList/
RUN dotnet restore
WORKDIR /source/ToDoList

# copy everything else and build app
WORKDIR /source
COPY ToDoList/. ./ToDoList/
WORKDIR /source/ToDoList
RUN dotnet publish -c release -o /app 

# final stage/image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY sh/. ./
RUN chmod +x wait-for-it.sh
COPY --from=build /app ./

# wait for db access and run
ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--", "dotnet", "ToDoList.dll"]
