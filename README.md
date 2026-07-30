# Mail: Asynchronous SPA Email Client

A Single-Page Application (SPA) email client engineered with a Python/Django backend and a vanilla JavaScript frontend. 

Developed as part of **Harvard's CS50**, this project demonstrates a deep understanding of RESTful API design, JSON data serialization, and asynchronous DOM manipulation. As an **Artificial Intelligence Bachelor's student** currently advancing through **Stanford's Machine Learning specialization**, mastering the creation of robust, secure data pipelines between client and server architectures is foundational to deploying intelligent, scalable web applications.

### 🛠️ Tech Stack
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

### 🧠 Architecture & Core Features

This application diverges from traditional multi-page Django architectures. The backend is strictly configured as an API, serving JSON data to a dynamic JavaScript frontend that handles all state changes and view rendering without page reloads.

* **RESTful API Architecture:** Engineered custom Django routes (`views.py`) to process `GET`, `POST`, and `PUT` requests, allowing the client to query specific mailboxes, compose emails, and mutate read/archived states.
* **JSON Data Serialization:** Implemented a `serialize` method within the `Email` model to safely unpack complex many-to-many user relationships and timestamps into frontend-ready JSON payloads.
* **Single-Page Application (SPA) Logic:** Utilized vanilla JavaScript (`inbox.js`) to dynamically hide and render specific HTML `div` blocks based on the application state, creating a seamless, app-like user experience.
* **Asynchronous Fetching:** Leveraged JavaScript Promises (`fetch()`) to communicate with the backend API asynchronously, ensuring the UI remains responsive while data is queried or updated in the SQLite database.
* **Complex Data Modeling:** Designed robust relational models capable of differentiating between senders and multiple recipients, while tracking individual `read` and `archived` booleans per user.

### 💻 Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Mohammed-Benrebrit/Mail.git](https://github.com/Mohammed-Benrebrit/Mail.git)
   cd Mail
