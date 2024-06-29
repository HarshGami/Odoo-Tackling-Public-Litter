# Odoo-Tackling-Public-Litter

# Garbage Management Application

## Overview

The Garbage Management Application aims to improve urban cleanliness and resource management by providing an efficient system for reporting litter, assigning cleanup tasks to garbage collectors, and managing garbage collection schedules. This full-stack application includes distinct features for residents, garbage collectors, and administrators.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
4. [Usage](#usage)
    - [Running the Application](#running-the-application)
    - [Directory Structure](#directory-structure)
5. [Screens and Components](#screens-and-components)
    - [Landing Page](#landing-page)
    - [Resident Dashboard](#resident-dashboard)
    - [Collector Dashboard](#collector-dashboard)
    - [Admin Dashboard](#admin-dashboard)
6. [API Documentation](#api-documentation)
7. [Contributing](#contributing)
8. [License](#license)

## Features

### User Authentication and Authorization
- Secure login system for residents, garbage collectors, and administrators.
- Role-based access control to ensure appropriate access to features.

### Reporting System
- Users (residents) can report litter hotspots by uploading photos and descriptions.
- Geotagging feature to pinpoint exact locations on a map.

### Task Assignment and Management
- Admins can assign reported litter cases to nearby garbage collectors.
- Track the progress of cleanup tasks in real-time.
- Notification system to inform collectors of new assignments.

### Garbage Collection Scheduling
- Residents can view schedules for regular garbage collection.
- Option for residents to request special pickups for bulky items or hazardous waste.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Geolocation**: Mapbox
- **Real-time Communication**: WebSockets

## Getting Started

### Prerequisites

- Node.js (version >= 14.x)
- MongoDB
- Mapbox account (for API key)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/garbage-management-app.git
    cd garbage-management-app
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
