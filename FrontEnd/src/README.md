## ShopForHome
An online shop with the following features:<br><br>
User can:<br>
- login, logout, register.<br>
- view, sort & filter products in different categories.
- add products to shopping card and/or wishlist.
- increase, decrease, or update custom quantity in cart.<br>

Admin can: <br>
- all the above +
- CRUD operations on users & products
- get sales report and product stock. 
- bulk upload products with object template file.
- enable or disable discount option.<br>

Bugs:
- Sometimes changing the category does not refresh the page (Material UI keyframe issues)

Missing features:
- ability to email / mail when a product has a quantity of less than 10. 

Initial start up:
- loaded with 2 users:<br>
username: "admin" password: "admin" role: ADMIN<br>
username: "user" password: "user" role: USER<br>
- some test products

Ports used:
- mysql: 3306
- spring: 8080
- angular: 4200



<br/>

## Tools

| Tool                                                                                    | Used for           | commands      |
|-----------------------------------------------------------------------------------------|--------------------|---------------|
| [IntelliJ](https://www.jetbrains.com/idea/)                                             | Code Editor        |               |
| [PhpStorm](https://desktop.github.com/)                                                 | Code Editor        |               |
| [Docker Desktop](https://www.docker.com/products/docker-desktop/)                       | Manage Docker Pods |               |

## How to spin up via docker-compose
-'cd' into 'ShopBack' directory and run 'mvn spring-boot:build-image -DskipTests' <br>
-'cd' into 'FrontEnd' directory and run 'docker build -t angular-app .' <br>
-'cd' into root directory of the project where the compose.yml and run 'docker compose up'.

<br/>
