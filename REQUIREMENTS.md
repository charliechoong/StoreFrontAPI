# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Get all products: '/products' [GET]
- Get the details of a product: '/products/:product_id' [GET]
- Create a new product: '/products/create' [POST] [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Get all users: '/users' [GET] [token required]
- Get details of a user: '/users/:user_id' [GET] [token required]
- Create a new user: '/users/create' [POST] [token required]

#### Orders
- Get the current order of a user: '/orders/:user_id' [GET] [token required]
- [OPTIONAL] Completed Orders by user (args: user id) [token required]

## Data Shapes
#### Product
- **id** : serial (primary key)
- **name** : varchar(100)
- **price** : numeric
- [OPTIONAL] category

#### User
- **id** : serial (primary key)
- **firstName** : varchar(50)
- **lastName** : varchar(50)
- **password** : varchar(100)

#### Orders
- **id** : serial (primary key)
- **id of each product in the order** : integer[] (array of foreign keys to **Product**)
- **quantity of each product in the order** : integer[] 
- **user_id** : integer (foreign key to **User**)
- **status of order** : varchar(50) (**Possible Values**: "active", "complete")
