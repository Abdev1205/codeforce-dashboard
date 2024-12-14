# Codeforces Contest Dashboard

![image](https://github.com/user-attachments/assets/f1e3a573-5c1e-49a7-a6c5-72e0ce92ba03)


---

## Introduction
The **Codeforces Contest Dashboard** is a user-friendly web application that displays upcoming and past Codeforces contests in a structured and visually appealing manner. This project integrates Codeforces API to fetch contest details and provides advanced features like adding contests to a calendar, detailed contest insights, and dynamic data visualizations.

Visit the live project: [https://codeforce-dashboard.vercel.app/](https://codeforce-dashboard.vercel.app/)



https://github.com/user-attachments/assets/600e6c50-c4e4-4150-8129-1749292b84c4


---

## Features

- **Contest List**: Displays a list of upcoming and past contests with their types, times, and status in a responsive table format.
- **Contest Details**: Redirects to an internal contest-specific page showing:
  - Contest details (name, duration, type, etc.).
  - Join Contest button.
  - Add to Calendar functionality (using Calendar API).
- **Interactive Graphs**: Contest statistics and related data displayed using dynamic graphs (powered by Recharts), updated based on user-provided filters.
- **Like Button**: Users can like a contest, enhancing interaction.
- **Responsive Design**: Mobile-friendly and optimized for all devices.
- **Deployed on Vercel**: High-performance deployment for seamless user experience.

---

## Tech Stack

- **Frontend**: React.js, TypeScript, ShadCN
- **Styling**: Tailwind CSS
- **API Integration**: Codeforces API, Calendar API
- **Data Visualization**: Recharts
- **Deployment**: Vercel

---



## Usage

1. **Contest List Page**:
   - View a list of all Codeforces contests with details such as name, type, start time, and duration.
   - Click on a contest to view its details.

2. **Contest Details Page**:
   - View detailed information about a specific contest.
   - Join the contest using the "Join Contest" button (redirects to Codeforces).
   - Add the contest to your calendar (via Calendar API).

3. **Filters and Graphs**:
   - Apply filters to view contests based on types or duration.
   - View dynamic graphs of contest stats using Recharts.

---



