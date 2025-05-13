# 📝 Task Management App

A simple and efficient Task Management application built using the MERN stack + Vite. This project lets you create, update, delete, filter, and search tasks with tag-based categorization. Originally built out of boredom — but turned into a clean, productive personal project. 😉

---

## 🚀 Features

- Create new task cards with titles, descriptions, and tags
- Edit or delete existing tasks
- Filter tasks by tags (Work, Study, Personal, Urgent, Others)
- Search tasks by keyword in real-time
- Simple, responsive and clean UI
- Built using component-based architecture for scalability

---

## 🧠 Use Cases

- Track daily goals and to-do lists
- Organize academic tasks and assignments
- Manage work-related activities or team tasks
- Personal habit tracking
- Just to test and learn full-stack development workflow

---

## 🛠️ Tech Stack

### Frontend:
- **React** with **Vite**
- **Tailwind CSS** for styling
- **React Select** for tag filters

### Backend:
- **Node.js** with **Express**
- **MongoDB** with **Mongoose**
- RESTful API design

---

## 📁 File Structure

```
root
│
├── client                # React frontend (Vite)
│   ├── public
│   ├── src
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server                # Node.js backend
│   ├── config            # MongoDB connection
│   ├── controllers       # Task logic
│   ├── middlewares       # Custom middlewares (if any)
│   ├── models            # Mongoose schemas
│   ├── routes            # API endpoints
│   ├── index.js          # Entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📦 How to Use

1. **Clone the repository**

```bash
git clone https://github.com/Jay0073/Task-Management.git
cd Task-Management
```

2. **Install dependencies**

- For frontend:

```bash
cd client
npm install
```

- For backend:

```bash
cd ../server
npm install
```

3. **Set up MongoDB**

- Make sure MongoDB is running locally or use MongoDB Atlas.
- Create a `.env` file in the `server/` folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

4. **Run the project**

- Backend:

```bash
cd server
npm start
```

- Frontend:

```bash
cd client
npm run dev
```

Then open your browser at: `http://localhost:5173`

---

## 🤝 Contributing

Pull requests are welcome! If you find bugs or have suggestions, feel free to fork the repo and submit a PR.

### Steps to contribute:
- Fork this repo
- Create a branch: `git checkout -b feature-xyz`
- Commit your changes: `git commit -m "Added feature xyz"`
- Push to your branch: `git push origin feature-xyz`
- Open a pull request

---

## 🙋‍♂️ Author

Made with focus (and a bit of boredom) by [@Jay0073](https://github.com/Jay0073)
