## 🧠 CampusAI – College Chat Assistant

### 🚀 Overview

**CampusAI** is an intelligent campus chatbot designed to assist students and staff with academic queries, event updates, and college-related information.
It integrates AI-driven responses, real-time data, and a user-friendly interface to streamline communication within educational institutions.

---

### 🏗️ Features

✅ **AI-Powered Chat Assistant** – Provides instant, context-aware answers to student queries.
✅ **Role-Based Interaction** – Separate interfaces for students, faculty, and administrators.
✅ **Secure Authentication** – Session and database security using PostgreSQL and Express middleware.
✅ **Real-Time Communication** – Built on Node.js + WebSocket or REST-based architecture.
✅ **Responsive Frontend** – Built with React + Tailwind CSS for a clean and modern UI.
✅ **Database-Driven Intelligence** – Uses structured data models for dynamic responses.

---
### 📸 Screenshots
<img width="1698" height="888" alt="Screenshot 2025-11-06 205221" src="https://github.com/user-attachments/assets/5f6a1030-f9c8-4e0c-b641-4331a3d6df03" />

<img width="628" height="870" alt="Screenshot 2025-11-06 205400" src="https://github.com/user-attachments/assets/4b10585e-e272-448d-87c4-0d85f8add893" />

<img width="1573" height="705" alt="Screenshot 2025-11-06 205300" src="https://github.com/user-attachments/assets/f8c742b5-d391-4e9e-b224-6d551ff3cf94" />

<img width="1706" height="878" alt="Screenshot 2025-11-06 205338" src="https://github.com/user-attachments/assets/cbc6f18f-a3e5-4408-9ffa-226772433c45" />
<img width="628" height="870" alt="Screenshot 2025-11-06 205400" src="https://github.com/user-attachments/assets/7ed67d5f-efbe-4a3d-889d-31fb17332cbf" />


### 🧩 Tech Stack

| Layer                   | Technology Used                          |
| ----------------------- | ---------------------------------------- |
| **Frontend**            | React.js, TypeScript, Tailwind CSS, Vite |
| **Backend**             | Node.js, Express.js, TypeScript          |
| **Database**            | PostgreSQL (Neon.tech Cloud DB)          |
| **ORM / Query Builder** | Drizzle ORM                              |
| **Build Tool**          | Vite                                     |
| **Hosting (optional)**  | Render / Vercel / Railway                |
| **Version Control**     | Git + GitHub                             |

---

### ⚙️ Installation & Setup

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/SURAJ1430sv/CampusAI.git
cd CampusAI
```

#### 2️⃣ Install dependencies

If your project has separate client and server folders:

```bash
# In the root folder
npm install

# In the client folder
cd client
npm install
cd ..
```

#### 3️⃣ Environment variables

Create a `.env` file in the **server** directory with the following keys:

```bash
DATABASE_URL=your_postgres_connection_string
NODE_ENV=development
PORT=5000
```

#### 4️⃣ Build and run

```bash
# Build frontend
cd client
npm run build
cd ..

# Start server
npm run dev
```

---

### 🧪 Development Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `npm run dev`   | Starts development server        |
| `npm run build` | Builds frontend production files |
| `npm run start` | Runs production server           |
| `npm run lint`  | Runs ESLint checks               |

---

### 🧰 Folder Structure

```
CampusAI/
├── client/                # React frontend (Vite + Tailwind)
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                # Express + TypeScript backend
│   ├── db/
│   ├── routes/
│   ├── index.ts
│   └── vite.ts
├── shared/                # Shared TypeScript schemas & types
├── migrations/            # Drizzle ORM migrations
├── package.json
└── README.md
```

---

### 🧠 Future Enhancements

* 🤖 Integrate OpenAI or Gemini APIs for smarter responses.
* 🗂️ Add admin dashboard for managing FAQs and users.
* 📱 Build a mobile-friendly PWA version.
* 🔒 Implement JWT-based authentication.
* 📊 Add analytics dashboard for chat insights.

---

### 💡 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Commit your changes (`git commit -m 'Add awesome feature'`)
4. Push to the branch (`git push origin feature/awesome-feature`)
5. Open a Pull Request 🎉

---

### 🧾 License

This project is licensed under the **MIT License** – feel free to use and modify with attribution.

---

### 💬 Contact

👤 **Developer:** Suraj Vishwakarma
📧 **Email:** [[suraj1430ss@gmail.com](mailto:suraj1430ss@gmail.com)]
🌐 **GitHub:** [github.com/SURAJ1430sv](https://github.com/SURAJ1430sv)

