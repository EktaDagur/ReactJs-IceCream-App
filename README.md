# React Test
This project exists to allow the candidate to test their skills in React, their front-end fundamentals and adaptability or proficiency in using Material UI.

## User story
Our goal is to create a web page that will allow users to filter through a catalog of ice cream flavors, add optional toppings and sauces, pick a container, and checkout their cart. The theme of the website should change based on the ice cream selection.
This UI will be styled in [Material UI](https://mui.com/).

Helpful documentation on understanding Material UI styling https://mui.com/guides/api.

We've set up a couple of API endpoints, one of which is "http://localhost:8000/flavors", which returns a list of JSON objects with fields for each flavor's name, description, price, color, allergens, labels, and ingredients.

Here's the response you'll receive if you send a GET request to "http://localhost:8000/flavors?filter=chocolate":
```
[
    {
          "name":"Chocolate",
          "description":"Chocolatey",
          "price": 2.00,
          "color":{
            "primary": "#49291C",
            "secondary": "#C29F7E"
          },
          "allergens": [
              "Eggs",
              "Milk",
          ],
          "labels": [
              "gluten-free",
              "nut-free"
          ],
          "ingredients":[
              "Cream",
              "Skim Milk",
              "Cane Sugar",
              "Cocoa Processed With Alkali",
              "Egg Yolks"
          ]
       },
       {
          "name":"Cookies and Cream",
          "description":"Perfectly Balanced",
          "price": 2.00,
          "color":{
            "primary": "#F5F5F5",
            "secondary": "#2B2625"
          },
          "allergens": [
              "Eggs",
              "Milk",
              "Wheat"
          ],
          "labels": [
              "nut-free"
          ],
          "ingredients":[
             "Cream",
             "Skim Milk",
             "Sugar",
             "Egg Yolks",
             "Vanilla Extract",
             "Wheat Flour",
             "Sugar",
             "Coconut Oil",
             "Soda",
             "Cocoa Processed With Alkali",
             "Baking Chocolate",
             "Salt"
          ]
       },
       {
          "name":"Mint Chocolate Chip",
          "description":"Minty Fresh",
          "price": 2.00,
          "color":{
            "primary": "#57C4C9",
            "secondary": "#362123"
          },
          "allergens": [
              "Eggs",
              "Milk",
              "Soy"
          ],
          "labels": [
              "gluten-free",
              "nut-free"
          ],
          "ingredients":[
             "Cream",
             "Skim Milk",
             "Sugar",
             "Lactose Reduced Skim Milk",
             "Corn Syrup",
             "Egg Yolks",
             "Coconut Oil",
             "Cocoa Powder",
             "Butter Oil",
             "Soy Lecithin",
             "Natural Flavor",
             "Salt",
             "Milk"
          ]
       },
       {
          "name":"Peanut Butter Cup",
          "description":"Sweet and Salty",
          "price": 2.00,
          "color":{
            "primary": "#B27442",
            "secondary": "#473521"
          },
          "allergens": [
              "Eggs",
              "Milk",
              "Soy",
              "Peanuts",
              "Tree Nuts",
              "Wheat"
          ],
          "labels": [],
          "ingredients":[
             "Cream",
             "Skim Milk",
             "Liquid Sugar (Sugar, Water)",
             "Water",
             "Peanuts",
             "Sugar",
             "Coconut Oil",
             "Egg Yolks",
             "Partially Defatted Peanut Flour",
             "Peanut Oil",
             "Milk",
             "Cocoa (Processed With Alkali)",
             "Salt",
             "Guar Gum",
             "Cocoa",
             "Natural Flavor",
             "Soy Lecithin",
             "Vanilla Extract",
             "Carrageenan"
          ]
       },
]
```
These objects should be mapped to components and rendered on the page.

## Material UI
The design is based on [Material UI](https://mui.com/). We will provide links to the documentation of the components you might use:

### Layout components:
* **Container**: https://mui.com/components/container/#main-content
* **Grid**: https://mui.com/components/grid/#main-content
* **List**: https://mui.com/components/lists/#main-content

### Icons:
* **List of available icons**: https://mui.com/components/material-icons

### Components:
* **App Bar**: https://mui.com/components/app-bar/#main-content
* **Avatar**: https://mui.com/components/avatars/#icon-avatars
* **Breadcrumbs**: https://mui.com/components/breadcrumbs/#main-content
* **Dialog**: https://mui.com/components/dialogs/#customization
* **Divider**: https://mui.com/components/dividers/#main-content
* **Icon Button**: https://mui.com/api/icon-button/#main-content
* **Paper**: https://mui.com/components/paper/#main-content
* **Radio Button**: https://mui.com/components/radio-buttons/#main-content
* **Text Field**: https://mui.com/components/text-fields/#main-content
* **Typography**: https://mui.com/components/typography/#main-content

### Default theme
Set the initial theme with these primary and secondary main colors. https://mui.com/customization/theming/#theme-provider
```
{
    primary: "#283040",
    secondary: "#00AEEF"
}
```

## Docker Installation
This test uses a docker container to run the server process for hosting the required REST endpoints.
If docker is not installed, please install it from the following location:
https://docs.docker.com/get-docker/

## Execution
### To create and run the test backend
```
$ docker build --tag test-backend:1.0 .
$ docker run --publish 8000:8080 --detach --name test-backend test-backend:1.0
```

### To stop and remove the test backend
```
$ docker rm --force test-backend
```

## Requirements
- When the magnifying glass is clicked or when the enter key is pressed, the list of filtered results will be updated using the current contents of the text input as a search query.
- When an ice cream flavor is added to the cart, the theme of the UI will change based on the flavor's color.
- When an ice cream flavor is removed from the cart, the theme is set to the last ice cream added or to the default theme when the cart is empty.
- The format of each ice cream:
  - The ice cream icon's background color is the primary color from the theme.
  - The ice cream icon's color is the secondary color from the theme.
  - The name of the flavor.
  - The description of the flavor.
  - The list of allergens.
    - Each string in the allergens array should be separated by commas or render "Contains: No allergens" when the array is empty.
  - Add an info icon next to the allergens that will display a dialog with a list of ingredients when clicked.
- The [theme](https://mui.com/customization/theming/) of the UI should change based on the selected ice cream.
- The user should be able to create a cone with 1 to 3 scoops, 0 or 1 topping, and 0 or 1 sauce.
- The container of the ice cream is required and preselected to waffle cone.
- Add up the total of all the items in the cart before purchasing the ice cream.
- The selection border, "Add a Topping", "Add a Sauce", input fields, buttons, and icons should be based on the theme's secondary color.
- The text fields should have a text mask based on the context:
  - Card Number: Only 16 numbers (####-####-####-####)
  - Expiration: Only 4 numbers (MM/YY)
  - CVC: Only 3 numbers (###)
  - Cardholder Name: Only text
  - Billing Address: Allows numbers and text
  - City: Only text
  - State: Shows a list of states to choose from.
  - Zip: Only 5 numbers
- The container images, success icon, and list of states are provided to you in the assets folder.

### Bonus:
- Write unit tests that:
  - Checks the filtering logic.
  - Opens the info dialog and checks that the ingredients list text is properly formatted.
  - Cannot buy ice cream with 0 scoops of ice cream.
  - Checks adding a sauce and topping.
  - Checks removing a sauce and topping.
  - Checks the price calculation of adding scoops, a topping and sauce.
  - Completes a purchase flow.

### Please view the [Figma Example](https://www.figma.com/proto/oj78xhIb60T1nmoRLkW7gO/Test-02?node-id=2%3A483&viewport=1018%2C1531%2C0.5&scaling=scale-down) and [Design File](https://www.figma.com/file/oj78xhIb60T1nmoRLkW7gO/Test-02?node-id=0%3A1) to see the intended product.
