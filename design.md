# A. UI Endpoints
## 1. GET / => For Landing Page which enables chat
## 2. GET /login => For Login and Registration Purpose

## 
## 
## 
# B. Backend Endpoints

## 1. POST /api/user => Registering New User
## 2. POST /api/auth/login => To perform login. Sets HTTP only Cookie with JWT Token
## 3. GET /api/auth/logout => To perform logout by clearing the cookie.
## 4. GET /api/auth/wipeme => To clear all user data including the user account of current user.
## 5. POST /api/user/search => Search for a given user
## 6. POST /api/message => Send a message to another user
## 7. GET /api/messages => Retrieves all messages for the current user