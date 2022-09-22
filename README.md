# Products List

### Technologies used:
- React with Typescript
- State managment library: Redux(Redux Toolkit)
- CSS library: Bulma
- Fake API: Json-server
- Random data generator: [mockaroo](https://www.mockaroo.com)

### Instructions how to run application locally:
1. Clone the repository to your local machine, open terminal and clone repo with command bellow:
```bash 
git clone https://github.com/BudnikOleksii/product_list.git
```
2. Open project in terminal:
```bash 
cd product_list
```
3. Set up project and install necessary packages:
```bash 
npm install
```
4. If you don't have json-server package on your computer run command in terminal:
```bash 
npm install -g json-server
```
5. Run json-server on port: 4000 for CRUD operations by command:
```bash 
json-server -p 4000 src/products.json
```
6. Open one more terminal in the directory with product_list app and run project by command:
```bash 
npm start
```
7. Open application in your browser `http://localhost:3000/`

### You have ability to add, delete and edit products in list
