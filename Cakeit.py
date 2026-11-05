from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
# PRODUCT MODELS
class Size(BaseModel):
    name: str
    price: float

class Extra(BaseModel):
    name: str
    price: float

class Product(BaseModel):
    id: str
    name: str
    vendor: str
    image: str
    description: str
    flavours: List[str] = []
    sizes: List[Size] = []
    extras: List[Extra] = []
    allowMessage: bool = False


# Your products data (converted from products.js)
products_db = [
    {
        "id": "bbestedinles-butter-cream-cakes",
        "name": "Butter Cream Cakes",
        "vendor": "Bbestedinles & More",
        "image": "images/butter-cream.jpg",
        "description": "Beautiful butter cream cakes from Bbestedinles & More, perfect for birthdays, celebrations, and special moments.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 15000},
            {"name": "8 inches", "price": 25000},
            {"name": "10 inches", "price": 35000},
            {"name": "12 inches", "price": 50000}
        ],
        "extras": [
            {"name": "Buttercream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "bbestedinles-whipped-cream-cakes",
        "name": "Whipped Cream Cakes",
        "vendor": "Bbestedinles & More",
        "image": "images/whipped.jpg",
        "description": "Soft and creamy whipped cream cakes from Bbestedinles & More, made for sweet and memorable occasions.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 17000},
            {"name": "8 inches", "price": 27000},
            {"name": "10 inches", "price": 37000},
            {"name": "12 inches", "price": 52000}
        ],
        "extras": [
            {"name": "Whipped Cream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "blessed-butter-cream-cakes",
        "name": "Butter Cream Cakes",
        "vendor": "Blessed Cakes and Events",
        "image": "images/butter-cream.jpg",
        "description": "Custom butter cream cakes from Blessed Cakes and Events, suitable for birthdays, events, and celebrations.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 15000},
            {"name": "8 inches", "price": 25000},
            {"name": "10 inches", "price": 35000},
            {"name": "12 inches", "price": 50000}
        ],
        "extras": [
            {"name": "Buttercream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "blessed-whipped-cream-cakes",
        "name": "Whipped Cream Cakes",
        "vendor": "Blessed Cakes and Events",
        "image": "images/whipped.jpg",
        "description": "Creamy whipped cream cakes from Blessed Cakes and Events, made for clean designs and rich taste.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 17000},
            {"name": "8 inches", "price": 27000},
            {"name": "10 inches", "price": 37000},
            {"name": "12 inches", "price": 52000}
        ],
        "extras": [
            {"name": "Whipped Cream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "blessed-bento-cakes",
        "name": "Bento Cakes",
        "vendor": "Blessed Cakes and Events",
        "image": "images/bento.webp",
        "description": "Cute mini bento cakes from Blessed Cakes and Events, perfect for small surprises, birthdays, and gifts.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
        "sizes": [
            {"name": "Small Bento", "price": 7000},
            {"name": "Medium Bento", "price": 10000}
        ],
        "extras": [
            {"name": "Simple Design", "price": 0},
            {"name": "Custom Message", "price": 1000},
            {"name": "Extra Topping", "price": 1500}
        ],
        "allowMessage": True
    },
    {
        "id": "blessed-cake-loaves",
        "name": "Cake Loaves",
        "vendor": "Blessed Cakes and Events",
        "image": "images/cake-loaves.jpg",
        "description": "Simple, rich cake loaves from Blessed Cakes and Events, perfect for tea time, gifting, or casual cravings.",
        "flavours": ["Vanilla", "Chocolate", "Banana", "Marble", "Lemon"],
        "sizes": [
            {"name": "Small Loaf", "price": 5000},
            {"name": "Medium Loaf", "price": 8000},
            {"name": "Large Loaf", "price": 12000}
        ],
        "extras": [
            {"name": "Plain", "price": 0},
            {"name": "With Nuts", "price": 1500},
            {"name": "Chocolate Chips", "price": 1200}
        ],
        "allowMessage": False
    },
    {
        "id": "blessed-cupcakes",
        "name": "Cupcakes",
        "vendor": "Blessed Cakes and Events",
        "image": "images/cupcakes.jpg",
        "description": "Soft and cute cupcakes from Blessed Cakes and Events, perfect for gifts, events, and cravings.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
        "sizes": [
            {"name": "Box of 6", "price": 6000},
            {"name": "Box of 12", "price": 11000},
            {"name": "Box of 24", "price": 21000}
        ],
        "extras": [
            {"name": "Plain", "price": 0},
            {"name": "Sprinkles", "price": 1000},
            {"name": "Cream Topping", "price": 1500}
        ],
        "allowMessage": False
    },
    {
        "id": "blessed-parfait",
        "name": "Parfait",
        "vendor": "Blessed Cakes and Events",
        "image": "images/parfait.jpg",
        "description": "Creamy, fruity parfaits from Blessed Cakes and Events, made with yoghurt, granola, fruits, and toppings.",
        "flavours": ["Mixed Fruit", "Strawberry", "Oreo", "Banana", "Apple"],
        "sizes": [
            {"name": "Small Cup", "price": 3500},
            {"name": "Medium Cup", "price": 5000},
            {"name": "Large Cup", "price": 7000}
        ],
        "extras": [
            {"name": "Standard Topping", "price": 500},
            {"name": "Oreo Crumbs", "price": 800},
            {"name": "Extra Fruits", "price": 1000},
            {"name": "Honey", "price": 500}
        ],
        "allowMessage": False
    },
    {
        "id": "blessed-small-chops",
        "name": "Small Chops",
        "vendor": "Blessed Cakes and Events",
        "image": "images/small-chops.jpg",
        "description": "Party-ready small chops from Blessed Cakes and Events, perfect for birthdays, hangouts, meetings, and events.",
        "flavours": [],
        "sizes": [
            {"name": "Small Pack", "price": 5000},
            {"name": "Medium Pack", "price": 10000},
            {"name": "Large Pack", "price": 18000},
            {"name": "Party Tray", "price": 35000}
        ],
        "extras": [
            {"name": "Spring Rolls", "price": 0},
            {"name": "Samosa", "price": 0},
            {"name": "Puff Puff", "price": 0},
            {"name": "Mixed Pack", "price": 2000}
        ],
        "allowMessage": False
    },
    {
        "id": "dara-butter-cream-cakes",
        "name": "Butter Cream Cakes",
        "vendor": "Dara Kakes",
        "image": "images/butter-cream.jpg",
        "description": "Custom butter cream cakes from Dara Kakes, made for birthdays, celebrations, and sweet memories.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 15000},
            {"name": "8 inches", "price": 25000},
            {"name": "10 inches", "price": 35000},
            {"name": "12 inches", "price": 50000}
        ],
        "extras": [
            {"name": "Buttercream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "dara-whipped-cream-cakes",
        "name": "Whipped Cream Cakes",
        "vendor": "Dara Kakes",
        "image": "images/whipped.jpg",
        "description": "Smooth whipped cream cakes from Dara Kakes, perfect for simple, classy, and beautiful celebrations.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry", "Marble"],
        "sizes": [
            {"name": "6 inches", "price": 17000},
            {"name": "8 inches", "price": 27000},
            {"name": "10 inches", "price": 37000},
            {"name": "12 inches", "price": 52000}
        ],
        "extras": [
            {"name": "Whipped Cream", "price": 0},
            {"name": "Chocolate Drip", "price": 3000},
            {"name": "Extra Design", "price": 5000}
        ],
        "allowMessage": True
    },
    {
        "id": "dara-bento-cakes",
        "name": "Bento Cakes",
        "vendor": "Dara Kakes",
        "image": "images/bento.webp",
        "description": "Mini bento cakes from Dara Kakes, perfect for gifts, small birthdays, and surprise packages.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
        "sizes": [
            {"name": "Small Bento", "price": 7000},
            {"name": "Medium Bento", "price": 10000}
        ],
        "extras": [
            {"name": "Simple Design", "price": 0},
            {"name": "Custom Message", "price": 1000},
            {"name": "Extra Topping", "price": 1500}
        ],
        "allowMessage": True
    },
    {
        "id": "dara-cupcakes",
        "name": "Cupcakes",
        "vendor": "Dara Kakes",
        "image": "images/cupcakes.jpg",
        "description": "Soft cupcakes from Dara Kakes, suitable for gifts, school events, birthdays, and cravings.",
        "flavours": ["Vanilla", "Chocolate", "Red Velvet", "Strawberry"],
        "sizes": [
            {"name": "Box of 6", "price": 6000},
            {"name": "Box of 12", "price": 11000},
            {"name": "Box of 24", "price": 21000}
        ],
        "extras": [
            {"name": "Plain", "price": 0},
            {"name": "Sprinkles", "price": 1000},
            {"name": "Cream Topping", "price": 1500}
        ],
        "allowMessage": False
    },
    {
        "id": "dara-small-chops",
        "name": "Small Chops",
        "vendor": "Dara Kakes",
        "image": "images/small-chops.jpg",
        "description": "Party-style small chops from Dara Kakes, made for hangouts, birthdays, meetings, and events.",
        "flavours": [],
        "sizes": [
            {"name": "Small Pack", "price": 5000},
            {"name": "Medium Pack", "price": 10000},
            {"name": "Large Pack", "price": 18000},
            {"name": "Party Tray", "price": 35000}
        ],
        "extras": [
            {"name": "Spring Rolls", "price": 0},
            {"name": "Samosa", "price": 0},
            {"name": "Puff Puff", "price": 0},
            {"name": "Mixed Pack", "price": 2000}
        ],
        "allowMessage": False
    }
]


# PRODUCT ROUTES
@app.get("/products")
def get_all_products():
    return products_db

@app.get("/products/{product_id}")
def get_product(product_id: str):
    for product in products_db:
        if product["id"] == product_id:
            return product
    return {"message": "Product not found"}

@app.get("/products/vendor/{vendor_name}")
def get_products_by_vendor(vendor_name: str):
    vendor_products = [p for p in products_db if p["vendor"] == vendor_name]
    return vendor_products

@app.post("/products")
def add_product(product: Product):
    products_db.append(product.dict())
    return {"message": "Product added successfully", "product": product}

@app.delete("/products/{product_id}")
def delete_product(product_id: str):
    global products_db
    products_db = [p for p in products_db if p["id"] != product_id]
    return {"message": "Product deleted successfully"}

@app.get("/get-details/{details_id}")
def get_details(details_id: int):
    return Student[details_id]



# Order Models
class OrderItem(BaseModel):
    name: str
    vendor: str
    flavour: str = "None"
    size: str = "None"
    extra: str = "None"
    message: str = ""
    quantity: int
    unitPrice: float
    totalPrice: float

class Order(BaseModel):
    items: List[OrderItem]
    subtotal: float
    vatAmount: float
    deliveryFee: float
    totalAmount: float
    paymentMethod: str = "Bank Transfer"
    paymentStatus: str = "pending"
    orderStatus: str = "awaiting confirmation"

# Temp order storage (we'll add database later)
orders = []

# SUBMIT ORDER
@app.post("/submit-order")
def submit_order(order: Order):
    new_order = {
        "id": f"ORD-{int(datetime.now().timestamp())}",
        "items": [item.dict() for item in order.items],
        "subtotal": order.subtotal,
        "vatAmount": order.vatAmount,
        "deliveryFee": order.deliveryFee,
        "totalAmount": order.totalAmount,
        "paymentMethod": order.paymentMethod,
        "paymentStatus": order.paymentStatus,
        "orderStatus": order.orderStatus,
        "createdAt": datetime.now().isoformat()
    }
    orders.append(new_order)
    return {"message": "Order submitted successfully", "order": new_order}

# GET ALL ORDERS (for you to view)
@app.get("/orders")
def get_orders():
    return {"total": len(orders), "orders": orders}

@app.get("/")
def home():
    return {"message": "Cake Itt API Running ✅"}
import bcrypt as bcrypt_lib
import jwt as jwt_lib
from datetime import timedelta

SECRET_KEY = "cakeitt_secret_key_2024"

# USER MODELS
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    room: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Temp user storage (we'll connect to real DB later)
users_db = []

# SIGNUP
@app.post("/auth/signup")
def signup(user: SignupRequest):
    # Check if email already exists
    for existing_user in users_db:
        if existing_user["email"] == user.email:
            return {"error": "Email already registered"}

    hashed_password = bcrypt_lib.hashpw(
        user.password.encode("utf-8"), bcrypt_lib.gensalt()
    )

    new_user = {
        "id": len(users_db) + 1,
        "name": user.name,
        "email": user.email,
        "password": hashed_password.decode("utf-8"),
        "room": user.room
    }

    users_db.append(new_user)

    return {"message": "Signup successful"}

# LOGIN
@app.post("/auth/login")
def login(credentials: LoginRequest):
    user = None
    for u in users_db:
        if u["email"] == credentials.email:
            user = u
            break

    if not user:
        return {"error": "User not found"}

    password_matches = bcrypt_lib.checkpw(
        credentials.password.encode("utf-8"),
        user["password"].encode("utf-8")
    )

    if not password_matches:
        return {"error": "Invalid credentials"}

    token = jwt_lib.encode(
        {"id": user["id"], "email": user["email"]},
        SECRET_KEY,
        algorithm="HS256"
    )

    return {
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "room": user["room"]
        }
    }