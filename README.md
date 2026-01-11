# NodeJS Assessment

This repository contains a **NodeJS + ExpressJS + MongoDB** based API system.
Code is focused on **Clean API architecture**, **Worker threads**, and **Aggregation**.

---

## Tech Stack

- NodeJS
- ExpressJS
- MongoDB
- Worker threads
- Multer
- CSV | Excel parsing

---

## Features

### 1. Upload XLSX | CSV data (Worker thread)

- Support bulk file upload
- File processing is offered to a **worker thread**
- Prevents blocking of the main event loop
- Data is stored across multiple collections

**API**
POST /api/upload

**Form data**
file: sample.csv | sample.xlsx

---

### 2. Search policy by username

Search policy information by username.

**API**
GET /api/policy/search?username=John

---

### 3. Aggregate policies by user

Returns aggregated policy data grouped by users.

**API**

GET /api/policy/aggregate

### 4. CPU usage monitoring and auto restart

- CPU usage is monitored every min
- If usage reaches **70% or more**
- Server process exits automatically
- Restart is handeled by a process manager
  - Nodemon in dev
  - PM2 is recomended for production

---

### 5. Message scheduler api

Schedules a message to be insearted into the database at a specific date and time.

**API**

POST /api/message/schedule

**Request body**

```json
{
  "message": "Hello world!",
  "day": "2026-01-11",
  "time": "19:20"
}
```
